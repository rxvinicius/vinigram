import { useParams } from 'react-router-dom';

import { useGetPostById } from '@/lib/react-query/queries/postQueries';
import { Loader, PostAction } from '@/components/shared';

const UpdatePost = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || '');

  if (isPending) return <Loader />;

  return <PostAction post={post} action="Update" />;
};

export default UpdatePost;
