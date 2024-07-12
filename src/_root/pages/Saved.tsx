import { useUserContext } from '@/context/AuthContext';
import { useGetSavedPosts } from '@/lib/react-query/queries/postQueries';

import { GridPostList, Loader } from '@/components/shared';

const Saved = () => {
  const { user } = useUserContext();
  const { data, isPending } = useGetSavedPosts(user.id);

  if (!data || isPending) {
    return <Loader />;
  }

  const posts = data.documents.map((item) => item.post);

  return (
    <div className="saved-container">
      {/* Header */}
      <div className="flex-start gap-3 justify-start w-full max-w-5xl">
        <img
          src="/assets/icons/save.svg"
          width={32}
          height={32}
          alt="Saved posts"
          className="invert-white"
        />
        <h2 className="page-title">Saved Posts</h2>
      </div>

      {/* Grid post list */}
      {posts.length === 0 ? (
        <p className="text-light-4">No saved posts</p>
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          <GridPostList posts={posts} showStats={false} showUser={false} />
        </ul>
      )}
    </div>
  );
};

export default Saved;
