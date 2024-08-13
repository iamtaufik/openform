import { SignIn } from '@clerk/nextjs';
import React from 'react';

const SignInPage = ({ searchParams }: { searchParams: { redirectTo?: string } }) => {
  const url = searchParams.redirectTo || '/';

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-10">
      <SignIn fallbackRedirectUrl={url} />
    </main>
  );
};

export default SignInPage;
