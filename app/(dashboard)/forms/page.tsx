import { countTotalAnswers, getForms, deleteForm } from '@/actions/form.actions';
import Link from 'next/link';
import React from 'react';
import DeleteButton from '@/components/DeleteButton';
import ShareButton from './_share-button';

export const dynamic = 'force-dynamic';

const Page = async () => {
  const forms = await getForms();

  return (
    <div className="pt-4">
      <div className="my-4">
        <Link href="/forms/create" className="py-2 px-6 rounded-lg border-l-2 border-t-2 border-r-4 border-b-4 border-black bg-[#FFE479] text-gray-800 text-sm font-semibold">
          Create Form
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden bg-white border-l-2 border-t-2 border-r-4 border-b-4 border-black">
              {forms && (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                        Form
                      </th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                        Answers
                      </th>

                      <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {forms &&
                      forms.map((form) => (
                        <tr key={form.id} className="odd:bg-white even:bg-gray-100">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{form.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{countTotalAnswers(form.id)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex justify-end gap-4">
                            <ShareButton id={form.slug} />

                            <Link href={`/forms/${form.slug}`} className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg border-l-2 border-t-2 border-r-4 border-b-4 border-black ">
                              Detail
                            </Link>

                            <DeleteButton id={form.id} onDelete={deleteForm} />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
