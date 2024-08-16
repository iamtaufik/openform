import React from 'react';

const Spin = () => {
  return (
    <svg className="animate-spin h-5 w-5 mr-2 text-black group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l-3.5 3.5a8.004 8.004 0 00-4.5 4.5L4 12z"></path>
    </svg>
  );
};

export default Spin;
