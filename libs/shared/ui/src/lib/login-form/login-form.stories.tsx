import React from 'react';
import { Story, Meta } from '@storybook/react';
import { LoginForm } from './login-form';

export default {
  component: LoginForm,
  title: 'LoginForm',
  argTypes: {},
  args: {},
  parameters: {},
} as Meta;

const Template: Story = (args) => <LoginForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  onSubmit: (values, { resetForm, setSubmitting }) => {
    console.log('got values and submitted', values);
    setTimeout(() => {
      resetForm();
      setSubmitting(false);
    }, 1500);
  },
};
