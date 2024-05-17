import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Models } from 'appwrite';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PostValidation } from '@/lib/validation';
import { useCreatePost } from '@/lib/react-query/queries/postQueries';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';
import { FileUploader, Loader } from '../shared';
import { useUserContext } from '@/context/AuthContext';

type PostFormProps = {
  post?: Models.Document;
};

const PostForm = ({ post }: PostFormProps) => {
  const { user } = useUserContext();
  const { mutateAsync: createPost } = useCreatePost();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post.caption : '',
      file: [],
      location: post ? post.location : '',
      tags: post ? post.tags.join(',') : '',
    },
  });

  const error = () => {
    setIsLoading(false);
    toast({
      title: 'Uh oh! Something went wrong',
      description: 'Create post failed. Please try again later.',
      variant: 'destructive',
      className: 'bg-red',
      duration: 2000,
    });
  };

  async function onSubmit(values: z.infer<typeof PostValidation>) {
    setIsLoading(true);

    const newPost = await createPost({ ...values, userId: user.id });

    if (!newPost) {
      return error();
    }

    navigate('/');
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
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

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  placeholder="Art, Programming, Workout"
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
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary min-w-20 min-h-12 whitespace-nowrap"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader />
              </div>
            ) : (
              'Submit'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
