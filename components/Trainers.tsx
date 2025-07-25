import React from 'react';

// Icon for displaying certifications and key stats
const CheckBadgeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const trainers = [
    {
        name: "Prerna Kalra",
        image: "https://images.unsplash.com/photo-1580894742597-879e39098278?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=340&q=80",
        title: "IELTS & PTE Specialist",
        bio: "A skilled and certified IELTS Trainer with over 6 years of experience. Certified by the British Council, she excels at helping students achieve top scores in tests like IELTS, PTE, and Duolingo. Prerna also develops custom curricula, tailoring her teaching to each student's unique learning style.",
        tags: ["6+ Years Experience", "British Council Certified", "Curriculum Developer"],
        linkedin: "https://www.linkedin.com/in/prerna-kalra-ielts"
    },
    {
        name: "Taru Thakur",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=340&q=80",
        title: "Cambridge & IDP Certified Trainer",
        bio: "Holding a CELTA from Cambridge and an MA in Linguistics, Taru has 5 years of experience training over 1,000 students in IELTS, Spoken English, DET, and TOEFL. She focuses on personalized, results-driven teaching with targeted feedback to build student confidence and proficiency.",
        tags: ["1000+ Students Trained", "Cambridge CELTA", "MA in Linguistics"],
        linkedin: "https://www.linkedin.com/in/taru-thakur-linguistics"
    },
    {
        name: "Pallavi Rani",
        image: "https://images.unsplash.com/photo-1573497491208-601c52494a65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=340&q=80",
        title: "Senior Master Trainer",
        bio: "With nearly two decades of teaching experience since 2004, Pallavi is a master English trainer for exams like IELTS, TOEFL & PTE. Holding a Master's degree in English and certifications from both the British Council and Pearson, she has helped over 5,000 students fulfill their dreams of getting into their desired universities, averaging 7-7.5 Bands.",
        tags: ["20 Years Experience", "5000+ Students Guided", "British Council & Pearson Certified"],
        linkedin: "https://www.linkedin.com/in/pallavi-rani-trainer"
    }
];

const TrainerCard: React.FC<{ trainer: typeof trainers[0] }> = ({ trainer }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-slate-200 hover:border-emerald-300 flex flex-col">
        <div className="relative overflow-hidden">
            <img className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-110" src={trainer.image} alt={`Portrait of ${trainer.name}`} />
        </div>
        <div className="p-6 flex-grow flex flex-col">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="text-2xl font-bold text-slate-900">{trainer.name}</h3>
                    <p className="text-emerald-600 font-semibold">{trainer.title}</p>
                </div>
                 <a
                    href={trainer.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-[#0077B5] transition-colors duration-200 flex-shrink-0 ml-4"
                    aria-label={`${trainer.name}'s LinkedIn Profile`}
                    title="View LinkedIn Profile"
                >
                    <LinkedInIcon />
                </a>
            </div>
            <p className="text-slate-600 text-sm mb-5 flex-grow">{trainer.bio}</p>
            <div className="mt-auto pt-4 border-t border-slate-200 space-y-2.5">
                {trainer.tags.map(tag => (
                    <div key={tag} className="flex items-center text-sm font-medium text-slate-700">
                       <CheckBadgeIcon />
                        <span>{tag}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const Trainers = () => {
    return (
        <section id="trainers" className="py-20 lg:py-24 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                       Meet Your Expert Trainers
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
                        Learn from the best. Our trainers are certified experts with years of experience dedicated to your success.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
                    {trainers.map((trainer, index) => (
                         <div
                            key={index}
                            className="opacity-0"
                            style={{ animation: `fadeInUp 0.5s ease-out ${0.2 * index}s forwards` }}
                        >
                            <TrainerCard trainer={trainer} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Trainers;