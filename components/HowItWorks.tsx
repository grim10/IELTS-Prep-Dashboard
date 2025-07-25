import React from 'react';
import { howItWorksSteps } from '../constants';

const HowItWorks: React.FC<{ onStartTest: () => void; }> = ({ onStartTest }) => {
  return (
    <section id="how-it-works" className="py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Your 3-Step Plan to a 90% Discount</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">It's simple, transparent, and puts you in control. Here's how you grab your massive discount.</p>
        </div>

        {/* The main grid container for the steps */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-x-8 lg:gap-x-16 relative">
          
          {/* Decorative connector line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px -translate-y-8 bg-gradient-to-r from-transparent via-slate-300 to-transparent">
             <div className="absolute top-1/2 left-1/4 h-3 w-3 -translate-y-1/2 rounded-full bg-slate-300"></div>
             <div className="absolute top-1/2 right-1/4 h-3 w-3 -translate-y-1/2 rounded-full bg-slate-300"></div>
          </div>

          {howItWorksSteps.map((step, index) => (
            <div 
              key={index} 
              className="relative flex flex-col items-center text-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/80 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group my-4 md:my-0 opacity-0"
              style={{ animation: `fadeInUp 0.5s ease-out ${0.2 * index}s forwards` }}
            >
              {/* Giant number in the background */}
              <div className="absolute top-0 right-0 text-[120px] lg:text-[150px] font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-50 to-slate-100 -z-10 -translate-y-1/4 translate-x-1/4">
                0{index + 1}
              </div>

              {/* Icon */}
              <div className="relative mb-6 p-1 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <div className="bg-white p-4 rounded-full">
                      {step.icon}
                  </div>
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold text-slate-900 mb-3 z-10">{step.title}</h3>
              <p className="text-slate-600 flex-grow z-10">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
            <p className="text-lg text-slate-600 mb-4">Simple, transparent, and designed for your success.</p>
            <button
                onClick={onStartTest}
                className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-xl hover:shadow-2xl hover:from-emerald-600 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 animate-pulse-subtle"
            >
                Ready for Step 1? Start Test
            </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
