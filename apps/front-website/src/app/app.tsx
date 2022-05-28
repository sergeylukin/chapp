import '@fontsource/festive/400.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/baloo-2/600.css';

import { useStoreRehydrated } from 'easy-peasy';
import { Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { frontWebsiteTheme } from '@chapp/front-website/theme';

import { Home } from './home/home';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

const ui = (child: ReactJSXElement) => (
  <ChakraProvider theme={frontWebsiteTheme}>{child}</ChakraProvider>
);

export function App() {
  const isRehydrated = useStoreRehydrated();
  return isRehydrated ? (
    <Route path="/" exact render={() => ui(<Home />)} />
  ) : (
    <div>Loading...</div>
  );
}

export default App;
