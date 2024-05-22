import { useParams } from 'react-router-dom';

import { useGetPostById } from '@/lib/react-query/queries/postQueries';
import { Loader } from '@/components/shared';
import PostForm from '@/components/forms/PostForm';

const UpdatePost = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || '');

  if (isPending) return <Loader />;

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-3 justify-start w-full max-w-5xl">
          <img
            src="/assets/icons/add-post.svg"
            alt="add"
            width={36}
            height={36}
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>

        <PostForm post={post} action="Update" />
      </div>
    </div>
  );
};

export default UpdatePost;
