import React from 'react';

interface HeaderProps {
  onStartTest: () => void;
  navigateTo: (view: 'home' | 'plan') => void;
}

const Header: React.FC<HeaderProps> = ({ onStartTest, navigateTo }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <button
          onClick={() => navigateTo('plan')}
          className="text-2xl font-bold text-slate-800 no-underline appearance-none text-left p-0 border-0 bg-transparent cursor-pointer"
          aria-label="View Business Plan"
        >
          Shiksha: IELTS Prep Bundle
        </button>
        <div className="flex items-center gap-2 sm:gap-4">
            <a 
                href="tel:+919876543210" 
                className="hidden sm:flex items-center gap-2 text-slate-700 font-bold py-2 px-4 rounded-lg text-sm sm:text-base border-2 border-slate-300 hover:bg-slate-100 transition duration-300 whitespace-nowrap"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.03 11.03 0 004.256 4.256l.759-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C6.477 18 2 13.523 2 8V3z" />
                </svg>
                <span>Talk to Counsellor</span>
            </a>
            <button onClick={onStartTest} className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-bold py-2 px-4 sm:px-6 rounded-lg text-sm sm:text-base shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
            Start Free Test
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;