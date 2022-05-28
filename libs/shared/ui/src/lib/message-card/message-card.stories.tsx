import React from 'react';
import { Story, Meta } from '@storybook/react';
import { MessageCard, MessageCardProps } from './message-card';
import {
  SpeechBubble,
  SpeechBubbleProps,
} from '../speech-bubble/speech-bubble';

export default {
  component: MessageCard,
  title: 'Molecules/MessageCard',
  argTypes: {},
  args: {
    message: {
      body: 'Hello there!',
      userId: 2,
      roomId: 3,
      user: {
        name: 'silvia',
      },
    },
  },
  parameters: {
    backgrounds: {
      default: 'chapp',
    },
  },
} as Meta;

const Template: Story<MessageCardProps> = (args) => <MessageCard {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Broken = Template.bind({});
Broken.args = { needsVisualRepairment: true };

export const BrokenWithSpeechBubble = (args) => {
  return (
    <div
      style={{
        marginTop: '100px',
        position: 'relative',
      }}
    >
      <MessageCard needsVisualRepairment={true} message={args.message} />
      <div
        style={{
          position: 'absolute',
          bottom: '120%',
          left: '20px',
        }}
      >
        <SpeechBubble delay={0.3} message="Help!" />
      </div>
    </div>
  );
};
