import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';
import NavBar from '../components/NavBar';

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <NavBar />
      <div>hello world!</div>
      <br />
      {data ? data.posts.map((p) => <div key={p.id}>{p.title}</div>) : <div>loading...</div>}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
