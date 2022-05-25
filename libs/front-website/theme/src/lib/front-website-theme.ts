// import { useState, useEffect } from 'react';
import { keyframes } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

const slideUpAnimationKeyframesName = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

const shakeAnimationKeyframesName = keyframes`
  20%,
  40%,
  60%,
  80% {
    transform: translateX(1%);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-1%);
  }
  from,
  to {
    transform: none;
  }
`;

const Input = {
  // The styles all button have in common
  parts: ['container'],
  variants: {
    login: {
      field: {
        animation: `${slideUpAnimationKeyframesName} calc(var(--animation-duration) / 2) cubic-bezier(0.5, 0, 0.5, 1) both`,
        animationDuration: '.5s',
        gridArea: 'input',
        padding: '0 1rem',
        height: 'var(--input-height)',
        border: '2px solid var(--color)',
        borderRadius: '0.25rem',
        outline: 'none',
        transition: 'inherit',
      },
    },
  },
  baseStyle: {},
};
const FormError = {
  // The styles all button have in common
  parts: ['text'],
  variants: {
    login: {
      text: {
        color: 'var(--color-red)',
      }
    },
  },
  baseStyle: {},
};
const FormLabel = {
  // The styles all button have in common
  variants: {
    login: {
      bgColor: 'pink',
      marginY: '20px',
    },
  },
  baseStyle: {},
};

const Button = {
  // The styles all button have in common
  baseStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderRadius: 'base', // <-- border radius is same for all variants and sizes
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: 'md',
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      border: '2px solid',
      borderColor: 'purple.500',
      color: 'purple.500',
    },
    login: {
      mt: 0,
      animation: `${slideUpAnimationKeyframesName} calc(var(--animation-duration) / 2) cubic-bezier(0.5, 0, 0.5, 1) both`,
      animationDuration: '.6s',
      gridArea: 'button',
      border: 'none',
      padding: '0 1rem',
      color: 'white',
      fontWeight: 'bold',
      borderRadius: '0.25rem',
      height: 'var(--input-height)',
      backgroundColor: 'var(--color)',
      transition: 'inherit',
    },
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
};

const colors = {
  brand: {
    500: '#0d59f9',
  },
};

export const frontWebsiteTheme = extendTheme({
  components: { FormError, Button, Input, FormLabel },
  colors,
  fonts: {
    heading: `'Festive', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
  styles: {
    global: {
      ':root': {
        '--color-red': '#d3d',
        '--color-gray': '#8c97b7',
        '--color-blue': '#09f',
        '--color-green': '#66db69',
        '--input-height': '3rem',
        '--transition-duration': '0.3s',
        '--transition-easing': 'cubic-bezier(0.5, 0, 0.5, 1)',
        '--animation-duration': '0.8s',
      },
      '.ui-form': {
        overflow: 'hidden',
        background: '#fff',
        boxShadow: '0 0.5rem 1rem #0003',
        padding: '1rem',
        borderRadius: '0.25rem',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gridTemplateRows: '1fr',
        gridColumnGap: '1rem',
        gridTemplateAreas: "'input button'",
        transition: 'all var(--transition-duration) var(--transition-easing)',
        willChange: 'transform',

        '--color': 'var(--color-gray)',
      },
      '.ui-form:focus-within': {
        '--color': 'var(--color-blue)',
      },

      "ui-form[data-state='subscribe']": {
        animation:
          `${slideUpAnimationKeyframesName} var(--animation-duration) var(--transition-easing)`,
      },

      ".ui-form[data-state='success']": {
        '--color': 'var(--color-green)',
      },

      ".ui-form[data-state='error']": {
        '--color': 'var(--color-red, red)',
        animation: `${shakeAnimationKeyframesName} 1s ease`,
      },
      '[data-show]:not([data-active])': {
        display: 'none'
      },
    },
  },
});
