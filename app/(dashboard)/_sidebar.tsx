import { SignedIn, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const SideBar = () => {
  return (
    <div id="sidebar" className="h-screen w-16 menu bg-[#1B202A] text-white px-4 flex items-center  fixed shadow z-50 transition-all ease-in-out duration-300">
      <ul className="list-reset ">
        <li className="my-2 md:my-0">
          <Link href="/dashboard" className="flex items-center py-1 md:py-3 pl-1 align-middle text-[#FFF8E4] no-underline hover:text-[#fca311]">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </div>
            <span className="w-full inline-block pb-1 md:pb-0  pl-8 text-sm opacity-0 absolute transition-all ease-in-out duration-75">Home</span>
          </Link>
        </li>
        <li className="my-2 md:my-0">
          <Link href="/forms" className="flex items-center py-1 md:py-3 pl-1 align-middle text-[#FFF8E4] no-underline hover:text-[#fca311]">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>
            </div>
            <span className="w-full inline-block pb-1 md:pb-0  pl-8 text-sm opacity-0 absolute transition-all ease-in-out duration-75">Forms</span>
          </Link>
        </li>
        <li className="my-2 md:my-0 ">
          <div className="flex py-1 md:py-3 pl-1 align-middle text-[#FFF8E4] no-underline hover:text-[#fca311]">
            <div>
              <SignedIn>
                <UserButton  afterSwitchSessionUrl='/'/>
              </SignedIn>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
