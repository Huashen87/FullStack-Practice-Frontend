import { Box, Flex, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import InputField from '../components/InputField';
import { Layout } from '../components/Layout';
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useIsAuth } from '../utils/useIsAuth';

const CreatePost: React.FC = () => {
  const [, createPost] = useCreatePostMutation();
  useIsAuth();
  const router = useRouter();
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values });
          if (!error) router.push('/');
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
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
