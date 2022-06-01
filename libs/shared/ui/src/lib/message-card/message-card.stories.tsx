import { Story, Meta } from '@storybook/react';
import { MessageCard, MessageCardProps } from './message-card';
import { SpeechBubble } from '../speech-bubble/speech-bubble';
import avatarSVG from './avatar.example.svg';

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
        avatar: avatarSVG,
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

export const BrokenWithSpeechBubble = (args: MessageCardProps) => {
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

export const WithLinks = (args: MessageCardProps) => {
  const message = {
    ...args.message,
    body: 'Some text goes here and then there is a URL which should be clickable: https://sergeylukin.com/, now click it and it should open a new tab with the website sergeylukin[dot]com',
  };
  return <MessageCard message={message} />;
};
