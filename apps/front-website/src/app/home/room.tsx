import { useEffect } from 'react';
import { VStack, Box, Flex } from '@chakra-ui/react';

import { gradientAnimationName } from '@justt/front-website/theme';
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

  useEffect(() => {
    loadMessagesThunk();
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
      <VStack spacing={2} py={6} px={6} h="full">
        <Flex h="full">
          <p>
            {user.name} | {room.name}
          </p>

          <button onClick={() => leaveRoomThunk(room)}>Leave</button>
        </Flex>
        <ul>
          {messages.map((message, index) => {
            return <li key={index}>{message.body}</li>;
          })}
        </ul>
        <MessageForm />
      </VStack>
    </Box>
  );
};

export default Room;
