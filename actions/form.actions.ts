'use server';
import { prisma } from '@/libs/prisma';
import { generateUniqueString } from '@/libs/utils';
import { type CreateFormDTO, createFormDTO } from '@/validations/form.validations';
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { ZodError } from 'zod';

export const getForms = async () => {
  try {
    const user = await currentUser();

    const forms = await prisma.form.findMany({
      where: {
        publisher: user?.emailAddresses[0].emailAddress,
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });

    return forms;
  } catch (error) {
    console.log(`Error getting forms: ${error}`);
  }
};

export const getForm = async (slug: string) => {
  try {
    const form = await prisma.form.findUnique({
      where: { slug },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    return form;
  } catch (error) {
    console.log(`Error getting form: ${error}`);
  }
};

export const getTopFormAnswers = async () => {
  try {
    const user = await currentUser();

    const topForms = await prisma.form.findMany({
      where: {
        publisher: user?.emailAddresses[0].emailAddress,
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });

    const formWithAnswerCount = topForms.map((form) => ({
      ...form,
      answerCount: form.questions.reduce((acc, question) => acc + question.answers.length, 0),
    }));

    formWithAnswerCount.sort((a, b) => b.answerCount - a.answerCount);

    return formWithAnswerCount.slice(0, 3);
  } catch (error) {
    console.log(`Error getting top form answers: ${error}`);
  }
};

export const createForm = async (formDto: CreateFormDTO) => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error('User not found');
    }

    const validate = await createFormDTO.parseAsync(formDto);

    if (!validate) {
      throw new Error('Validation error on create form');
    }

    // const result = await prisma.$transaction(async (prisma) => {
    //   const createdForm = await prisma.form.create({
    //     data: {
    //       title: formDto.title,
    //       slug: formDto.title.toLowerCase().replace(/ /g, '-') + '-' + generateUniqueString(5),
    //       publisher: user?.emailAddresses[0].emailAddress,
    //     },
    //   });

    //   for (const question of formDto.questions) {
    //     const createdQuestion = await prisma.question.create({
    //       data: {
    //         text: question.text,
    //         type: question.type,
    //         formId: createdForm.id,
    //       },
    //     });

    //     if (question.options && question.options.length > 0) {
    //       for (const option of question.options) {
    //         await prisma.option.create({
    //           data: {
    //             text: option.text,
    //             questionId: createdQuestion.id,
    //           },
    //         });
    //       }
    //     }
    //   }

    //   return createdForm;
    // });

    const result = await prisma.$transaction(async (prisma) => {
      // Create the form
      const createdForm = await prisma.form.create({
        data: {
          title: formDto.title,
          slug: formDto.title.toLowerCase().replace(/ /g, '-') + '-' + generateUniqueString(5),
          publisher: user?.emailAddresses[0].emailAddress,
        },
      });

      // First, create all questions
      const createdQuestions = await Promise.all(
        formDto.questions.map((question) =>
          prisma.question.create({
            data: {
              text: question.text,
              type: question.type,
              formId: createdForm.id,
            },
          })
        )
      );

      // Then, create options for each question
      const optionPromises = formDto.questions.flatMap(
        (question, index) =>
          question.options?.map((option) =>
            prisma.option.create({
              data: {
                text: option.text,
                questionId: createdQuestions[index].id,
              },
            })
          ) || []
      );

      await Promise.all(optionPromises);

      return createdForm;
    });

    revalidatePath('/forms');
    revalidatePath('/dashboard');

    return result;
  } catch (error) {
    console.log(`Error creating form: ${error}`);
  }
};

export const countTotalAnswers = async (formId: string) => {
  try {
    const uniqueAnswers = await prisma.answer.groupBy({
      by: ['participant', 'questionId'],
      where: {
        formId: formId,
      },
      _count: {
        _all: true,
      },
    });

    const totalUniqueParticipants = new Set(uniqueAnswers.map((answer) => answer.participant)).size;

    return totalUniqueParticipants;
    // const totalAnswers = form.questions.reduce((acc, question) => acc + question.answers.length, 0);

    // return form._count.participant;
  } catch (error) {
    console.log(`Error counting total answers: ${error}`);
  }
};

export const deleteForm = async (id: string) => {
  try {
    await prisma.form.delete({
      where: { id },
    });

    revalidatePath('/forms');
  } catch (error) {
    console.log(`Error deleting form: ${error}`);
  }
};
