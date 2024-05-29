import { Models } from 'appwrite';
import { Link } from 'react-router-dom';

import { formatDate } from '@/lib/utils';
import { useUserContext } from '@/context/AuthContext';
import PostStats from './PostStats';
import PostInfo from './PostInfo';

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();
  const postCreator = post?.creator;

  if (!post) return;

  return (
    <div className="post-card">
      <div className="flex-between">
        {/* Post creator informations (name and photo) and created at */}
        <div className="flex items-center gap-3">
          <Link to={`/profile/${postCreator.$id}`}>
            <img
              src={
                postCreator.imageUrl || '/assets/icons/profile-placeholder.svg'
              }
              alt="post creator"
              className="rounded-full w-12 lg:h-12"
            />
          </Link>

          <div>
            <Link
              to={`/profile/${postCreator.$id}`}
              className="base-medium lg:body-bold text-light-1"
            >
              {postCreator.name}
            </Link>

            <div className="flex-center gap-2 text-light-3 subtle-semibold lg:small-regular">
              <p>{formatDate(post.$createdAt)}</p> - <p>{post.location}</p>
            </div>
          </div>
        </div>

        {/* Only the post creator can edit the post */}
        {user.id === postCreator.$id && (
          <Link to={`/update-post/${post.$id}`}>
            <img
              src="/assets/icons/edit.svg"
              alt="edit post"
              width={20}
              height={20}
            />
          </Link>
        )}
      </div>

      <Link to={`/post/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <PostInfo post={post} />
        </div>

        <div className="w-full h-64 xs:h-[400px] lg:h-[450px] overflow-hidden relative rounded-[24px] mb-5">
          <img
            src={post.imageUrl}
            className="absolute inset-0 w-full h-full object-cover"
            alt="post image"
          />
        </div>
      </Link>

      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
