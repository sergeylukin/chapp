import React from 'react';
import { Story, Meta } from '@storybook/react';
import { LoginForm } from './login-form';

export default {
  component: LoginForm,
  title: 'Molecules/LoginForm',
  argTypes: {},
  args: {},
  parameters: {},
} as Meta;

const Template: Story = (args) => <LoginForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSubmit: (values, { resetForm, setSubmitting }) => {
    setTimeout(() => {
      resetForm();
      setSubmitting(false);
    }, 1500);
  },
};
