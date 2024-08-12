import React from 'react';
import SideBar from './_sidebar';
import { Fredoka } from 'next/font/google';

const fredoka = Fredoka({ subsets: ['latin'], weight: '400' });

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
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
