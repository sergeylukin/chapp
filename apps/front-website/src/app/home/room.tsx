import { useState, useRef, useEffect } from 'react';
import { Flex, HStack, Button, Text, VStack, Box } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import { gradientAnimationName } from '@chapp/front-website/theme';
import { useStoreState, useStoreActions } from '@chapp/shared-state';
import { SpeechBubble, MessageForm, MessageCard } from '@chapp/shared-ui';

const Room = () => {
  const { room } = useStoreState((store) => store['roomModel']);

  const { user } = useStoreState((store) => store['userModel']);
  const { prevMessages, messages, bubbles } = useStoreState(
    (store) => store['messagesModel']
  );
  const { leaveRoomThunk } = useStoreActions((actions) => actions['userModel']);
  const { loadMessagesThunk, toggleBubbles } = useStoreActions(
    (actions) => actions['messagesModel']
  );

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      messagesContainerRef.current &&
      prevMessages.length &&
      messages.length &&
      prevMessages[prevMessages.length - 1].body !==
        messages[messages.length - 1].body
    )
      messagesContainerRef.current.scroll({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
  }, [prevMessages, messages]);

  useEffect(() => {
    loadMessagesThunk();
    const timer = setInterval(() => {
      loadMessagesThunk();
    }, 6500);

    if (messagesContainerRef.current) {
      messagesContainerRef.current.scroll({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }

    return () => {
      clearInterval(timer);
    };

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
                <Box
                  sx={{
                    position: 'relative',
                  }}
                  key={index}
                >
                  <MessageCard
                    needsVisualRepairment={message.isVisuallyBroken}
                    message={message}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: '120%',
                      left: '20px',
                    }}
                  >
                    {bubbles[index].message && (
                      <SpeechBubble
                        message={bubbles[index].message}
                        delay={bubbles[index].delay}
                      />
                    )}
                  </Box>
                </Box>
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
