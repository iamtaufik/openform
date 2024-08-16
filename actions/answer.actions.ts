'use server';
import { prisma } from '@/libs/prisma';
import { type CreateAnswerDTO, createAnswerDTO } from '@/validations/answer.validations';
import { type CreateFormDTO, createFormDTO } from '@/validations/form.validations';
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const getAnswers = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error('Unauthorized');
    }

    const answers = await prisma.answer.findMany({
      where: {
        question: {
          form: {
            publisher: user?.emailAddresses[0].emailAddress,
          },
        },
      },
    });

    return answers;
  } catch (error) {
    console.log(`Error getting answers: ${error}`);
  }
};

export const getMonthlyAnswers = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error('Unauthorized');
    }

    const answers: { id: string; createdAt: Date }[] = await prisma.answer.findMany({
      where: {
        question: {
          form: {
            publisher: user?.emailAddresses[0].emailAddress,
          },
        },
      },
      select: {
        id: true,
        createdAt: true,
      },
    });

    const monthlyAnswerCounts = answers.reduce<{ [key: string]: number }>((acc, answer) => {
      const monthYear = `${answer.createdAt.getUTCFullYear()}-${answer.createdAt.getUTCMonth() + 1}`;
      if (!acc[monthYear]) {
        acc[monthYear] = 0;
      }
      acc[monthYear]++;
      return acc;
    }, {});

    const formattedMonthlyAnswerCounts: MonthlyAnswerCount[] = Object.entries(monthlyAnswerCounts).map(([monthYear, count]) => {
      const [year, month] = monthYear.split('-').map(Number);
      return {
        month: new Date(Date.UTC(year, month - 1)),
        count,
      };
    });

    formattedMonthlyAnswerCounts.sort((a, b) => a.month.getTime() - b.month.getTime());

    return formattedMonthlyAnswerCounts;
  } catch (error) {
    console.log(`Error getting answers: ${error}`);
  }
};

const create = async ({ formId, answers }: CreateAnswerDTO) => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error('Unauthorized');
    }

    // const validate = await createFormDTO.parseAsync({ formId, answers });

    // if (!validate) {
    //   throw new Error('Validation error on create answer');
    // }

    const createAnswerPromises = Object.keys(answers).map(async (questionId) => {
      const answerValue = answers[questionId];

      // Jika jawaban berupa array (MULTIPLE_CHOICE)
      if (Array.isArray(answerValue)) {
        const options = await prisma.option.findMany({
          where: { id: { in: answerValue } },
        });
        const answerText = options.map((option: Option) => option.text).join(', ');

        return await prisma.answer.create({
          data: {
            formId,
            participant: user.emailAddresses[0].emailAddress,
            questionId,
            text: answerText,
          },
        });
      } else {
        // Jika jawaban berupa string (TEXT atau SINGLE_CHOICE)
        let answerText = answerValue as string;

        // Jika tipe pertanyaan adalah SINGLE_CHOICE, ambil teks dari opsi yang dipilih
        const question = await prisma.question.findUnique({
          where: { id: questionId },
          include: { options: true },
        });

        if (question?.type === 'SINGLE_CHOICE') {
          const option = question.options.find((opt: Option) => opt.id === answerValue);
          if (option) {
            answerText = option.text;
          }
        }

        return await prisma.answer.create({
          data: {
            formId,
            participant: user.emailAddresses[0].emailAddress,
            questionId,
            text: answerText,
          },
        });
      }
    });

    return await Promise.all(createAnswerPromises);
  } catch (error) {
    console.log(`Error creating answer: ${error}`);
    return false;
  }
};

export const createAnswer = async ({ formId, slug, answers }: { formId: string; slug: string; answers: { [questionId: string]: string | string[] } }) => {
  const result = await create({ formId, answers });

  if (result) {
    return redirect(`/${slug}/success`);
  } else {
    return redirect(`/${slug}/error`);
  }
};

export const checkIsSubmitted = async ({ formId }: { formId: string }) => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error('Unauthorized');
    }

    const answers = await prisma.answer.findFirst({
      where: {
        formId,
        AND: [
          {
            participant: user.emailAddresses[0].emailAddress,
          },
        ],
      },
    });

    return answers;
  } catch (error) {
    console.log(`Error checking is submitted: ${error}`);
  }
};

export const getAnswer = async ({ slug }: { slug: string }) => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error('Unauthorized');
    }

    const answers = await prisma.answer.findMany({
      where: {
        question: {
          form: {
            slug,
          },
        },
      },
      include: {
        question: true,
      },
    });

    return answers;
  } catch (error) {
    console.log(`Error getting answers: ${error}`);
  }
};

export const deleteAnswer = async (id: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error('Unauthorized');
    }

    await prisma.answer.delete({
      where: { id },
    });

    revalidatePath(`/forms/${id}`);
    revalidatePath(`/forms`);
  } catch (error) {
    console.log(`Error deleting answer: ${error}`);
  }
};
