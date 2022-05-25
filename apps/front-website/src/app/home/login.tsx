// import { useState, useEffect } from 'react';
import {
  Input,
  Box,
  keyframes,
  Heading,
  Flex,
  Button,
  FormControl,
  FormErrorMessage,
  // FormHelperText,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';

// import { useStoreState, useStoreActions } from '../store/hooks';

const gradient = keyframes`
0% {
  background-position: 0% 50%;
}
50% {
  background-position: 100% 50%;
}
100% {
  background-position: 0% 50%;
}
`;

const Login = () => {
  // const { rooms } = useStoreState((store) => store['roomsModel']);
  // const userName = useStoreState((store) => store['userModel'].name);
  // const [localName, setLocalName] = useState(userName);
  // const { setUsername, joinRoomThunk } = useStoreActions(
  //   (actions) => actions['userModel']
  // );
  // const submit = (): void => {
  //   setUsername(localName);
  // };
  // const fetchRooms = useStoreActions((actions) => actions['roomsModel'].fetch);
  // useEffect(() => {
  //   fetchRooms();
  //   // eslint-disable-next-line
  // }, []);
  return (
    <Box
      w="100%"
      h="200vh"
      bgGradient="linear(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)"
      bgSize="400% 400%"
      animation={`${gradient} 15s ease infinite`}
    >
      <Formik
        initialValues={{ username: '' }}
        validateOnChange={false}
        validate={
          // eslint-disable-next-line
          // @ts-ignore
          (values) => {
            const errors = {};
            if (!values.username) {
              // eslint-disable-next-line
              // @ts-ignore
              errors.username = 'Required';
            } else if (values.username.length < 4) {
              // eslint-disable-next-line
              // @ts-ignore
              errors.username = 'Too short';
            }
            return errors;
          }
        }
        onSubmit={
          // eslint-disable-next-line
          // @ts-ignore
          (values, { setStatus, setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setStatus('success');
              setSubmitting(false);
            }, 400);
          }
        }
      >
        {
          // eslint-disable-next-line
          // @ts-ignore
          (formikObj) => {
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
              <Flex height="100vh" alignItems="center" justifyContent="center">
                <Heading>ChaPP</Heading>
                <Box width={'3xl'}>
                  <Form className="ui-form" data-state={state}>
                    <Field type="username" name="username">
                      {
                        // eslint-disable-next-line
                        // @ts-ignore
                        ({ field, form }) => (
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
                        )
                      }
                    </Field>
                    <Button
                      colorScheme="teal"
                      isLoading={isSubmitting}
                      type="submit"
                      variant="login"
                    >
                      Submit
                    </Button>
                  </Form>
                </Box>
              </Flex>
            );
          }
        }
      </Formik>
      {/*<form class="ui-form">
        <input class="ui-input" type="username" placeholder="your@username.com" />
        <button
          class="ui-button"
          type="button"
          onclick="setState('subscribing')"
        >
          <span data-show="subscribe">Subscribe</span>
          <span data-show="subscribing">Subscribing</span>
          <span data-show="success">Success!</span>
          <span data-show="error">Error</span>
        </button>
        </form>*/}
      {/*<Box>Join</Box>
      <Box>
        <Input
          placeholder="nickname"
          width="100%"
          onChange={(evt) => {
            setLocalName(evt.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              submit();
            }
          }}
          value={localName}
          mr={5}
        />
      </Box>
      <ul>
        {rooms.map((room: RoomModel, index: number) => (
          <li
            key={index}
            onClick={() => {
              joinRoomThunk(room);
            }}
          >
            {room.name}
          </li>
        ))}
      </ul>
        */}
    </Box>
  );
};

export default Login;
