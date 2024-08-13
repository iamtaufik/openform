'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

const Page = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  return (
    <main className="min-h-screen bg-[#1B202A] text-white flex justify-center items-center px-10 lg:px-32">
      <div className="space-y-10 flex justify-center flex-col items-center">
        <Image src={'./clumsy.svg'} alt="Ice cream" width={400} height={400} />
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-semibold text-center">Oops! Something went wrong. Please try again or contact support if the issue persists.</h1>
          <Link
            href="/"
            className="mt-4 border-4 border-black inline-flex items-center scale-100 px-4 py-2 text-base font-semibold rounded-lg text-black bg-[#FFE479] shadow-[3px_3px_0_#FACC15]  transition-all ease-in-out duration-300 hover:scale-[0.9] hover:text-[#FFF8E4] hover:bg-[#1B202A] hover:border-[#1B202A]"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Page;
