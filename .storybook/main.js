const path = require('path');
const webpack = require('webpack')

const toPath = (_path) => path.join(process.cwd(), _path);

const injectVars = Object.keys(process.env).reduce((c,key) => {
  if(/^NX_/.test(key)) {
    c[`process.env.${key}`] = JSON.stringify(process.env[key]);
  }
  return c;
}, {})

function injectEnv(definitions) {
  const env = 'process.env';

  if (!definitions[env]) {
    return {
      ...definitions,
      [env]: JSON.stringify(
        Object.fromEntries(
          Object.entries(definitions)
            .filter(([key]) => key.startsWith(env))
            .map(([key, value]) => [key.substring(env.length + 1), JSON.parse(value)]),
        ),
      ),
    };
  }
  return definitions;
}

module.exports = {
  stories: [],
  addons: ['@storybook/addon-essentials', '@chakra-ui/storybook-addon'],
  features: {
    emotionAlias: false,
  },
  babel: async (options) => {
    return {
      ...options,
      presets: [...options.presets, '@babel/preset-react'],
    };
  },
  // uncomment the property below if you want to apply some webpack config globally
  // webpackFinal: async (config, { configType }) => {
  //   // Make whatever fine-grained changes you need that should apply to all storybook configs

  //   // Return the altered config
  //   return config;
  // },
  webpackFinal: async (config) => {
    // config = {
    //   ...config,
    //   resolve: {
    //     ...config.resolve,
    //     fallback: {
    //       fs: false,
    //       net: false,
    //       tls: false,
    //     },
    //     alias: {
    //       ...config.resolve.alias,
    //       '@babel/preset-react': toPath('node_modules/@babel/preset-react'),
    //       '@emotion/core': toPath('node_modules/@emotion/react'),
    //       '@emotion/styled': toPath('node_modules/@emotion/styled'),
    //       'emotion-theming': toPath('node_modules/@emotion/react'),
    //     },
    //   },
    // };

    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // here we use babel-loader
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        babelrc: false,
        presets: [
          '@babel/preset-typescript',
          [
            '@babel/preset-react',
            {
              runtime: 'automatic',
            },
          ],
        ],
        plugins: [
          ['@babel/plugin-proposal-nullish-coalescing-operator'],
          ['@babel/plugin-proposal-optional-chaining'],
        ],
      },
    });

    // config.resolve.modules = [
    //   path.resolve(__dirname, '../', 'node_modules'),
    //   'node_modules',
    // ];

    config.resolve.extensions.push('.ts', '.tsx');

    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false,
        net: false,
        tls: false,
      },
      alias: {
        ...config.resolve.alias,
        '@babel/preset-react': toPath('node_modules/@babel/preset-react'),
        '@emotion/core': toPath('node_modules/@emotion/react'),
        '@emotion/styled': toPath('node_modules/@emotion/styled'),
        'emotion-theming': toPath('node_modules/@emotion/react'),
      },
    }

    config.stats = 'verbose';

    config.plugins = config.plugins.reduce((c, plugin) => {
      if(plugin instanceof webpack.DefinePlugin) {
        return [
          ...c,
          new webpack.DefinePlugin(
            injectEnv({
              ...plugin.definitions,
              ...injectVars,
            })
          ),
        ]
      }

      return [
        ...c,
        plugin,
      ]
    }, []);


    // Return the altered config
    return config;
  },
};
