import { z } from 'zod';

export const createAnswerDTO = z.object({
  formId: z.string({ message: 'Form ID is required' }),
  answers: z.record(z.union([z.string(), z.array(z.string()).min(1, { message: 'Multipe chose must contain at least one item' })])).refine((answers) => Object.keys(answers).length > 0, {
    message: 'Answers must not be empty',
  }),
});
export type CreateAnswerDTO = z.infer<typeof createAnswerDTO>;

// { formId: string; answers: { [questionId: string]: string | string[] } }
