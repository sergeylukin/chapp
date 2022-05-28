// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useRef, useEffect } from 'react';
import {
  Box,
  Flex,
  // FormHelperText,
} from '@chakra-ui/react';

import { useStoreActions, useStoreState } from '@chapp/shared-state';
import { Logo, LoginForm } from '@chapp/shared-ui';

const Login = () => {
  const { rooms } = useStoreState((store) => store['roomsModel']);
  const fetchRooms = useStoreActions((actions) => actions['roomsModel'].fetch);
  const { setUsername, joinRoomThunk } = useStoreActions(
    (actions) => actions['userModel']
  );

  useEffect(() => {
    fetchRooms();
    // eslint-disable-next-line
  }, []);

  const logoRef = useRef();

  const onLoginFormSubmit = (values) => {
    setTimeout(() => {
      setUsername(values.username);
      logoRef.current.playCloseAnimation();
      setTimeout(() => {
        joinRoomThunk(rooms[0]);
      }, 800);
    }, 400);
  };

  return (
    <Box w="100%" bgSize="400% 400%">
      <Flex
        direction="column"
        height="100vh"
        alignItems="center"
        justifyContent="center"
        px={4}
      >
        <Flex
          className="u-anim-slideDown"
          justifyContent="center"
          sx={{
            animationDelay: '.3s',
          }}
        >
          <Logo title="Chapp" ref={logoRef} />;
        </Flex>
        <Flex className="u-anim-slideUp" maxW={500}>
          <LoginForm onSubmit={onLoginFormSubmit} logoRef={logoRef} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Login;
