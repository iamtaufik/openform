import React from 'react';
import SideBar from './_sidebar';
import { Fredoka } from 'next/font/google';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const fredoka = Fredoka({ subsets: ['latin'], weight: '400' });

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  if (!user) {
    return redirect('/sign-in');
  }

  return (
    <main className={`${fredoka.className} flex min-h-screen bg-[#FBF4EF] font-sans flex-row`}>
      <SideBar />
      <div id="dash-content" className="w-full flex-1 pl-20 pr-4 lg:pl-28 lg:pr-10">
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
