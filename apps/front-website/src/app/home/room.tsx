// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useRef, useEffect } from 'react';
import {
  HStack,
  Button,
  Text,
  Avatar,
  VStack,
  Box,
  Flex,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import { gradientAnimationName } from '@chapp/front-website/theme';
import { useStoreState, useStoreActions } from '../store/hooks';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import MessageForm from './messageform';

const Room = () => {
  const { room } = useStoreState((store) => store['roomModel']);

  const { user } = useStoreState((store) => store['userModel']);
  const { messages } = useStoreState((store) => store['messagesModel']);
  const { leaveRoomThunk } = useStoreActions((actions) => actions['userModel']);
  const { loadMessagesThunk } = useStoreActions(
    (actions) => actions['messagesModel']
  );

  const messagesContainerRef = useRef();

  useEffect(() => {
    loadMessagesThunk();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current)
      messagesContainerRef.current.scroll({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
  }, [messages]);

  useEffect(() => {
    const timer = setInterval(loadMessagesThunk, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      w="100%"
      h="100vh"
      bgGradient="linear(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)"
      bgSize="400% 400%"
      animation={`${gradientAnimationName} 15s ease infinite`}
    >
      <VStack spacing={2} pt={2} pb={6} px={6} h="100vh">
        <HStack alignSelf="start">
          <Text color="white">
            You're logged in as <strong>{user.name}</strong> |
          </Text>
          <Button
            variant="logout"
            rightIcon={<ArrowForwardIcon />}
            onClick={() => leaveRoomThunk(room)}
          >
            Logout
          </Button>
        </HStack>
        <Flex w="full" h="full" overflow="scroll" ref={messagesContainerRef}>
          <ul>
            {messages.map((message, index) => {
              return (
                <Flex key={index} w="100%">
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
            })}
          </ul>
        </Flex>
        <Flex h="7vh" w="full">
          <MessageForm />
        </Flex>
      </VStack>
    </Box>
  );
};

export default Room;
