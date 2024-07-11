import { useMutation, useQuery } from '@tanstack/react-query';

import { INewUser } from '@/types';
import {
  createUserAccount,
  getCurrentUser,
  getUserById,
  getUsers,
  signInAccount,
  signOutAccount,
} from '../../appwrite/api/users';
import { QUERY_KEYS } from '../queryKeys';

export const useCreateUserAccount = () =>
  useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });

export const useSignInAccount = () =>
  useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });

export const useSignOutAccount = () =>
  useMutation({ mutationFn: signOutAccount });

export const useGetCurrentUser = () =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });

export const useGetUsers = (limit?: number) =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: () => getUsers(limit),
  });

export const useGetUserById = (userId: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
