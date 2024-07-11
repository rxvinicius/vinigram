import { useGetCurrentUser } from '@/lib/react-query/queries/userQueries';
import { GridPostList, Loader } from '@/components/shared';

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser();

  if (!currentUser) {
    return <Loader />;
  }

  const likedPosts = currentUser.liked;

  return (
    <>
      {likedPosts.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}

      <GridPostList posts={likedPosts} showStats={false} />
    </>
  );
};

export default LikedPosts;
