import { IPostForm } from '@/types';
import PostForm from '../forms/PostForm';
import PageHeader from './PageHeader';

const PostAction = ({ post, action }: IPostForm) => (
  <div className="flex flex-1">
    <div className="common-container">
      <PageHeader
        title={`${action} Post`}
        imageSrc="/assets/icons/add-post.svg"
        imageAlt={`${action} Post`}
      />
      <PostForm post={post} action={action} />
    </div>
  </div>
);

export default PostAction;
