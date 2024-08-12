'use client';

import React, { useState } from 'react';

const ShareButton = ({ id }: { id: string }) => {
  const [isTooltipVisible, setTooltipVisibility] = useState(false);
  const [buttonText, setButtonText] = useState('Share');

  const handleClick = () => {
    setButtonText('Copied!');
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/${id}`);
    setTimeout(() => setButtonText('Share'), 2000); // Reset after 2 seconds
  };

  return (
    <div className="relative w-max">
      <button
        className="bg-blue-500 text-white px-4 py-2 text-sm font-semibold rounded-lg border-l-2 border-t-2 border-r-4 border-b-4 border-black "
        onMouseEnter={() => setTooltipVisibility(true)}
        onMouseLeave={() => setTooltipVisibility(false)}
        onClick={handleClick}
      >
        {buttonText}
      </button>
      {isTooltipVisible && <div className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-gray-800 rounded-lg shadow-lg">Click to share this content!</div>}
    </div>
  );
};

export default ShareButton;
