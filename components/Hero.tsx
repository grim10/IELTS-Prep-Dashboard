
import React from 'react';
import ProductActionBox from './ProductActionBox';

interface HeroProps {
  onStartTest: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartTest }) => {
    
  const featurePills = [
      { text: '🗣️ 20hrs LIVE IELTS Training', tooltip: 'Join daily live classes with our expert trainers on your schedule.', className: "bg-slate-200 text-slate-800" },
      { text: '♾️ Unlimited Attempts', tooltip: 'Take mock tests and assignments as many times as you need to build confidence.', className: "bg-slate-200 text-slate-800" },
      { text: '🧠 200+ Assignments', tooltip: 'Cover all 4 IELTS sections with auto-evaluation to pinpoint your weak areas.', className: "bg-slate-200 text-slate-800" },
      { text: '🔥 ₹27,501 Instant Discount', tooltip: 'Pass the free test to instantly slash the price from ₹30,500 to ₹2,999.', className: "bg-amber-500 text-white shadow-md" },
      { text: '💸 100% Moneyback Offer', tooltip: 'Complete all 4 stages of the Cashback Challenge to get your entire fee back.', className: "bg-amber-100 text-amber-800" },
      { text: '🤝 1-1 Counselling', tooltip: 'Get personalized guidance for college applications and visa processes from our experts.', className: "bg-slate-200 text-slate-800" },
  ];

  const benefits = [
    {
        title: "Ace the Test",
        description: "Unlock a massive ₹9,000 discount by passing our free qualifying test."
    },
    {
        title: "Join the Challenge",
        description: "Finish key learning missions and get your entire course fee refunded."
    },
    {
        title: "Achieve Your Dream",
        description: "Get your target score and a full cashback—the smartest way to prep."
    }
  ];

  const CheckCircleIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
  );

  const handleLearnMoreClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const targetElement = document.getElementById('how-it-works');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative bg-gradient-to-br from-slate-50 to-emerald-50/20 overflow-hidden">
      {/* Decorative Shapes */}
      <div className="absolute top-0 -left-16 w-72 h-72 bg-emerald-100/50 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-float" />
      <div className="absolute -bottom-24 -right-16 w-72 h-72 bg-amber-100/50 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-float" style={{animationDelay: '3s'}} />
      
      <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-16 items-center">
          
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 text-left space-y-6">
  {/* Price Heading */}
  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
    <span className="block">IELTS Prep Bundle</span>
    <span className="text-2xl text-slate-500 line-through">₹30,500</span>
    <span className="text-emerald-600 ml-2">Now ₹2,999</span>
  </h1>

  {/* Sub Heading */}
  <div className="flex items-center gap-2">
      <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-600 to-slate-800">
        Your final price? ₹0 — Complete the Cashback Challenge.
      </h2>
      <div className="relative group">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="absolute bottom-full mb-2 w-72 p-4 bg-slate-900 text-slate-200 text-sm rounded-xl shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-10 pointer-events-none -translate-x-1/2 left-1/2">
            The Cashback Challenge is a set of learning missions that rewards you with a 100% refund. See the "Cashback Challenge" section below for full details.
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-slate-900"></div>
        </div>
      </div>
  </div>

  {/* Pills Section */}
  <div className="flex flex-wrap gap-3 mt-4">
    {featurePills.map((pill, index) => (
        <div
            key={index}
            className="relative group opacity-0"
            style={{ animation: `fadeInUp 0.5s ease-out ${0.1 * (index + 1)}s forwards` }}
        >
            <span className={`px-3 py-1 text-sm font-semibold rounded-full cursor-default ${pill.className}`}>
                {pill.text}
            </span>
            <div className="absolute bottom-full mb-2 w-64 p-4 bg-slate-900 text-slate-200 text-sm rounded-xl shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-10 pointer-events-none -translate-x-1/2 left-1/2">
                {pill.tooltip}
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-slate-900"></div>
            </div>
        </div>
    ))}
  </div>

  {/* Description Text & Benefits */}
    <div className="mt-8 pt-6 border-t border-slate-200">
        <p className="text-lg leading-relaxed text-slate-700 max-w-3xl mb-6">
            Stop paying for empty promises. At Shiksha, you only pay for results. Here's how:
        </p>

        <div className="space-y-5">
          {benefits.map(benefit => (
              <div key={benefit.title} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                      <CheckCircleIcon />
                  </div>
                  <div className="ml-4">
                      <h4 className="text-lg font-bold text-slate-800">{benefit.title}</h4>
                      <p className="text-slate-600">{benefit.description}</p>
                  </div>
              </div>
          ))}
        </div>
        
        <div className="mt-8 flex items-center gap-8">
          <p className="text-base leading-relaxed text-slate-700 max-w-3xl font-semibold">
              <strong>“Your IELTS Prep Could Be Free – Just Earn It.”</strong>
          </p>
           <a href="#how-it-works" onClick={handleLearnMoreClick} className="text-emerald-700 font-bold hover:text-emerald-900 transition-colors duration-300 flex items-center gap-2 flex-shrink-0">
            <span>Learn More</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L10 9.414l2.293 2.293a1 1 0 001.414-1.414l-3-3z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
    </div>

</div>


          {/* Right Column: Action Box */}
          <div className="lg:col-span-5 mt-12 lg:mt-0">
            <ProductActionBox onStartTest={onStartTest} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
