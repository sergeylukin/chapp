import React from 'react';
import { MessageWithUser } from '@chapp/api-interfaces';
import { Flex, Text, Avatar } from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface MessageCardProps {
  message: MessageWithUser;
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
        my="2"
        ml={3}
        p="3"
        borderRadius={5}
        position="relative"
      >
        <Text>{message.body}</Text>
        <Text
          borderRadius={6}
          py={0}
          px={4}
          bgColor={'gray.200'}
          sx={{ position: 'absolute', top: -2, left: -1 }}
          fontSize="xs"
        >
          {message.user.name}
        </Text>
      </Flex>
    </Flex>
  );
}

export default MessageCard;
