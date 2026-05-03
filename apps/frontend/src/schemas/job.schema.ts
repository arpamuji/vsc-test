import { z } from 'zod';

export const createJobFormSchema = z.object({
  caseName: z
    .string()
    .min(1, 'Case name is required.')
    .max(500, 'Case name must be 500 characters or fewer.'),
  type: z
    .string()
    .min(1, 'Please select a type.')
    .transform((val) => val.toUpperCase())
    .pipe(z.enum(['PHYSICAL', 'REMOTE'])),
  duration: z
    .string()
    .min(1, 'Duration is required.')
    .refine((val) => {
      const n = parseInt(val, 10);
      return Number.isInteger(n) && n > 0;
    }, 'Duration must be a positive whole number.'),
  city: z.string().min(1, 'City is required.').max(100, 'City must be 100 characters or fewer.'),
  country: z
    .string()
    .min(1, 'Country is required.')
    .max(100, 'Country must be 100 characters or fewer.'),
});

export type CreateJobFormValues = z.input<typeof createJobFormSchema>;
