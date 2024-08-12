// import { Form, Question } from '@prisma/client';

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare interface HeaderProps {
  title: string;
  navItems: string[];
}

declare interface CardProps {
  title: string;
  value?: string;
  icon?: React.ReactNode;
  animateName?: string;
  animateDelay?: number;
}

declare interface MonthlyAnswerCount {
  month: Date;
  count: number;
}

declare type Option = {
  id: string;
  text: string;
  questionId: string;
  createdAt: Date;
  updatedAt: Date;
};

// declare type CreateFormDTO = {
//   title: string;
//   questions: {
//     text: string;
//     type: 'TEXT' | 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';
//     options?: {
//       text: string;
//     }[];
//   }[];
// };
