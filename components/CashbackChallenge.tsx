import React from 'react';
import { cashbackStagesData } from '../constants';

const CashbackChallenge: React.FC<{ onStartTest: () => void; }> = ({ onStartTest }) => {
  return (
    <section id="cashback-challenge" className="py-20 lg:py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold">Then, Make It 100% Free.</h2>
          <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
            This is where the real fun begins. After you enroll, every milestone you hit on your study journey puts cash back in your pocket.
          </p>
        </div>
        
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-9 top-0 h-full w-0.5 bg-emerald-400/30" aria-hidden="true"></div>

          {cashbackStagesData.map((stage, index) => (
            <div key={stage.stage} className="relative pl-20 pb-12">
              <div className="absolute left-0 top-1 flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-full ring-8 ring-slate-800">
                 {stage.icon}
              </div>
              <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700/50">
                  <span className="text-emerald-400 font-bold text-sm uppercase">Stage {stage.stage}</span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-2">{stage.task}</h3>
                  <div className="flex flex-col sm:flex-row gap-4 text-center">
                    <div className="flex-1 bg-green-500/10 border border-green-500/30 text-green-300 py-2 px-3 rounded-md">
                        <span className="font-bold text-lg">{stage.reward}</span>
                    </div>
                    <div className="flex-1 bg-blue-500/10 border border-blue-500/30 text-blue-300 py-2 px-3 rounded-md">
                        <span className="font-semibold">{stage.unlocks}</span>
                    </div>
                  </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-amber-400">Your Investment: Your Effort.</h3>
            <p className="mt-2 text-slate-300">Complete the challenge and your IELTS prep is on us. It's the ultimate win-win.</p>
            <button onClick={onStartTest} className="mt-8 inline-block bg-white text-emerald-700 font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:bg-slate-100 transform hover:scale-105 transition-all duration-300">
                Start My Cashback Journey
            </button>
        </div>
      </div>
    </section>
  );
};

export default CashbackChallenge;