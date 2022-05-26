import React from 'react';
import { Story, Meta } from '@storybook/react';
import { MessageCard, MessageCardProps } from './message-card';

export default {
  component: MessageCard,
  title: 'MessageCard',
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

export const Primary = Template.bind({});
Primary.args = {};
