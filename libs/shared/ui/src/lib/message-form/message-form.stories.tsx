import React from 'react';
import { Story, Meta } from '@storybook/react';
import { MessageForm } from './message-form';

export default {
  component: MessageForm,
  title: 'Molecules/MessageForm',
  argTypes: {},
  args: {},
  parameters: {
    backgrounds: {
      default: 'chapp',
    },
  },
} as Meta;

const Template: Story = (args) => <MessageForm {...args} />;

export const Default = Template.bind({});
Default.args = {};
