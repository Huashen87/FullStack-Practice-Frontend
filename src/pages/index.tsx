import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';
import { Layout } from '../components/Layout';

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <Layout>
      <div>hello world!</div>
      <br />
      {data ? data.posts.map((p) => <div key={p.id}>{p.title}</div>) : <div>loading...</div>}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
