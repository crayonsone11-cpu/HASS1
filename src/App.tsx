/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CLINICAL_INDICATIONS,
  CLINICIANS,
  CORE_PILLARS,
  PARENT_TESTIMONIALS,
  PRACTICE_INFO,
  ClinicalIndication,
  ClinicalService,
} from './data/clinicData';
import { CLINIC_IMAGES } from './data/clinicImages';
import {
  AspectLogoMark,
  ResilientImage,
} from './components/WixLineIllustrations';
import { AssessmentsSection } from './components/AssessmentsSection';
import { FaqSection } from './components/FeesAndFaqSection';
import { IntakeTriageForm } from './components/IntakeTriageForm';
import { ScrollReveal } from './components/ScrollReveal';
import {
  Check,
  ArrowRight,
  Award,
  Menu,
  X,
  Phone,
  Home,
  School,
  Video,
} from 'lucide-react';

export default function App() {
  const [selectedClinicianId, setSelectedClinicianId] = useState<string>('katelyn-whyte');
  const [showExtendedBio, setShowExtendedBio] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedIndication, setSelectedIndication] = useState<ClinicalIndication>(
    CLINICAL_INDICATIONS[0]
  );
  const [bookingServiceId, setBookingServiceId] = useState<string>('initial-consultation');
  const [bookingConcernId, setBookingConcernId] = useState<string>('late-talkers');

  // Footer newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterConsent, setNewsletterConsent] = useState<boolean>(false);
  const [newsletterError, setNewsletterError] = useState<string>('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  const activeClinician =
    CLINICIANS.find((c) => c.id === selectedClinicianId) || CLINICIANS[0];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForBooking = (service: ClinicalService) => {
    setBookingServiceId(service.id);
    scrollToSection('contact');
  };

  const handleSelectIndicationForBooking = (indication: ClinicalIndication) => {
    setBookingConcernId(indication.id);
    setBookingServiceId(indication.recommendedServiceId);
    scrollToSection('contact');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newsletterEmail || !emailRegex.test(newsletterEmail.trim())) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }
    if (!newsletterConsent) {
      setNewsletterError('Please accept the terms to receive parent guides.');
      return;
    }
    setNewsletterError('');
    setNewsletterSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#0B3866] w-full">
      {/* FULL-WIDTH TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 w-full bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#0B3866]/10 px-6 sm:px-10 lg:px-16 py-3.5 transition-colors duration-150">
        <div className="w-full flex items-center justify-between gap-4">
          {/* Brand Wordmark */}
          <a
            href="#top"
            className="flex items-center gap-2.5 sm:gap-3 text-[#0B3866] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#0B3866] btn-press"
          >
            <AspectLogoMark className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" />
            <span className="font-display text-xl sm:text-2xl lg:text-[26px] font-medium tracking-tight text-[#0B3866]">
              Aspect Speech Therapy
            </span>
          </a>

          {/* 5 Navigation Links (Desktop) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-medium text-[#0B3866]"
          >
            <a
              href="#about"
              className="hover:text-[#11558E] hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap"
            >
              Our Team
            </a>
            <a
              href="#indications"
              className="hover:text-[#11558E] hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap"
            >
              Who We Help
            </a>
            <a
              href="#assessments"
              className="hover:text-[#11558E] hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap"
            >
              Services & Assessments
            </a>
            <a
              href="#contact"
              className="hover:text-[#11558E] hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap"
            >
              Contact
            </a>
            <a
              href="#faq"
              className="hover:text-[#11558E] hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap"
            >
              FAQ
            </a>
          </nav>

          {/* Actions & Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={PRACTICE_INFO.phoneHref}
              className="hidden xl:flex items-center gap-2 text-xs font-semibold text-[#0B3866] hover:text-[#11558E] tabular-nums transition-colors duration-150"
            >
              <Phone className="w-3.5 h-3.5 text-[#11558E] shrink-0" />
              <span>{PRACTICE_INFO.phone}</span>
            </a>

            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="px-5 sm:px-6 py-2.5 rounded-full bg-[#11558E] hover:bg-[#0B3866] text-white text-xs sm:text-sm font-medium btn-press whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
            >
              <span>Book Consultation</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-full text-[#0B3866] hover:bg-[#C4E0F9]/40 btn-press cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 shrink-0" /> : <Menu className="w-5 h-5 shrink-0" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown (Origin-top smooth entrance) */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className="md:hidden w-full mt-3 pt-3 border-t border-[#0B3866]/10 space-y-2 bg-[#FBF9F5] origin-top transition-all duration-200 ease-out"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection('about');
                }}
                className="w-full text-left py-2.5 px-2 hover:bg-[#C4E0F9]/30 text-[#0B3866] font-medium text-sm transition-colors duration-150 cursor-pointer"
              >
                Our Team & Clinicians
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection('indications');
                }}
                className="w-full text-left py-2.5 px-2 hover:bg-[#C4E0F9]/30 text-[#0B3866] font-medium text-sm transition-colors duration-150 cursor-pointer"
              >
                Who We Help (Clinical Focus Areas)
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection('assessments');
                }}
                className="w-full text-left py-2.5 px-2 hover:bg-[#C4E0F9]/30 text-[#0B3866] font-medium text-sm transition-colors duration-150 cursor-pointer"
              >
                Therapy Sessions & Diagnostic Assessments
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection('contact');
                }}
                className="w-full text-left py-2.5 px-2 hover:bg-[#C4E0F9]/30 text-[#0B3866] font-medium text-sm transition-colors duration-150 cursor-pointer"
              >
                Contact & Ballymount Clinic
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection('faq');
                }}
                className="w-full text-left py-2.5 px-2 hover:bg-[#C4E0F9]/30 text-[#0B3866] font-medium text-sm transition-colors duration-150 cursor-pointer"
              >
                Frequently Asked Questions (FAQ)
              </button>
            </nav>
            <div className="pt-2 border-t border-[#0B3866]/10">
              <a
                href={PRACTICE_INFO.phoneHref}
                className="w-full py-2.5 px-3 text-xs font-semibold text-[#11558E] flex items-center gap-2 tabular-nums"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>Call Clinic: {PRACTICE_INFO.phone}</span>
              </a>
            </div>
          </div>
        )}
      </header>

      <main id="top" className="w-full">
        {/* COMPARTMENT 1: Full-Width 50/50 Split Screen Hero */}
        <section className="w-full border-b border-[#0B3866]/10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[640px] lg:min-h-[720px]">
            {/* Left 50% Panel: Editorial Narrative & Direct Consultation Action */}
            <div className="bg-[#F4EFEA] px-8 sm:px-14 lg:px-20 py-16 lg:py-24 flex flex-col justify-between">
              <div>
                <ScrollReveal delayMs={0}>
                  <p className="text-xs sm:text-sm font-semibold text-[#11558E] mb-4 uppercase tracking-wider">
                    Dublin, Kildare & Wicklow · CORU Registered · ASHA Certified
                  </p>
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] leading-[1.05] font-normal text-[#0B3866] text-balance mb-6">
                    Helping Children Communicate With Confidence
                  </h1>
                </ScrollReveal>

                <ScrollReveal delayMs={60}>
                  <p className="text-base sm:text-lg text-[#0B3866]/90 leading-relaxed max-w-[65ch] mb-8">
                    Child-centred, neurodiversity-affirming pediatric speech therapy across Dublin,
                    Kildare & Wicklow. Supporting speech clarity, early language, and AAC through play.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                    <button
                      type="button"
                      onClick={() => scrollToSection('contact')}
                      className="min-h-[48px] px-8 py-3.5 rounded-full bg-[#11558E] hover:bg-[#0B3866] text-white text-sm font-medium btn-press cursor-pointer text-center shadow-xs"
                    >
                      Arrange Initial Consultation
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToSection('assessments')}
                      className="min-h-[48px] px-7 py-3.5 rounded-full border border-[#11558E] text-[#0B3866] hover:bg-[#11558E] hover:text-white text-sm font-medium btn-press cursor-pointer text-center"
                    >
                      Explore Assessments
                    </button>
                  </div>
                </ScrollReveal>
              </div>

              {/* Bottom Quick Facts (Clean divider row, no cards) */}
              <ScrollReveal delayMs={120}>
                <div className="pt-10 border-t border-[#0B3866]/15 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#0B3866]/80">
                  <span className="font-semibold text-[#0B3866]">Accepting new clients</span>
                  <span>·</span>
                  <span>Ballymount Clinic (D12)</span>
                  <span>·</span>
                  <span>Preschool & School Visits</span>
                  <span>·</span>
                  <span>No GP Referral Needed</span>
                </div>
              </ScrollReveal>
            </div>

            {/* Right 50% Panel: Full-Bleed Therapy Session Photography with Caption */}
            <ScrollReveal variant="media" className="relative min-h-[420px] lg:min-h-full w-full bg-[#0B3866] overflow-hidden">
              <ResilientImage
                src={CLINIC_IMAGES.heroSession}
                alt="Child practising speech sounds with speech therapist during a play-based session in South Dublin"
                fallbackLabel="Play-Based Pediatric Speech & Language Therapy"
                className="w-full h-full object-cover object-center"
              />
              {/* Bottom Caption Bar */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B3866]/90 via-[#0B3866]/50 to-transparent p-6 sm:p-10 text-white">
                <p className="font-display text-xl sm:text-2xl font-normal mb-1">
                  Play-Based Pediatric Speech Therapy
                </p>
                <p className="text-xs sm:text-sm text-white/85 max-w-[65ch]">
                  Family-centred sessions at our Ballymount clinic (Dublin D12) & across Dublin,
                  Kildare & Wicklow.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* COMPARTMENT 2: Full-Width 50/50 Split Screen Clinical Team & Why Choose Aspect */}
        <section id="about" className="scroll-mt-20 w-full border-b border-[#0B3866]/10 bg-[#FBF9F5]">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
            {/* Left 50% Column: Clinician Showcase (Properly Sized & Smoothly Crossfaded) */}
            <div className="bg-[#F4EFEA] px-8 sm:px-14 lg:px-20 py-14 lg:py-20 flex flex-col justify-between">
              <div>
                {/* Top Clinician Switcher Tabs & Category Label */}
                <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-[#0B3866]/15">
                  <span className="text-xs font-bold text-[#11558E] uppercase tracking-wider">
                    Our Clinical Directors
                  </span>
                  <div
                    className="flex items-center gap-1.5 bg-[#FBF9F5] p-1 rounded-full border border-[#0B3866]/15 shadow-xs"
                    role="tablist"
                    aria-label="Select clinician profile"
                  >
                    {CLINICIANS.map((clinician) => (
                      <button
                        key={clinician.id}
                        type="button"
                        role="tab"
                        aria-selected={selectedClinicianId === clinician.id}
                        onClick={() => setSelectedClinicianId(clinician.id)}
                        className={`min-h-[38px] py-1 px-4 rounded-full text-xs font-semibold tab-press cursor-pointer ${
                          selectedClinicianId === clinician.id
                            ? 'bg-[#11558E] text-white shadow-xs'
                            : 'text-[#0B3866] hover:bg-[#C4E0F9]/50'
                        }`}
                      >
                        {clinician.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Animated In-Place Profile Crossfade */}
                <div key={activeClinician.id} className="fade-in-swap">
                  {/* Natural, Uncropped Proportional Portrait Frame */}
                  <div className="w-full max-w-[320px] sm:max-w-[360px] aspect-square rounded-[24px] overflow-hidden border border-[#0B3866]/15 shadow-xs bg-[#C4E0F9]/30 mb-6 mx-auto sm:mx-0 shrink-0">
                    <ResilientImage
                      src={activeClinician.photoUrl}
                      alt={activeClinician.photoAlt}
                      fallbackLabel={`${activeClinician.name}, ${activeClinician.credentials}`}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Clinician Identity, Role & Bio */}
                  <div className="max-w-[65ch]">
                    <p className="text-xs font-bold text-[#11558E] uppercase tracking-wider mb-1">
                      {activeClinician.role} · <span className="tabular-nums">{activeClinician.coruNumber}</span>
                    </p>
                    <h3 className="font-display text-2xl sm:text-3xl text-[#0B3866] font-normal mb-2">
                      {activeClinician.name},{' '}
                      <span className="text-xl sm:text-2xl font-light text-[#0B3866]/85">
                        {activeClinician.credentials}
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#0B3866]/85 leading-relaxed mb-4">
                      {activeClinician.shortBio}
                    </p>

                    {/* Accreditations List */}
                    <div className="pt-3 border-t border-[#0B3866]/15 space-y-2 text-xs text-[#0B3866]/85">
                      {activeClinician.accreditations.map((cred, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Award className="w-4 h-4 text-[#11558E] shrink-0 mt-0.5" />
                          <span>{cred}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {activeClinician.communityNote && (
                <p className="mt-6 pt-4 border-t border-[#0B3866]/15 text-xs text-[#0B3866]/70 italic max-w-[65ch]">
                  {activeClinician.communityNote}
                </p>
              )}
            </div>

            {/* Right 50% Column: Editorial Narrative & "Why Choose Aspect" */}
            <div className="bg-[#FBF9F5] px-8 sm:px-14 lg:px-20 py-16 lg:py-24 border-t lg:border-t-0 lg:border-l border-[#0B3866]/10 flex flex-col justify-between">
              <div>
                <ScrollReveal delayMs={0}>
                  <p className="text-xs sm:text-sm font-semibold text-[#11558E] uppercase tracking-wider mb-2">
                    Clinical Direction & Leadership
                  </p>
                  <h2 className="font-display text-4xl sm:text-5xl lg:text-[52px] leading-[1.08] font-normal text-[#0B3866] mb-5 text-balance">
                    Pediatric Speech & Language Specialists
                  </h2>

                  <div className="space-y-4 mb-8 text-[#0B3866]/90 text-sm sm:text-base leading-relaxed max-w-[65ch]">
                    <p>
                      We provide timely, individualized speech and language therapy across Dublin,
                      Kildare, and Wicklow. Led by Clinical Director{' '}
                      <strong>Katelyn Whyte (MSc, CCC-SLP)</strong> alongside{' '}
                      <strong>Keely O&apos;Grady (BSLP Hons)</strong>, we pair international standards
                      with warm, play-based care.
                    </p>

                    {showExtendedBio && (
                      <div className="border-l-2 border-[#11558E] pl-4 py-1 space-y-3 text-xs sm:text-sm text-[#0B3866]/85 fade-in-swap">
                        <p className="font-semibold text-[#0B3866]">
                          About {activeClinician.name} ({activeClinician.credentials}):
                        </p>
                        {activeClinician.extendedBio.map((paragraph, index) => (
                          <p key={index} className="leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                        <p className="text-xs text-[#11558E] font-medium pt-1">
                          Specialties: {activeClinician.specialties.join(' · ')}
                        </p>
                      </div>
                    )}

                    <div>
                      <button
                        type="button"
                        onClick={() => setShowExtendedBio((prev) => !prev)}
                        className="min-h-[40px] px-6 py-2 rounded-full border border-[#11558E] text-[#0B3866] hover:bg-[#11558E] hover:text-white text-xs sm:text-sm font-medium btn-press cursor-pointer"
                      >
                        {showExtendedBio ? 'Show Concise Summary' : 'Read Full Clinician Bio'}
                      </button>
                    </div>
                  </div>
                </ScrollReveal>

                {/* "Why Choose Aspect Speech Therapy" (Staggered Grid Reveal) */}
                <div className="border-t border-[#0B3866]/15 pt-8">
                  <p className="text-xs font-bold text-[#11558E] mb-6 uppercase tracking-wider">
                    Why Choose Aspect Speech Therapy
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
                    {CORE_PILLARS.map((pillar, idx) => (
                      <ScrollReveal key={pillar.id} delayMs={idx * 50} className="border-t border-[#0B3866]/15 pt-3">
                        <div className="flex items-baseline gap-2 mb-1.5">
                          <span className="font-display text-2xl sm:text-3xl font-light text-[#11558E] tabular-nums">
                            {pillar.number}
                          </span>
                          <h4 className="font-display text-xl sm:text-2xl text-[#0B3866] font-normal">
                            {pillar.title}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-[#0B3866]/80 leading-relaxed max-w-[65ch]">
                          {pillar.description}
                        </p>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARTMENT 3: Full-Width 50/50 Dual Feature Showcase */}
        <section className="w-full border-b border-[#0B3866]/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
            {/* Left 50%: Full-Bleed High-Res Photo Card */}
            <ScrollReveal variant="media" className="relative min-h-[440px] lg:min-h-[620px] bg-[#0B3866] overflow-hidden">
              <ResilientImage
                src={CLINIC_IMAGES.literacyPlay}
                alt="Speech therapist and child hands working with wooden alphabet and sound blocks"
                fallbackLabel="Evidence-Based Literacy, Sound & Language Play"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B3866]/90 via-[#0B3866]/50 to-transparent p-6 sm:p-10 text-white">
                <p className="font-display text-2xl sm:text-3xl font-normal mb-1">
                  Everyday Routine Carryover
                </p>
                <p className="text-xs sm:text-sm text-white/85 max-w-[65ch]">
                  Practical parent coaching designed for mealtimes, play, and classroom routines.
                </p>
              </div>
            </ScrollReveal>

            {/* Right 50%: Flexible Delivery Formats (Staggered Entrance on Scroll) */}
            <div className="bg-[#F4EFEA] px-8 sm:px-14 lg:px-20 py-16 lg:py-24 border-t lg:border-t-0 lg:border-l border-[#0B3866]/10 flex flex-col justify-between">
              <div>
                <ScrollReveal delayMs={0}>
                  <p className="text-xs font-semibold text-[#11558E] mb-2 uppercase tracking-wider">
                    Care Across Every Environment
                  </p>
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-[46px] leading-[1.08] text-[#0B3866] font-normal mb-4">
                    In-Clinic, Preschool Visits & Online Teletherapy
                  </h3>
                  <p className="text-sm sm:text-base text-[#0B3866]/85 leading-relaxed max-w-[65ch] mb-8">
                    We believe speech therapy works best where children feel happiest. Choose the
                    format that fits your family&apos;s schedule and location.
                  </p>
                </ScrollReveal>

                {/* 3 Staggered Full-Width Feature Items */}
                <div className="border-t border-[#0B3866]/15 divide-y divide-[#0B3866]/15">
                  <ScrollReveal delayMs={60} className="py-4 sm:py-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#C4E0F9] flex items-center justify-center shrink-0 mt-0.5">
                      <Home className="w-5 h-5 text-[#0B3866] shrink-0" />
                    </div>
                    <div>
                      <h4 className="font-display text-xl text-[#0B3866] font-normal mb-1">
                        Ballymount Clinic (Dublin D12)
                      </h4>
                      <p className="text-xs sm:text-sm text-[#0B3866]/80 leading-relaxed max-w-[65ch]">
                        Purpose-equipped, calm clinical rooms at Calmount Park with direct ramp access
                        and free designated parking.
                      </p>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delayMs={120} className="py-4 sm:py-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#C4E0F9] flex items-center justify-center shrink-0 mt-0.5">
                      <School className="w-5 h-5 text-[#0B3866] shrink-0" />
                    </div>
                    <div>
                      <h4 className="font-display text-xl text-[#0B3866] font-normal mb-1">
                        Preschool & School Visits
                      </h4>
                      <p className="text-xs sm:text-sm text-[#0B3866]/80 leading-relaxed max-w-[65ch]">
                        Direct classroom observation, teacher strategy alignment, and collaborative
                        IEP goal-setting across Dublin, Kildare & Wicklow.
                      </p>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delayMs={180} className="py-4 sm:py-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#C4E0F9] flex items-center justify-center shrink-0 mt-0.5">
                      <Video className="w-5 h-5 text-[#0B3866] shrink-0" />
                    </div>
                    <div>
                      <h4 className="font-display text-xl text-[#0B3866] font-normal mb-1">
                        Online Teletherapy & Coaching
                      </h4>
                      <p className="text-xs sm:text-sm text-[#0B3866]/80 leading-relaxed max-w-[65ch]">
                        Secure, play-based parent-guided consultations ideal for busy schedules or
                        families outside the immediate catchment area.
                      </p>
                    </div>
                  </ScrollReveal>
                </div>
              </div>

              <div className="pt-8 mt-6">
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="min-h-[44px] px-8 py-3 rounded-full bg-[#11558E] hover:bg-[#0B3866] text-white text-xs sm:text-sm font-medium btn-press cursor-pointer"
                >
                  Inquire About Session Availability
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARTMENT 4: Full-Width Clinical Focus Areas */}
        <section id="indications" className="scroll-mt-20 w-full bg-[#C4E0F9]/40 py-16 sm:py-20 px-6 sm:px-12 lg:px-20 border-b border-[#0B3866]/10">
          <div className="w-full">
            {/* Header */}
            <ScrollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-10 pb-6 border-b border-[#0B3866]/15">
              <div className="lg:col-span-7">
                <p className="text-xs sm:text-sm font-semibold text-[#11558E] uppercase tracking-wider mb-2">
                  Clinical Focus Areas
                </p>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-[48px] leading-[1.08] font-normal text-[#0B3866] text-balance">
                  Who We Support at Aspect
                </h2>
              </div>
              <div className="lg:col-span-5 text-[#0B3866]/85 text-xs sm:text-sm leading-relaxed max-w-[65ch]">
                <p>
                  Explore developmental signs and our recommended pathways for early communication,
                  speech clarity, neurodivergent play, and fluency.
                </p>
              </div>
            </ScrollReveal>

            {/* Horizontal Pathway Selector Tabs */}
            <div
              className="flex items-center gap-3 mb-10 overflow-x-auto pb-3 focus:outline-none"
              role="tablist"
              aria-label="Clinical focus areas"
            >
              {CLINICAL_INDICATIONS.map((indication) => {
                const isSelected = selectedIndication.id === indication.id;
                return (
                  <button
                    key={indication.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedIndication(indication)}
                    className={`min-h-[46px] px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tab-press whitespace-nowrap shrink-0 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#0B3866] text-white border-transparent shadow-xs'
                        : 'bg-[#FBF9F5] text-[#0B3866] border-[#0B3866]/15 hover:bg-white'
                    }`}
                  >
                    <span>{indication.fullTitle.split('&')[0].trim()}</span>
                  </button>
                );
              })}
            </div>

            {/* Expansive Detail with Fluid Crossfade Transition on Tab Switch */}
            <div key={selectedIndication.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pt-4 fade-in-swap">
              <div className="lg:col-span-7 space-y-4">
                <p className="text-xs font-bold text-[#11558E] uppercase tracking-wider">
                  Developmental Area · <span className="tabular-nums">{selectedIndication.ageFocus}</span>
                </p>
                <h3 className="font-display text-3xl sm:text-4xl text-[#0B3866] font-normal">
                  {selectedIndication.fullTitle}
                </h3>
                <p className="text-sm sm:text-base text-[#0B3866]/85 leading-relaxed max-w-[65ch]">
                  {selectedIndication.summary}
                </p>

                <div className="pt-4 space-y-2.5 border-t border-[#0B3866]/15">
                  <p className="text-xs font-bold text-[#0B3866] uppercase tracking-wide">
                    Common signs families notice:
                  </p>
                  {selectedIndication.signsToWatch.map((sign, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0B3866]/85">
                      <Check className="w-4 h-4 text-[#11558E] shrink-0 mt-0.5" />
                      <span>{sign}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 lg:border-l lg:border-[#0B3866]/15 lg:pl-10 space-y-4">
                <p className="text-xs font-bold text-[#11558E] uppercase tracking-wider">
                  Recommended Next Step
                </p>
                <h4 className="font-display text-2xl sm:text-3xl text-[#0B3866] font-normal leading-snug">
                  Individualized Play-Based Intake or Evaluation
                </h4>
                <p className="text-xs sm:text-sm text-[#0B3866]/80 leading-relaxed max-w-[65ch]">
                  We tailor every session around your child&apos;s natural interests, sensory
                  comfort, and everyday family routines.
                </p>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => handleSelectIndicationForBooking(selectedIndication)}
                    className="min-h-[46px] px-8 py-3 rounded-full bg-[#11558E] hover:bg-[#0B3866] text-white text-xs sm:text-sm font-medium btn-press flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Inquire About {selectedIndication.fullTitle.split('&')[0].trim()}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARTMENT 5: Full-Width Services & Diagnostic Assessments */}
        <AssessmentsSection onSelectServiceForBooking={handleSelectServiceForBooking} />

        {/* COMPARTMENT 6: Full-Width Testimonials (Staggered 3-Column Editorial Grid) */}
        <section className="w-full py-16 sm:py-20 px-6 sm:px-12 lg:px-20 bg-[#F4EFEA] border-b border-[#0B3866]/10">
          <div className="w-full">
            <ScrollReveal className="mb-10 pb-6 border-b border-[#0B3866]/15">
              <p className="text-xs font-semibold text-[#11558E] uppercase tracking-wider mb-2">
                Parent Feedback & Experiences
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[46px] leading-[1.08] font-normal text-[#0B3866]">
                What Families & Parents Say
              </h2>
            </ScrollReveal>

            {/* 3-Column Editorial Grid with Staggered Scroll Reveal */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 divide-y md:divide-y-0 md:divide-x divide-[#0B3866]/15">
              {PARENT_TESTIMONIALS.map((item, idx) => (
                <ScrollReveal
                  key={item.id}
                  delayMs={idx * 80}
                  className={idx > 0 ? 'pt-6 md:pt-0 md:pl-8 lg:pl-12' : ''}
                >
                  <p className="text-sm sm:text-base text-[#0B3866] leading-relaxed mb-6 font-normal max-w-[65ch]">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="border-t border-[#0B3866]/15 pt-4">
                    <p className="text-sm font-semibold text-[#0B3866]">{item.parentName}</p>
                    <p className="text-xs text-[#0B3866]/75 mt-0.5">
                      {item.childContext} · {item.location}
                    </p>
                    <p className="text-xs font-medium text-[#11558E] mt-1">{item.serviceUsed}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARTMENT 7: Full-Width 50/50 Split Screen Digital Intake & Booking */}
        <IntakeTriageForm
          preselectedServiceId={bookingServiceId}
          preselectedConcernId={bookingConcernId}
        />

        {/* COMPARTMENT 8: Full-Width Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* COMPARTMENT 9: Full-Width Footer */}
      <footer className="w-full bg-[#C4E0F9] py-16 px-6 sm:px-12 lg:px-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Brand, Practice Info & Governance */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <AspectLogoMark className="w-10 h-10 shrink-0" />
                <h2 className="font-display text-3xl sm:text-4xl text-[#0B3866] font-normal">
                  Aspect Speech Therapy
                </h2>
              </div>
              <p className="font-display text-xl sm:text-2xl text-[#0B3866]/90 mb-4">
                Pediatric Speech & Language Practice · Dublin, Ireland
              </p>
              <p className="text-sm text-[#0B3866] leading-relaxed max-w-[65ch]">
                {PRACTICE_INFO.fullAddress} |{' '}
                <a href={PRACTICE_INFO.phoneHref} className="hover:underline tabular-nums font-medium">
                  {PRACTICE_INFO.phone}
                </a>{' '}
                |{' '}
                <a href={PRACTICE_INFO.emailHref} className="underline hover:text-[#11558E]">
                  {PRACTICE_INFO.email}
                </a>
              </p>
            </div>

            {/* Authority & Registrations */}
            <div className="border-t border-[#0B3866]/15 pt-6 max-w-xl">
              <p className="text-xs font-bold text-[#0B3866] uppercase tracking-wider mb-2">
                Clinical Registrations & Professional Governance
              </p>
              <p className="text-xs text-[#0B3866]/85 leading-relaxed tabular-nums max-w-[65ch]">
                CORU Registered Speech & Language Therapists (SL046485) · ASHA Certified (CCC-SLP) ·
                Member of IASLT (Irish Association of Speech & Language Therapists) · Member of NZSTA.
              </p>
              <p className="text-xs text-[#0B3866]/75 mt-1">
                Serving {PRACTICE_INFO.catchmentAreas.join(', ')}.
              </p>
            </div>

            {/* Bottom Links & Copyright */}
            <div className="space-y-2 pt-2 text-xs text-[#0B3866]">
              <div className="flex flex-wrap items-center gap-6 underline underline-offset-4">
                <a href="#about" className="hover:text-[#11558E] transition-colors duration-150">Clinical Team</a>
                <a href="#assessments" className="hover:text-[#11558E] transition-colors duration-150">Diagnostic Assessments</a>
                <a href="#contact" className="hover:text-[#11558E] transition-colors duration-150">Book Consultation</a>
                <a href="#faq" className="hover:text-[#11558E] transition-colors duration-150">Frequently Asked Questions</a>
              </div>
              <p className="text-[#0B3866]/75 tabular-nums">
                © {new Date().getFullYear()} by Aspect Speech Therapy Dublin. All rights reserved.
              </p>
            </div>
          </div>

          {/* Right Column: Clean Newsletter Signup */}
          <div className="lg:col-span-5 lg:border-l lg:border-[#0B3866]/15 lg:pl-10">
            <h3 className="font-display text-2xl text-[#0B3866] font-normal mb-2">
              Subscribe to parent speech & communication tips
            </h3>
            <p className="text-xs sm:text-sm text-[#0B3866]/80 mb-6 leading-relaxed max-w-[65ch]">
              Receive seasonal play-based speech, language, and AAC strategies for everyday home
              routines from Katelyn & Keely.
            </p>

            {newsletterSubscribed ? (
              <div className="bg-[#FBF9F5] p-5 border-l-2 border-[#11558E] text-sm text-[#0B3866] transition-all duration-200 ease-out">
                <p className="font-semibold mb-1">Thank you for subscribing!</p>
                <p className="text-xs text-[#0B3866]/80">
                  We have added <strong>{newsletterEmail}</strong> to our parent resource updates.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} noValidate className="space-y-4">
                <div>
                  <label htmlFor="footer-email" className="sr-only">
                    Enter your email
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (newsletterError) setNewsletterError('');
                    }}
                    placeholder="Enter your email"
                    className="w-full bg-[#FBF9F5] border border-[#0B3866]/20 rounded-full px-5 py-3 text-sm text-[#0B3866] placeholder:text-[#0B3866]/60 transition-[border-color,box-shadow] duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-[#11558E] focus:border-transparent"
                  />
                </div>

                <label
                  htmlFor="footer-consent"
                  className="flex items-center gap-2.5 text-xs text-[#0B3866] cursor-pointer"
                >
                  <input
                    id="footer-consent"
                    type="checkbox"
                    checked={newsletterConsent}
                    onChange={(e) => {
                      setNewsletterConsent(e.target.checked);
                      if (newsletterError) setNewsletterError('');
                    }}
                    className="w-4 h-4 accent-[#11558E] shrink-0"
                  />
                  <span>Yes, send me parent speech & language tips and clinic updates *</span>
                </label>

                {newsletterError && (
                  <p className="text-xs text-red-700">{newsletterError}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#11558E] hover:bg-[#0B3866] text-white text-sm font-medium btn-press cursor-pointer shadow-xs"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
