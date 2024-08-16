'use server';
import { prisma } from '@/libs/prisma';
import { currentUser } from '@clerk/nextjs/server';

export const getQuestions = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error('Unauthorized');
    }

    const questions = await prisma.question.findMany({
      where: {
        form: {
          publisher: user.emailAddresses[0].emailAddress,
        },
      },
    });

    return questions;
  } catch (error) {
    console.log(`Error getting questions: ${error}`);
  }
};
