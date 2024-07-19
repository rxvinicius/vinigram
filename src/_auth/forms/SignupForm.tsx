import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { PROJECT_NAME } from '@/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '@/components/shared/Loader';
import { useToast } from '@/components/ui/use-toast';
import { SignupValidation } from '@/lib/validations/user';
import {
  useCreateUserAccount,
  useSignInAccount,
} from '@/lib/react-query/queries/userQueries';
import { useUserContext } from '@/context/AuthContext';

const SignupForm = () => {
  const { toast } = useToast();
  const { checkAuthUser } = useUserContext();
  const { mutateAsync: createNewUserAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount } = useSignInAccount();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  });

  const signUpFailed = (description: string = 'Sign up failed') => {
    setIsLoading(false);
    toast({
      title: 'Uh oh! Something went wrong',
      description: `${description}. Please try again later.`,
      variant: 'destructive',
      className: 'bg-red',
      duration: 2000,
    });
  };

  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    setIsLoading(true);
    const newUser = await createNewUserAccount(values);

    if (!newUser) {
      return signUpFailed();
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return signUpFailed('Sign in failed');
    }

    const isLoggedIn = await checkAuthUser();

    if (!isLoggedIn) {
      return signUpFailed();
    }

    form.reset();
    navigate('/');
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="form-title">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use {PROJECT_NAME}, please enter your account details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="shad-button_primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader />
              </div>
            ) : (
              'Sign up'
            )}
          </Button>

          <p className="text-light-2 text-center mt-2">
            Already have an account?&nbsp;
            <Link to="/sign-in" className="text-primary-500 font-semibold">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
