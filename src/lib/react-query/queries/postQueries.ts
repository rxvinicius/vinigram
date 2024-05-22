import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createPost,
  deletePost,
  deleteSavedPost,
  getPostById,
  getRecentPosts,
  likePost,
  savePost,
  updatePost,
} from '../../appwrite/api/posts';
import { QUERY_KEYS } from '../queryKeys';
import { INewPost, IUpdatePost } from '@/types';

const useCreatePost = () => {
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

const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: IUpdatePost) => updatePost(post),
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
    },
  });
};

const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, imageId }: { postId: string; imageId: string }) =>
      deletePost(postId, imageId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      // TODO: try to invalidate the post if the user is on post details screen
      /* queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
      }); */
    },
  });
};

const useGetRecentPosts = () =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });

const useGetPostById = (postId: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });

const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      likesArray,
    }: {
      postId: string;
      likesArray: string[];
    }) => likePost(postId, likesArray),
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

const useSavePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      savePost(postId, userId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

const useDeleteSavedPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export {
  useCreatePost,
  useUpdatePost,
  useDeletePost,
  useGetRecentPosts,
  useGetPostById,
  useLikePost,
  useSavePost,
  useDeleteSavedPost,
};
