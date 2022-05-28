import { useRef, useEffect } from 'react';
import { Flex, HStack, Button, Text, VStack, Box } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import { gradientAnimationName } from '@chapp/front-website/theme';
import { useStoreState, useStoreActions } from '@chapp/shared-state';
import { MessageForm, MessageCard } from '@chapp/shared-ui';

const Room = () => {
  const { room } = useStoreState((store) => store['roomModel']);

  const { user } = useStoreState((store) => store['userModel']);
  const { messages } = useStoreState((store) => store['messagesModel']);
  const { leaveRoomThunk } = useStoreActions((actions) => actions['userModel']);
  const { loadMessagesThunk } = useStoreActions(
    (actions) => actions['messagesModel']
  );

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current)
      messagesContainerRef.current.scroll({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
  }, [messages]);

  useEffect(() => {
    loadMessagesThunk();
    const timer = setInterval(loadMessagesThunk, 5000);
    return () => clearInterval(timer);
    // eslint-disable-next-line
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
                <div key={index}>
                  <MessageCard message={message} />
                </div>
              );
            })}
          </ul>
        </Flex>
        <Flex w="full">
          <MessageForm />
        </Flex>
      </VStack>
    </Box>
  );
};

export default Room;
