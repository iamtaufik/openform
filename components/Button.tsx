import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'success';
  className?: string;
}

const buttonStyles = {
  primary: 'bg-[#A9C0FB] border-black text-black shadow-[3px_3px_0_#749BFE]',
  secondary: 'bg-[#C0C6D1] border-black text-black shadow-[3px_3px_0_#869CC1]',
  success: 'bg-[#8DEFC2] border-black text-black shadow-[3px_3px_0_#34E392]',
};

const Button: React.FC<ButtonProps> = ({ onClick, children, type = 'button', variant = 'primary', className = '', ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        children?.toString() === 'Next' ? 'ml-auto' : ''
      } transition-all ease-in-out duration-300 inline-flex items-center px-4 py-2 border-4 font-semibold rounded-lg hover:text-[#FFF8E4] hover:bg-[#1B202A] hover:border-[#1B202A] hover:scale-[0.9] border-black text-black ${
        buttonStyles[variant]
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
