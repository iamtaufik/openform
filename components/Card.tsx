'use client';
import { useEffect } from 'react';
import AOS from 'aos';

const Card = ({ title, icon, value, animateDelay, animateName }: CardProps) => {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: false,
    });
  }, []);
  return (
    <figure data-aos={animateName} data-aos-delay={animateDelay?.toString()} className="flex w-full max-w-sm lg:max-w-md justify-between p-4 lg:p-8  bg-white rounded-lg border-l-2 border-t-2 border-r-4 border-b-4 border-black">
      <figcaption className="flex space-y-2 flex-col bg-white justify-center">
        <h2 className="text-3xl text-[#14213d] font-semibold">{title}</h2>
        <p className="text-5xl text-[#14213d] font-normal">{value}</p>
      </figcaption>
      <div className="w-[150px] h-[150px] text-[#fca311]">{icon}</div>
    </figure>
  );
};

export default Card;
