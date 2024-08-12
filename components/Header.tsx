import React from 'react';

const Header = ({ title, navItems }: HeaderProps) => {
  return (
    <header className="w-full h-32 flex items-center">
      <nav className="space-y-6">
        <div>
          <h1 className="text-5xl font-normal text-[#14213d]">{title}</h1>
        </div>
        <div>
          <ul className="flex space-x-1 items-center">
            {navItems.map((item, index) => (
              <React.Fragment key={index}>
                <li className='text-[#14213d] text-lg'>{item}</li>
                {index < navItems.length - 1 && (
                  <li>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
