import { z } from 'zod';
import {
  emailSchema,
  nameSchema,
  passwordSchema,
  usernameSchema,
} from './helpers';

const SignupValidation = z.object({
  name: nameSchema,
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

const SigninValidation = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: nameSchema,
  username: usernameSchema,
  email: emailSchema,
  bio: z.string(),
});

export { SignupValidation, SigninValidation, ProfileValidation };
