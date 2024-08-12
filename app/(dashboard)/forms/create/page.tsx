import Header from '@/components/Header';
import React from 'react';
import CreateForm from './_create-form';

export const dynamic = 'force-dynamic';

const Page = () => {
  return (
    <div className="flex flex-col flex-1 bg-[#FBF4EF]  flex-wrap min-h-screen pb-10">
      {/* <Header title="Forms" navItems={['Dashboard', 'Forms']} />
      <div className="w-full h-[76vh] space-y-12">
        <div className="bg-white h-full w-full">a</div>
      </div> */}
      <CreateForm />
    </div>
  );
};

export default Page;
