import { z } from 'zod';

const nameSchema = z
  .string()
  .min(2, { message: 'Name must have at least 2 characters' })
  .max(50, { message: 'Name must have a maximum of 50 characters' });

const usernameSchema = z
  .string()
  .min(2, { message: 'Username must be at least 2 characters' })
  .max(50, { message: 'Username must have a maximum of 50 characters' });

const emailSchema = z.string().email().max(50);

const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters' })
  .max(50, { message: 'Password must have a maximum of 50 characters' });

export { nameSchema, usernameSchema, emailSchema, passwordSchema };
