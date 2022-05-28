import React from 'react';
import { Story, Meta } from '@storybook/react';
import { SpeechBubble, SpeechBubbleProps } from './speech-bubble';

export default {
  component: SpeechBubble,
  title: 'Molecules/SpeechBubble',
  argTypes: {},
  args: {
    message: 'Pls fix me!',
  },
  parameters: {
    backgrounds: {
      default: 'chapp',
    },
  },
} as Meta;

const Template: Story<SpeechBubbleProps> = (args) => <SpeechBubble {...args} />;

export const Default = Template.bind({});
Default.args = {};
