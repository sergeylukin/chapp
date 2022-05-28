import React from 'react';
import '@fontsource/festive/400.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/baloo-2/600.css';
// import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { StoreProvider } from 'easy-peasy';
import { store } from '@chapp/shared-state';

import { frontWebsiteTheme } from '../libs/front-website/theme/src';

export const globalTypes = {
  direction: {
    name: 'Direction',
    description: 'Direction for layout',
    defaultValue: 'LTR',
    toolbar: {
      icon: 'globe',
      items: ['LTR', 'RTL'],
    },
  },
};

const withChakra = (StoryFn, context) => {
  const { direction } = context.globals;
  const dir = direction.toLowerCase();

  React.useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);

  return (
    <ChakraProvider theme={frontWebsiteTheme}>
      <div dir={dir} id="story-wrapper" style={{ minHeight: '100vh' }}>
        <StoryFn />
      </div>
    </ChakraProvider>
  );
};

const withEasyPeasy = (StoryFn) => {
  /* const { direction } = context.globals; */
  // const dir = direction.toLowerCase();

  // React.useEffect(() => {
  //   document.documentElement.dir = dir;
  // }, [dir]);

  return (
    <StoreProvider store={store}>
      <StoryFn />
    </StoreProvider>
  );
};

export const decorators = [withChakra, withEasyPeasy];

export const parameters = {
  chakra: {
    theme: frontWebsiteTheme,
  },
  backgrounds: {
    default: 'blank',
    values: [
      {
        name: 'blank',
        value: 'white',
      },
      {
        name: 'chapp',
        value:
          'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab) 400% 400%',
      },
    ],
  },
};
