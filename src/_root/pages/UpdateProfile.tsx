import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUserContext } from '@/context/AuthContext';
import {
  useGetUserById,
  useUpdateUser,
} from '@/lib/react-query/queries/userQueries';
import { ProfileValidation } from '@/lib/validations/user';
import { Loader, ProfileUploader } from '@/components/shared';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const UpdateProfile = () => {
  const { id } = useParams();
  const validId = typeof id === 'string' ? id : '';
  const { data: currentUser } = useGetUserById(validId);
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mutateAsync: updateUser } = useUpdateUser();
  const [isLoading, setIsLoading] = useState(false);
  const formDefaultValues = {
    file: [],
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio || '',
  };
  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: formDefaultValues,
  });

  async function onSubmit(value: z.infer<typeof ProfileValidation>) {
    if (!currentUser) return;
    setIsLoading(true);

    const updatedUser = await updateUser({
      userId: currentUser.$id,
      name: value.name.trim(),
      bio: value.bio && value.bio.trim(),
      file: value.file,
      imageUrl: currentUser.imageUrl,
      imageId: currentUser.imageId,
    });

    if (!updatedUser) {
      setIsLoading(false);
      return toast({
        title: 'Uh oh! Something went wrong',
        description: `Update user failed. Please try again later.`,
        variant: 'destructive',
        className: 'bg-red',
        duration: 2500,
      });
    }

    toast({
      title: 'Updated user successfully!',
      variant: 'destructive',
      className: 'bg-green',
      duration: 2500,
    });
    setUser({
      ...user,
      name: updatedUser?.name,
      bio: updatedUser?.bio,
      imageUrl: updatedUser?.imageUrl,
    });

    return navigate(`/profile/${id}`);
  }

  useEffect(() => {
    if (user && !isLoading) {
      form.reset(formDefaultValues);
    }
  }, [user]);

  if (!currentUser || !user || !form.getValues('name')) {
    return <Loader />;
  }

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-3 justify-start w-full max-w-5xl">
          <img
            src="/assets/icons/edit.svg"
            width={32}
            height={32}
            alt="Edit profile"
            className="invert-white"
          />
          <h2 className="page-title">Edit Profile</h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-7 w-full mt-4 max-w-5xl"
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <ProfileUploader
                      fieldChange={field.onChange}
                      mediaUrl={currentUser.imageUrl}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Name</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="shad-input"
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="shad-input"
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      className="shad-textarea custom-scrollbar"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <div className="flex gap-4 items-center justify-end">
              <Button
                type="button"
                className="shad-button_dark_4"
                onClick={() => navigate(-1)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="shad-button_primary min-w-20 min-h-12 whitespace-nowrap"
                disabled={isLoading}
              >
                {isLoading && <Loader />}
                Update Profile
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfile;
