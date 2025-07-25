
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import CourseBundle from './components/CourseBundle';
import CashbackChallenge from './components/CashbackChallenge';
import ComparisonTable from './components/ComparisonTable';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import ValueProposition from './components/ValueProposition';
import Footer from './components/Footer';
import TestModal from './components/TestModal';
import BusinessPlan from './components/BusinessPlan';
import Trainers from './components/Trainers';
import Curriculum from './components/Curriculum';
import BundleValue from './components/BundleValue';

type View = 'home' | 'plan';

function App() {
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [view, setView] = useState<View>('home');

  const handleStartTest = () => {
    setIsTestModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsTestModalOpen(false);
  };
  
  const navigateTo = (newView: View) => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-white text-gray-800 font-sans antialiased">
      <Header onStartTest={handleStartTest} navigateTo={navigateTo} />
      {view === 'home' ? (
        <>
          <main>
            <Hero onStartTest={handleStartTest} />
            <BundleValue />
            <HowItWorks onStartTest={handleStartTest} />
            <CourseBundle onStartTest={handleStartTest} />
            <Curriculum />
            <CashbackChallenge onStartTest={handleStartTest} />
            <Trainers />
            <ComparisonTable onStartTest={handleStartTest} />
            <Testimonials />
            <Faq onStartTest={handleStartTest} />
            <ValueProposition onStartTest={handleStartTest} />
          </main>
          <Footer />
        </>
      ) : (
        <BusinessPlan navigateTo={navigateTo} />
      )}
      {/* TestModal is available on both views but only shown when state is true */}
      <TestModal isOpen={isTestModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default App;