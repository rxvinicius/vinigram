import { useGetCurrentUser } from '@/lib/react-query/queries/userQueries';
import { GridPostList, Loader } from '@/components/shared';

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser();

  if (!currentUser) {
    return <Loader />;
  }

  const likedPosts = currentUser.liked;

  if (likedPosts.length === 0) {
    return <p className="text-light-4">No liked posts</p>;
  }

  return <GridPostList posts={likedPosts} showStats={false} />;
};

export default LikedPosts;
