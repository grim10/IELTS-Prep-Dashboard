import React, { useState } from 'react';
import { faqData } from '../constants';
import type { FaqItem as FaqItemType } from '../types';

interface FaqItemProps {
    faq: FaqItemType;
    isOpen: boolean;
    onClick: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ faq, isOpen, onClick }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 overflow-hidden">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left p-5 text-lg font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none transition-colors group"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.question.replace(/\s/g, '-')}`}
            >
                <span className="flex-1 pr-4">{faq.question}</span>
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-slate-100 group-hover:bg-slate-200 rounded-full transition-colors">
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    )}
                </span>
            </button>
            <div
                id={`faq-answer-${faq.question.replace(/\s/g, '-')}`}
                className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <p className="pt-0 pb-5 px-6 text-slate-600 leading-relaxed">
                        {faq.answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

const Faq: React.FC<{ onStartTest: () => void; }> = ({ onStartTest }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 bg-slate-50">
            <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900">No Fine Print. Just Answers.</h2>
                <p className="text-center text-lg text-slate-600 mb-12">We believe in being 100% transparent. Here are the answers to your top questions.</p>
                
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <FaqItem
                            key={index}
                            faq={faq}
                            isOpen={openIndex === index}
                            onClick={() => handleClick(index)}
                        />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-bold text-slate-800">Ready to Begin Your Journey?</h3>
                    <p className="text-lg text-slate-600 mt-2 mb-8">Take the free test to unlock your discount and start learning with the best.</p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <button onClick={onStartTest} className="w-full sm:w-auto bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105">
                            Start Free Test
                        </button>
                        <a href="tel:+919876543210" className="w-full sm:w-auto text-slate-700 font-bold py-3 px-8 rounded-lg hover:bg-slate-200 transition duration-300 border-2 border-slate-300">
                            Talk to a Counsellor
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faq;