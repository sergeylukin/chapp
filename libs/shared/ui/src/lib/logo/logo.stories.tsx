import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Logo, ILogoAnimation, ILogoProps } from './logo';

export default {
  component: Logo,
  title: 'Molecules/Logo',
  argTypes: {},
  args: {
    title: 'Chapp',
    ref: null,
  },
} as Meta;

export const Default = (args: ILogoProps) => {
  const ref = React.useRef<ILogoAnimation>(null);

  return (
    <>
      <button
        style={{
          border: '1px solid black',
          backgroundColor: '#dd143c',
          color: 'white',
          padding: '.5em 1em',
          cursor: 'pointer',
        }}
        onClick={() => {
          if (ref.current?.playCloseAnimation)
            ref?.current?.playCloseAnimation();
        }}
      >
        This button shows how to activate logo's fade out animation from another
        component
      </button>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '50vh',
        }}
      >
        <Logo title={args.title} ref={ref} />
      </div>
    </>
  );
};
