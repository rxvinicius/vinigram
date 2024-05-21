import { MouseEvent, useEffect, useState } from 'react';
import { Models } from 'appwrite';

import {
  useDeleteSavedPost,
  useLikePost,
  useSavePost,
} from '@/lib/react-query/queries/postQueries';
import { useGetCurrentUser } from '@/lib/react-query/queries/userQueries';
import Loader from './Loader';

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const { data: currentUser } = useGetCurrentUser();

  const likesList = post.likes.map((user: Models.Document) => user.$id);
  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  const { mutate: savePost, isPending: isSaving } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSaved } =
    useDeleteSavedPost();
  const { mutate: likePost } = useLikePost();

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const checkIsLiked = (likeList: string[], userId: string) =>
    likeList.includes(userId);

  const handleLikePost = (e: MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post.$id, likesArray: newLikes });
  };

  const handleSavePost = (e: MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
    } else {
      setIsSaved(true);
      savePost({ postId: post.$id, userId });
    }
  };

  useEffect(() => setIsSaved(savedPostRecord), [currentUser]);

  return (
    <div className="flex-between z-10">
      <div className="flex gap-2 mr-5">
        <img
          src={`/assets/icons/${
            checkIsLiked(likes, userId) ? 'liked' : 'like'
          }.svg`}
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        {isDeletingSaved || isSaving ? (
          <Loader size="small" />
        ) : (
          <img
            src={`/assets/icons/${isSaved ? 'saved' : 'save'}.svg`}
            alt="like"
            width={20}
            height={20}
            onClick={handleSavePost}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
