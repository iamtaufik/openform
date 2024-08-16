'use client';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const Navbar = ({ isLogged }: { isLogged: Boolean }) => {
  const [toggle, setToggle] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  const handleNavbar = () => {
    setToggle(!toggle);
  };

  const listener = (e: MouseEvent) => {
    if (navbarRef.current && !navbarRef.current.contains(e.target as Node)) {
      setToggle(false);
    }
  };

  useEffect(() => {
    if (window.document) {
      window.document.addEventListener('click', listener);
    }

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [listener, handleNavbar]);

  return (
    <header className="flex justify-between  h-10 py-10 items-center   relative">
      <nav className="flex justify-between w-full items-center">
        <span className="text-3xl font-semibold">
          open<span className="text-[#FFE479]">Form</span>
        </span>
        <ul className=" gap-10 hidden lg:flex">
          <li>
            <a href="#whyUs">Why us?</a>
          </li>
          <li>
            <a href="#testimonial">Testimonial</a>
          </li>
        </ul>
        <div className="block max-h-10 lg:hidden">
          {toggle ? (
            <button type="button" onClick={handleNavbar}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <button type="button" onClick={handleNavbar}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          )}
        </div>

        <div className="space-x-6 hidden lg:block">
          {isLogged ? (
            <Link
              href="/dashboard"
              className="ml-auto border-4 border-black inline-flex items-center scale-100 px-4 py-2 text-base font-semibold rounded-lg text-black bg-[#FFE479] shadow-[3px_3px_0_#FACC15]  transition-all ease-in-out duration-300 hover:scale-[0.9] hover:text-[#FFF8E4] hover:bg-[#1B202A] hover:border-[#1B202A]"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="ml-auto border-4 border-black inline-flex items-center scale-100 px-4 py-2 text-base font-semibold rounded-lg text-black bg-[#A9C0FB] shadow-[3px_3px_0_#FACC15]  transition-all ease-in-out duration-300 hover:scale-[0.9] hover:text-[#FFF8E4] hover:bg-[#1B202A] hover:border-[#1B202A]"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="ml-auto border-4 border-black inline-flex items-center scale-100 px-4 py-2 text-base font-semibold rounded-lg text-black bg-[#FFE479] shadow-[3px_3px_0_#FACC15]  transition-all ease-in-out duration-300 hover:scale-[0.9] hover:text-[#FFF8E4] hover:bg-[#1B202A] hover:border-[#1B202A]"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
      {
        <div ref={navbarRef} className={toggle ? 'block absolute top-20 space-y-2 px-4 pb-4 w-full bg-[#1B202A] border-r-8 border-b-4 border-[#FFF8E4]' : 'hidden'}>
          <ul className="flex flex-col gap-4">
            <li>
              <a href="#whyUs">Why us?</a>
            </li>
            <li>
              <a href="#testimonial">Testimonial</a>
            </li>
          </ul>
          <div className=" flex flex-col items-start space-y-2 justify-start">
            {isLogged ? (
              <Link
                href="/dashboard"
                className="w-full border-4 border-black inline-flex items-center scale-100 px-4 py-2 text-base font-semibold rounded-lg text-black bg-[#FFE479] shadow-[3px_3px_0_#FACC15]  transition-all ease-in-out duration-300 hover:scale-[0.9] hover:text-[#FFF8E4] hover:bg-[#1B202A] hover:border-[#1B202A]"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="w-full border-4 border-black inline-flex items-center scale-100 px-4 py-2 text-base font-semibold rounded-lg text-black bg-[#A9C0FB] shadow-[3px_3px_0_#FACC15]  transition-all ease-in-out duration-300 hover:scale-[0.9] hover:text-[#FFF8E4] hover:bg-[#1B202A] hover:border-[#1B202A]"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="w-full border-4 border-black inline-flex items-center scale-100 px-4 py-2 text-base font-semibold rounded-lg text-black bg-[#FFE479] shadow-[3px_3px_0_#FACC15]  transition-all ease-in-out duration-300 hover:scale-[0.9] hover:text-[#FFF8E4] hover:bg-[#1B202A] hover:border-[#1B202A]"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      }
    </header>
  );
};

export default Navbar;
