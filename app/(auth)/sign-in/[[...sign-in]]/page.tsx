'use client';
import Button from '@/components/Button';
import { SignIn, useSignIn, useSignUp } from '@clerk/nextjs';
import React from 'react';

const SignInPage = ({ searchParams }: { searchParams: { redirectTo?: string } }) => {
  const { signIn } = useSignIn();

  const handleSignInAsGuest = async () => {
    try {
      const response = await signIn?.create({
        strategy: 'password',
        identifier: process.env.NEXT_PUBLIC_GUEST_EMAIL!,
        password: process.env.NEXT_PUBLIC_GUEST_PASSWORD!,
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const url = searchParams.redirectTo || '/';

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-10 bg-[#1B202A]">
      <div className="flex flex-col space-y-10 items-center">
        {/* <Button onClick={handleSignInAsGuest} type="button" variant="secondary" className="w-max bg-[#FFE479] shadow-[3px_3px_0_#FACC15]">
          Sign in as Guest
        </Button> */}
        <SignIn fallbackRedirectUrl={url} />
      </div>
    </main>
  );
};

export default SignInPage;
