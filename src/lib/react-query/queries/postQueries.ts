import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createPost, getRecentPosts } from '../../appwrite/api/posts';
import { QUERY_KEYS } from '../queryKeys';
import { INewPost } from '@/types';

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetRecentPosts = () =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
