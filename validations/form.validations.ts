import { z } from 'zod';

export const createFormDTO = z.object({
  title: z.string().min(3),
  questions: z.array(
    z.object({
      text: z.string({ message: 'Question text is required' }).min(3, { message: 'Question text must be at least 3 characters long' }),
      type: z.enum(['TEXT', 'SINGLE_CHOICE', 'MULTIPLE_CHOICE'], { message: 'Question type is required' }),
      options: z.array(z.object({ text: z.string() })).optional(),
    })
  ),
});

export type CreateFormDTO = z.infer<typeof createFormDTO>;
