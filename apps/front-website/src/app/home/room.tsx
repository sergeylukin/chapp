import { useRef, useEffect } from 'react';
import { Flex, HStack, Button, Text, VStack, Box } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import Div100vh from 'react-div-100vh';

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

    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scroll({
          top: messagesContainerRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <Div100vh>
      <Box
        w="100%"
        h="100vh"
        bgGradient="linear(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)"
        bgSize="400% 400%"
        overflow="hidden"
        animation={`${gradientAnimationName} 15s ease infinite`}
      >
        <HStack
          alignSelf="start"
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
          }}
          pt={1}
          pl={6}
        >
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
        <VStack
          spacing={4}
          mt={14}
          pb={4}
          px={6}
          w="full"
          sx={{
            position: 'fixed',
          }}
        >
          <VStack
            alignItems="start"
            w="100%"
            h="calc(100vh - var(--chakra-space-14) - var(--chakra-space-14) - var(--chakra-space-10))"
            overflowY="scroll"
            overflowX="hidden"
            position="relative"
            sx={{
              '&::before': {
                content: '""',
                position: 'fixed',
                boxShadow: 'inset -21px 13px 24px -11px rgb(0 0 0 / 40%)',
                w: 'calc(100vw + 100px)',
                h: '100px',
                top: 14,
                left: '-20px',
                zIndex: 1000,
              },
              '&::after': {
                content: '""',
                position: 'fixed',
                boxShadow: 'inset 0px -12px 32px -8px rgb(0 0 0 / 17%)',
                w: '100vw',
                h: '100px',
                bottom: '95px',
                zIndex: 1000,
                left: 0,
              },
            }}
            ref={messagesContainerRef}
          >
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
          </VStack>
          <Flex
            w="full"
            sx={{
              position: 'fixed',
              bottom: 4,
              px: 6,
            }}
          >
            <MessageForm />
          </Flex>
        </VStack>
      </Box>
    </Div100vh>
  );
};

export default Room;
