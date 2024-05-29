import { Link, useParams } from 'react-router-dom';

import { useUserContext } from '@/context/AuthContext';
import { useGetPostById } from '@/lib/react-query/queries/postQueries';
import { formatDate } from '@/lib/utils';
import { Loader, PostInfo, PostStats } from '@/components/shared';
import { Button } from '@/components/ui/button';

const PostDetails = () => {
  const { user } = useUserContext();
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || '');

  if (!post) return;

  const postCreator = post?.creator;
  const defaultP = 'p-4';

  const handleDeletePost = () => {
    // TODO: delete post
    console.log('delete');
  };

  return (
    <div className="post_details-container">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img src={post.imageUrl} alt="post" className="post_details-img" />

          {/* Post creator informations (name and photo) and created at */}
          <div className="post_details-info">
            <div className="flex-between w-full">
              <div className={`flex items-center gap-3 ${defaultP}`}>
                {/* Post creator photo */}
                <Link to={`/profile/${postCreator.$id}`}>
                  <img
                    src={
                      postCreator.imageUrl ||
                      '/assets/icons/profile-placeholder.svg'
                    }
                    alt="post creator"
                    className="rounded-full w-8 h-8 lg:w-10 lg:h-10"
                  />
                </Link>

                <div className="flex flex-col">
                  {/* Post creator name */}
                  <Link
                    to={`/profile/${postCreator.$id}`}
                    className="base-medium lg:body-bold text-light-1"
                  >
                    {postCreator.name}
                  </Link>

                  {/* Post date and location */}
                  <div className="flex-center gap-2 text-light-3 subtle-semibold lg:small-regular">
                    <p>{formatDate(post.$createdAt)}</p> -{' '}
                    <p>{post.location}</p>
                  </div>
                </div>
              </div>

              {/* Only the post creator can edit the post */}
              {user.id === postCreator.$id && (
                <div className="flex-center lg:px-1">
                  <Link to={`/update-post/${post.$id}`}>
                    <img
                      src="/assets/icons/edit.svg"
                      alt="edit post"
                      className="w-[20px] h-[20px] lg:w-[22px] lg:h-[22px]"
                    />
                  </Link>

                  <Button
                    variant="ghost"
                    className="p-3"
                    onClick={handleDeletePost}
                  >
                    <img
                      src="/assets/icons/delete.svg"
                      alt="delete"
                      className="w-[20px] h-[20px] lg:w-[22px] lg:h-[22px]"
                    />
                  </Button>
                </div>
              )}
            </div>

            <hr className="w-full border border-dark-4/80" />

            <div
              className={`flex flex-col flex-1 w-full small-medium lg:base-regular ${defaultP} pt-0`}
            >
              <PostInfo post={post} />
            </div>

            <div className={`w-full p-4 ${defaultP}`}>
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
