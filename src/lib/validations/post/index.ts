import { z } from 'zod';

export const PostValidation = z.object({
  caption: z
    .string()
    .min(5, { message: 'Caption must have at least 5 characters' })
    .max(2200),
  file: z.custom<File[]>(),
  location: z
    .string()
    .min(2, { message: 'Location must have at least 2 characters' })
    .max(1000),
  tags: z.string(),
});
