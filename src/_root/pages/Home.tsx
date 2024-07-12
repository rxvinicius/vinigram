import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Models } from 'appwrite';

import { Loader, PostCard } from '@/components/shared';
import { useGetPosts } from '@/lib/react-query/queries/postQueries';

type Page = {
  documents: Models.Document[];
  total: number;
};

const Home = () => {
  const { data: posts, isPending, fetchNextPage, hasNextPage } = useGetPosts();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="page-title">Home Feed</h2>
          {isPending && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.pages.map((page: Page, index) => (
                <div key={`page-${index}`}>
                  {page.documents.map((post: Models.Document) => (
                    <PostCard key={post.$id} post={post} />
                  ))}
                </div>
              ))}
            </ul>
          )}
        </div>

        {hasNextPage && (
          <div ref={ref} className="mt-10">
            <Loader />
          </div>
        )}

        {!hasNextPage && !isPending && (
          <p className="tbext-light-4 text-center w-full mt-0">End of posts</p>
        )}
      </div>
    </div>
  );
};

export default Home;
