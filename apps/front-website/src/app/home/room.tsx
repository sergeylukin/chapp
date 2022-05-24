import { useRef } from 'react';
import {
  Button,
  Input,
  Stack,
  useColorModeValue,
  Box,
  Flex,
} from '@chakra-ui/react';

import { IMessageBody } from '../store/models/message.model';
import { useStoreState, useStoreActions } from '../store/hooks';

const Room = () => {
  const { room } = useStoreState((store) => store['roomModel']);

  const { user } = useStoreState((store) => store['userModel']);
  const { leaveRoomThunk } = useStoreActions(
    (actions) => actions['userModel']
  );

  const { message } = useStoreState((store) => store['messageModel']);
  const { setMessageBody, sendMessageThunk } = useStoreActions(
    (actions) => actions['messageModel']
  );

  const messageInputRef = useRef<HTMLInputElement>(null);

  return (
    <Box w="100%" h="200vh" bgSize="400% 400%">
      <p>
        {user.name} you are in room {room.name}
      </p>

      <button onClick={() => leaveRoomThunk(room)}>Leave</button>

      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Input
            ref={messageInputRef}
            placeholder="So how is your day going?"
            width="100%"
            onChange={(evt) => setMessageBody(evt.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                sendMessageThunk(messageInputRef?.current?.value);
              }
            }}
            value={message.body as IMessageBody}
            mr={5}
          />
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.400'}
            _hover={{
              bg: 'pink.300',
            }}
            onClick={() => {
              sendMessageThunk(messageInputRef?.current?.value);
            }}
          >
            Send
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Room;
