import React from 'react';

interface ValuePropositionProps {
  onStartTest: () => void;
}

const ValueProposition: React.FC<ValuePropositionProps> = ({ onStartTest }) => {
  return (
    <section id="value-prop" className="bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-20 lg:py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold">Ready to Stop Paying for Promises?</h2>
        <p className="mt-6 text-xl md:text-2xl max-w-4xl mx-auto text-slate-300">
         Your high score isn't a hope, it's a plan. Take the test, unlock the best deal in IELTS prep, and start your journey with a team that invests in your success.
        </p>
        <div className="mt-12">
          <button onClick={onStartTest} className="inline-block bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-bold py-4 px-10 rounded-lg text-lg shadow-2xl hover:shadow-emerald-500/40 hover:from-emerald-600 hover:to-emerald-800 transform hover:scale-105 transition-all duration-300">
            Start My Free Test
          </button>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;