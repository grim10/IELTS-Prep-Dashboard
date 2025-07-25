import React from 'react';
import { testimonialsData } from '../constants';

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-20 bg-slate-100">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900">Don't Take Our Word For It.</h2>
                <p className="text-center text-lg text-slate-600 mb-12 max-w-2xl mx-auto">Real stories from students who aced the test, finished the challenge, and are now on their way abroad.</p>
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {testimonialsData.map((testimonial, index) => (
                        <div key={index} className="bg-white border border-slate-200 p-8 rounded-xl flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                            <div className="flex items-center mb-4">
                                {testimonial.image && (
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm mr-4 flex-shrink-0">
                                        <img src={testimonial.image} alt={`Portrait of ${testimonial.name}`} className="w-full h-full object-cover filter grayscale"/>
                                    </div>
                                )}
                                <div className='flex-1'>
                                    <div className="flex flex-col sm:flex-row justify-between items-baseline">
                                        <h3 className="font-bold text-slate-900 text-lg">{testimonial.name}</h3>
                                        <p className="text-sm text-emerald-600 font-semibold bg-emerald-100 px-3 py-1 rounded-full">{testimonial.achievement}</p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-700 text-md mb-6 flex-grow">"{testimonial.quote}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;