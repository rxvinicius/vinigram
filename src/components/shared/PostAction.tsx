import { IPostForm } from '@/types';
import PostForm from '../forms/PostForm';

const PostAction = ({ post, action }: IPostForm) => (
  <div className="flex flex-1">
    <div className="common-container">
      <div className="flex-start gap-3 justify-start w-full max-w-5xl">
        <img
          src="/assets/icons/add-post.svg"
          alt="add"
          width={36}
          height={36}
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">{action} Post</h2>
      </div>

      <PostForm post={post} action={action} />
    </div>
  </div>
);

export default PostAction;
