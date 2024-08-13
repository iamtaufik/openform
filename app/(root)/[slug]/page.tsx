import React from 'react';
import { notFound, redirect } from 'next/navigation';

import { currentUser } from '@clerk/nextjs/server';

import AnswerForm from './_answer-form';
import { getForm } from '@/actions/form.actions';
import { checkIsSubmitted } from '@/actions/answer.actions';

export const generateMetadata = async ({ params: { slug } }: SearchParamProps) => {
  const form = await getForm(slug);

  if (!form) return notFound();

  return {
    title: form.title,
    description: 'Generate from OpenForm',
  };
};

const Page = async ({ params: { slug } }: SearchParamProps) => {
  const form = await getForm(slug);
  const user = await currentUser();

  if (!form) notFound();

  const isSubmited = await checkIsSubmitted({ formId: form?.id });

  if (!user) redirect(`/sign-in?redirectTo=/${slug}`);

  if (isSubmited) redirect(`/${slug}/submited`);

  return <AnswerForm form={form} />;
};

export default Page;
