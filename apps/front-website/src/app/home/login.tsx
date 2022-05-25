// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useMemo, useRef, useEffect } from 'react';
import {
  Input,
  Box,
  keyframes,
  Flex,
  Button,
  FormControl,
  FormErrorMessage,
  // FormHelperText,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';

import { useStoreState, useStoreActions } from '../store/hooks';
import Logo from './logo';

const Login = () => {
  const { rooms } = useStoreState((store) => store['roomsModel']);
  const { setUsername, joinRoomThunk } = useStoreActions(
    (actions) => actions['userModel']
  );
  const fetchRooms = useStoreActions((actions) => actions['roomsModel'].fetch);
  useEffect(() => {
    fetchRooms();
    // eslint-disable-next-line
  }, []);

  const logoRef = useRef();

  return (
    <Box w="100%" h="200vh" bgSize="400% 400%">
      <Formik
        initialValues={{ username: '' }}
        validateOnChange={false}
        validate={(values) => {
          const errors = {};
          if (!values.username) {
            errors.username = 'Required';
          } else if (values.username.length < 4) {
            errors.username = 'Too short';
          }
          return errors;
        }}
        onSubmit={(values, { setStatus, setSubmitting }) => {
          setStatus('success');
          setTimeout(() => {
            setUsername(values.username);
            logoRef.current.playCloseAnimation();
            setTimeout(() => {
              joinRoomThunk(rooms[0]);
            }, 800);
            setSubmitting(false);
          }, 400);
        }}
      >
        {(formikObj) => {
          const { isSubmitting, errors } = formikObj;
          console.log(formikObj);
          let state = 'subscribe';
          if (isSubmitting) {
            state = 'subscribing';
          }
          if (Object.keys(errors).length > 0) {
            state = 'error';
          }
          if (isSubmitting && Object.keys(errors).length === 0) {
            state = 'success';
          }
          return (
            <Flex
              direction="column"
              height="100vh"
              alignItems="center"
              justifyContent="center"
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
              <Box>
                <Form className="ui-form" data-state={state}>
                  <Field type="username" name="username">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.username && form.touched.username
                        }
                      >
                        <Input
                          {...field}
                          variant="login"
                          id="username"
                          placeholder="What's your name?"
                        />
                        <FormErrorMessage variant="login">
                          {form.errors.username}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    colorScheme="teal"
                    isLoading={isSubmitting}
                    type="submit"
                    variant="login"
                  >
                    Let's talk
                  </Button>
                </Form>
              </Box>
            </Flex>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Login;
