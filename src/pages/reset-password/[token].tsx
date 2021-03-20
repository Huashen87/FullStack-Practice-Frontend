import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import InputField from '../../components/InputField';
import Wrapper from '../../components/Wrapper';
import { useResetPasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';
import NextLink from 'next/link';

const ResetPassword: NextPage<{ token: string }> = ({ token }) => {
  const [, resetPassword] = useResetPasswordMutation();
  const router = useRouter();
  const [tokenError, setTokenError] = useState('');
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: '', confirmPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await resetPassword({
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
            token: token,
          });
          if (response.data?.resetPassword.errors) {
            const errorMap = toErrorMap(response.data.resetPassword.errors);
            if ('token' in errorMap) setTokenError(errorMap.token);
            setErrors(errorMap);
          } else if (response.data?.resetPassword.user) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              label="New Password"
              placeholder="new password"
              name="newPassword"
              type="password"
            />
            <Box mt={4}>
              <InputField
                label="Confirm Password"
                placeholder="confirm password"
                name="confirmPassword"
                type="password"
              />
            </Box>
            {tokenError ? (
              <Flex mt={4}>
                <Box mr={2} color="red">
                  {tokenError}
                </Box>
                <NextLink href="/forgot-password">
                  <Link>click here to get a new one</Link>
                </NextLink>
              </Flex>
            ) : null}
            <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme="teal">
              Reset Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ResetPassword.getInitialProps = ({ query }) => {
  return { token: query.token as string };
};

export default withUrqlClient(createUrqlClient)(ResetPassword as React.FC);
