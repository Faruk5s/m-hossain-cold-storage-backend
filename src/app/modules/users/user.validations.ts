import { z } from 'zod';

const createUserValidation =z.object({
  body:z.object({
  name: z
    .string({ invalid_type_error: 'Name must be a string' })
    .min(1, { message: 'Name is required' }),
  email: z
    .string({ invalid_type_error: 'Email must be a string',required_error:'Email is required' }),
  password: z
    .string({ invalid_type_error: 'password must be a string' })
    .min(6, { message: 'password length must be minimum 6' }),
  role: z
    .enum(['admin','viewer'])
})
}) 

const updateUserValidation = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  role: z.string().optional(),
});

export const userValidation = {
   createUserValidation,
   updateUserValidation,
};
