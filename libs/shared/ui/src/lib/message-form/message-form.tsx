import { useEffect, useRef } from 'react';
import {
  Box,
  HStack,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { useStoreActions } from '@chapp/shared-state';

const schema = Yup.object().shape({
  msg: Yup.string().required('No empty messages, sorry'),
});

export function MessageForm() {
  const { sendMessageThunk } = useStoreActions(
    (actions) => actions['messageModel']
  );
  const messageInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (messageInputRef.current) messageInputRef.current.focus();
    // eslint-disable-next-line
  }, []);
  return (
    <Formik
      initialValues={{ msg: '' }}
      initialStatus="subscribe"
      onSubmit={(
        values,
        { resetForm, setErrors, setStatus, setSubmitting }
      ) => {
        setSubmitting(true);
        setStatus('subscribing');
        schema
          .validate(values, {
            abortEarly: false, // not to stop on single validation fail
            // and return single error message
          })
          .then(async () => {
            setStatus('success');
            await sendMessageThunk(values.msg);
            resetForm();
            setSubmitting(false);
          })
          .catch((err) => {
            setSubmitting(false);
            setStatus('error');
            const errors: {
              [key: string]: string;
            } = {};
            Object.keys(values).forEach((key, idx) => {
              if (err && err.errors && err.errors[idx]) {
                errors[key] = err.errors[idx];
              }
            });

            setErrors(errors);
          });
      }}
    >
      {({ status, isSubmitting }) => (
        <Form data-state={status} style={{ width: '100%' }}>
          <Box className="ui-form u-shadow" p={2}>
            <HStack w="100%" spacing={3} alignItems="start">
              <Field type="msg" name="msg">
                {({
                  field,
                  form,
                }: {
                  field: string;
                  form: { touched: { msg: string }; errors: { msg: string } };
                }) => (
                  <FormControl
                    isInvalid={!!(form.errors.msg && form.touched.msg)}
                  >
                    <Input
                      {...field}
                      variant="login"
                      id="msg"
                      placeholder="Type your message here..."
                      ref={messageInputRef}
                    />
                    <FormErrorMessage variant="login">
                      {form.errors.msg}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                px={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
                variant="login"
              >
                Send
              </Button>
            </HStack>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default MessageForm;
