import { deleteAnswer, getAnswer } from '@/actions/answer.actions';
import DeleteButton from '@/components/DeleteButton';
import { notFound } from 'next/navigation';
import React from 'react';

export const dynamic = 'force-dynamic';

const Page = async ({ params: { slug } }: SearchParamProps) => {
  const answers = await getAnswer({ slug });

  if (!answers) notFound();

  return (
    <div>
      <div className="flex flex-col py-10">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden bg-white border-l-2 border-t-2 border-r-4 border-b-4 border-black">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                      Participant
                    </th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                      Question
                    </th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                      Answer
                    </th>

                    <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {answers &&
                    answers.map((answer) => (
                      <tr key={answer.id} className="odd:bg-white even:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{answer.participant}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{answer.question.text}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{answer.question.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{answer.text}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                          <DeleteButton id={answer.id} onDelete={deleteAnswer} />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
