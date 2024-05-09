import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

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
import { SigninValidation } from '@/lib/validation';
import { useSignInAccount } from '@/lib/react-query/queriesAndMutarions';
import { useUserContext } from '@/context/AuthContext';

const SigninForm = () => {
  const { toast } = useToast();
  const { checkAuthUser } = useUserContext();
  const { mutateAsync: signInAccount } = useSignInAccount();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signInFailed = () => {
    setIsLoading(false);
    toast({
      title: 'Uh oh! Something went wrong',
      description: 'Sign in failed. Please try again later.',
      variant: 'destructive',
      className: 'bg-red',
      duration: 2000,
    });
  };

  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    setIsLoading(true);
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return signInFailed();
    }

    const isLoggedIn = await checkAuthUser();

    if (!isLoggedIn) {
      return signInFailed();
    }

    form.reset();
    navigate('/');
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5">Log in to your account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! Please enter your account details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
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
              'Sign in'
            )}
          </Button>

          <p className="text-light-2 text-center mt-2">
            Don't have an account?&nbsp;
            <Link to="/sign-up" className="text-primary-500 font-semibold">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
