// import { useState, useEffect } from 'react';
import { keyframes } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

const dylanAnimationKeyframesName = keyframes`
  50% {
    transform: scale(1.5, 1.5);
    opacity: 0;
  }
  99% {
    transform: scale(0.001, 0.001);
    opacity: 0;
  }
  100% {
    transform: scale(0.001, 0.001);
    opacity: 1;
  }
`;

const fixedAnimationKeyframesName = keyframes`
0% {
  transform: rotate(0) scale(1);
  opacity: 1;
}
40% {
  transform: rotate(360deg);
}

50% {
  opacity: 0;
}
70% {
  transform: rotate(360deg) scale(1.3);
}
80% {
  opacity: 1;
}
100% {
  transform: rotate(360deg) scale(1);
}
`;

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

export const jumpAnimationKeyframesName = keyframes`
	0% {
		transform: scale(1);
		box-shadow: 0 1px 2px rgba(0,0,0,.15);
	}
	100% {
		transform: scale(1.05);
		box-shadow: 0 4px 20px rgba(0,0,0,.1);
	}
`;

export const slideDownAnimationKeyframesName = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

export const gradientAnimationName = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
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
        transition: 'border-color 1000ms linear',
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
      },
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
      color: 'white',
      px: 8,
      fontWeight: 'bold',
      borderRadius: '0.25rem',
      height: 'var(--input-height)',
      backgroundColor: 'var(--color)',
      transition: 'background-color 1000ms linear',
    },
    logout: {
      mt: 0,
      animation: `${slideUpAnimationKeyframesName} calc(var(--animation-duration) / 2) cubic-bezier(0.5, 0, 0.5, 1) both`,
      animationDuration: '.6s',
      gridArea: 'button',
      border: 'none',
      color: 'white',
      px: 0,
      fontWeight: 'bold',
      borderRadius: '0.25rem',
      height: 'var(--input-height)',
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
        '--color': '#ffd708',
        '--color-red': '#d3d',
        '--color-gray': '#ffd708',
        '--color-blue': '#ffb521',
        '--color-green': '#66db69',
        '--input-height': '3rem',
        '--transition-duration': '0.3s',
        '--transition-easing': 'cubic-bezier(0.5, 0, 0.5, 1)',
        '--animation-duration': '0.8s',
      },
      '.u-anim-slideUp': {
        animation: `${slideDownAnimationKeyframesName} calc(var(--animation-duration) / 2) cubic-bezier(0.5, 0, 0.5, 1) both`,
      },
      '.u-anim-slideDown': {
        animation: `${slideDownAnimationKeyframesName} calc(var(--animation-duration) / 2) cubic-bezier(0.5, 0, 0.5, 1) both`,
      },
      '.u-anim-jump': {
        animation: `.4s ${jumpAnimationKeyframesName} ease infinite alternate`,
      },

      '.u-fixed-message': {
        animation: `${fixedAnimationKeyframesName} .7s linear forwards`,
      },
      '.u-fixed-message::before, .u-to-be-fixed::before': {
        content: '""',
        backgroundColor: 'aliceblue',
        borderRadius: '50%',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        transform: 'scale(0.001, 0.001)',
      },
      '.u-fixed-message::before': {
        animation: `${dylanAnimationKeyframesName} 0.8s ease-out`,
        animationDelay: '.4s',
      },

      '.u-shadow': {
        boxShadow: '0 0.5rem 1rem #0003',
      },

      '.ui-form': {
        background: '#fff',
        width: '100%',
        borderRadius: '0.25rem',
        transition: 'all var(--transition-duration) var(--transition-easing)',
        willChange: 'transform',

        // '--color': 'var(--color-gray)',
      },
      '.ui-form:focus-within': {
        // '--color': 'var(--color-blue)',
      },

      "ui-form[data-state='subscribe']": {
        animation: `${slideUpAnimationKeyframesName} var(--animation-duration) var(--transition-easing)`,
      },

      ".ui-form[data-state='success']": {
        '--color': 'var(--color-green)',
      },

      ".ui-form[data-state='error']": {
        '--color': 'var(--color-red, red)',
        animation: `${shakeAnimationKeyframesName} 1s ease`,
      },
      '[data-show]:not([data-active])': {
        display: 'none',
      },
    },
  },
});
