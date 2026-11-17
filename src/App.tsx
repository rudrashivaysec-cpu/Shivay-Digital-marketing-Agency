import { useCallback, useEffect, useState } from 'react';
import { AboutAndProof } from './components/AboutAndProof';
import { CapabilitiesBento } from './components/CapabilitiesBento';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { ContactSection } from './components/ContactSection';
import { DetailSheetModal } from './components/DetailSheetModal';
import { Footer } from './components/Footer';
import { GrowthEstimator } from './components/GrowthEstimator';
import { HeroSection } from './components/HeroSection';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Navbar } from './components/Navbar';
import { PricingSection } from './components/PricingSection';
import type { CaseStudy, CurrencyCode, ServiceItem } from './data/agencyData';

const SECTION_IDS = ['home', 'services', 'work', 'estimator', 'pricing', 'about', 'contact'];

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [currency, setCurrency] = useState<CurrencyCode>('INR');
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);
  const [selectedCaseModal, setSelectedCaseModal] = useState<CaseStudy | null>(null);

  // Pre-filled quote context passed down to ContactSection
  const [preselectedService, setPreselectedService] = useState<string>('Performance Paid Ads');
  const [preselectedPlan, setPreselectedPlan] = useState<string>('Growth Accelerator');
  const [preselectedNote, setPreselectedNote] = useState<string>('');

  const scrollToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (!el) return;
    const headerOffset = window.innerWidth < 768 ? 56 : 76;
    const elementTop = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: Math.max(0, elementTop - headerOffset),
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.35],
      }
    );

    SECTION_IDS.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  const handleApplyEstimate = (payload: {
    budgetLabel: string;
    recommendedPlan: string;
    goalLabel: string;
  }) => {
    setPreselectedPlan(payload.recommendedPlan);
    setPreselectedService('Performance Paid Ads');
    setPreselectedNote(
      `Estimated monthly ad budget: ${payload.budgetLabel} · Primary goal: ${payload.goalLabel}.`
    );
    scrollToSection('contact');
  };

  const handleSelectPlan = (planName: string) => {
    setPreselectedPlan(planName);
    setPreselectedNote(`Interested in the ${planName} retainer.`);
    scrollToSection('contact');
  };

  const handleRequestServiceQuote = (serviceTitle: string) => {
    setSelectedServiceModal(null);
    setPreselectedService(serviceTitle);
    setPreselectedNote(`Requesting scope & quote for ${serviceTitle}.`);
    scrollToSection('contact');
  };

  const handleRequestSimilarProject = (clientName: string) => {
    setSelectedCaseModal(null);
    setPreselectedNote(`Looking for results similar to the ${clientName} case study.`);
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-[#F4F4F5]">
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

      <main>
        <HeroSection
          onBookCall={() => scrollToSection('contact')}
          onExploreWork={() => scrollToSection('work')}
        />

        <CapabilitiesBento
          currency={currency}
          onSelectService={(service) => setSelectedServiceModal(service)}
        />

        <CaseStudiesSection onSelectCaseStudy={(study) => setSelectedCaseModal(study)} />

        <GrowthEstimator currency={currency} onApplyEstimate={handleApplyEstimate} />

        <PricingSection
          currency={currency}
          onCurrencyChange={setCurrency}
          selectedPlan={preselectedPlan}
          onSelectPlan={handleSelectPlan}
        />

        <AboutAndProof />

        <ContactSection
          preselectedService={preselectedService}
          preselectedPlan={preselectedPlan}
          preselectedNote={preselectedNote}
        />
      </main>

      <Footer onNavigate={scrollToSection} />

      <MobileBottomNav activeSection={activeSection} onNavigate={scrollToSection} />

      <DetailSheetModal
        service={selectedServiceModal}
        caseStudy={selectedCaseModal}
        currency={currency}
        onClose={() => {
          setSelectedServiceModal(null);
          setSelectedCaseModal(null);
        }}
        onRequestServiceQuote={handleRequestServiceQuote}
        onRequestSimilarProject={handleRequestSimilarProject}
      />
    </div>
  );
}
