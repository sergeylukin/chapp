// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useMemo, useRef, useEffect } from 'react';
import {
  Input,
  Box,
  HStack,
  keyframes,
  Flex,
  Button,
  FormControl,
  FormErrorMessage,
  // FormHelperText,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

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
    if (inputRef.current) inputRef.current.focus();
    // eslint-disable-next-line
  }, []);

  const logoRef = useRef();
  const inputRef = useRef();

  const schema = Yup.object().shape({
    username: Yup.string().required('oh, seriously, I need it...').min(3),
  });

  return (
    <Box w="100%" h="200vh" bgSize="400% 400%">
      <Formik
        initialValues={{ username: '' }}
        onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
          setSubmitting(true);
          setStatus('subscribing');
          schema
            .validate(values, {
              abortEarly: false, // not to stop on single validation fail
              // and return single error message
            })
            .then(() => {
              setStatus('success');
              setTimeout(() => {
                setUsername(values.username);
                logoRef.current.playCloseAnimation();
                setTimeout(() => {
                  joinRoomThunk(rooms[0]);
                }, 800);
              }, 400);
            })
            .catch((err) => {
              setStatus('error');
              setSubmitting(false);
              const errors = {};
              Object.keys(values).forEach((key, idx) => {
                if (err && err.errors && err.errors[idx]) {
                  errors[key] = err.errors[idx];
                }
              });

              setErrors(errors);
            });
        }}
      >
        {({ status, isSubmitting }) => {
          console.log(isSubmitting);
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
                <Form className="ui-form" data-state={status}>
                  <HStack w="full" spacing={3} alignItems="start">
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
                            ref={inputRef}
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
                  </HStack>
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
