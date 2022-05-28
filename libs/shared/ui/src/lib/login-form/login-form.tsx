import { useRef, useEffect } from 'react';
import {
  Input,
  HStack,
  Button,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

interface LoginFormProps {
  onSubmit: (values: any, form: any) => void;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const changeLoginFormColor = () => {
    const colors = [
      '#ffd708',
      '#fea503',
      '#fe4603',
      '#dc173e',
      '#810081',
      '#018181',
      '#4783b4',
      '#9acd33',
    ];
    const currentColor =
      document.documentElement.style.getPropertyValue('--color');
    const currentIndex = colors.indexOf(currentColor);
    const nextColor =
      currentIndex !== -1 && currentIndex !== colors.length - 1
        ? colors[currentIndex + 1]
        : colors[0];
    document.documentElement.style.setProperty('--color', nextColor);
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();

    const timer = setInterval(changeLoginFormColor, 1000);
    return () => clearInterval(timer);

    // eslint-disable-next-line
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  const schema = Yup.object().shape({
    username: Yup.string().required('oh, seriously, I need it...').min(3),
  });

  return (
    <Formik
      initialValues={{ username: '' }}
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
          .then(() => {
            setStatus('success');
            onSubmit(values, { setSubmitting, resetForm });
          })
          .catch((err) => {
            setStatus('error');
            setSubmitting(false);
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
      {({ status, isSubmitting }) => {
        return (
          <Form className="ui-form" data-state={status}>
            <HStack w="full" spacing={3} alignItems="start">
              <Field type="username" name="username">
                {({
                  field,
                  form,
                }: {
                  field: string;
                  form: {
                    touched: { username: string };
                    errors: { username: string };
                  };
                }) => (
                  <FormControl
                    isInvalid={
                      !!(form.errors.username && form.touched.username)
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
        );
      }}
    </Formik>
  );
};

export default LoginForm;
