import { Box, Flex, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const CreatePost: React.FC = () => {
  const [, createPost] = useCreatePostMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values) => {
          await createPost({ input: values });
          router.push('/');
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField label="Title" placeholder="Title..." name="title" />
            <Box mt={4}>
              <InputField textarea label="Text" placeholder="Text..." name="text" type="text" />
            </Box>
            <Flex>
              <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme="teal">
                Post
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
