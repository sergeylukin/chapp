import React from 'react';
import { IMessage } from '@chapp/api-interfaces';
import { Flex, Text, Avatar } from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface MessageCardProps {
  message: IMessage;
}

export function MessageCard({ message }: MessageCardProps) {
  return (
    <Flex w="100%">
      <Avatar
        name="Computer"
        src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
        bg="blue.300"
        mt={2}
      ></Avatar>
      <Flex
        bg="gray.100"
        color="black"
        minW="100px"
        maxW="350px"
        my="1"
        ml={3}
        p="3"
        borderRadius={5}
      >
        <Text>{message.body}</Text>
      </Flex>
    </Flex>
  );
}

export default MessageCard;
