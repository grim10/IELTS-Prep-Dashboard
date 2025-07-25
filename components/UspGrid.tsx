import React from 'react';
import { uspData } from '../constants';

const UspGrid = () => {
  return (
    <section id="why-us" className="py-20 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">The Smarter Way to Prep</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">We're not just another course. We're a success partner that invests in you.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {uspData.map((usp, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-slate-200 text-center flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:border-emerald-200 hover:-translate-y-1">
                <div className="mb-6 bg-emerald-100 p-4 rounded-full">
                    {usp.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{usp.title}</h3>
                <p className="text-slate-600 flex-grow">{usp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UspGrid;