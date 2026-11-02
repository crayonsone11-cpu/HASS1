import React, { useState } from 'react';
import { CLINICAL_SERVICES, ClinicalService } from '../data/clinicData';
import { ScrollReveal } from './ScrollReveal';
import {
  Check,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';

interface AssessmentsSectionProps {
  onSelectServiceForBooking: (service: ClinicalService) => void;
}

export function AssessmentsSection({
  onSelectServiceForBooking,
}: AssessmentsSectionProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('initial-consultation');

  const activeService =
    CLINICAL_SERVICES.find((s) => s.id === selectedServiceId) ||
    CLINICAL_SERVICES[0];

  const currentIndex = CLINICAL_SERVICES.findIndex((s) => s.id === activeService.id);

  const handlePrevService = () => {
    const prevIndex = (currentIndex - 1 + CLINICAL_SERVICES.length) % CLINICAL_SERVICES.length;
    setSelectedServiceId(CLINICAL_SERVICES[prevIndex].id);
  };

  const handleNextService = () => {
    const nextIndex = (currentIndex + 1) % CLINICAL_SERVICES.length;
    setSelectedServiceId(CLINICAL_SERVICES[nextIndex].id);
  };

  return (
    <section
      id="assessments"
      className="scroll-mt-20 w-full py-14 sm:py-18 lg:py-20 px-6 sm:px-10 lg:px-16 border-b border-[#0B3866]/10 bg-[#FBF9F5]"
    >
      {/* Full-Width Section Header with Scroll Reveal */}
      <ScrollReveal variant="fade-up" className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-end pb-8 sm:pb-10 border-b border-[#0B3866]/10 mb-8 sm:mb-10">
        <div className="lg:col-span-7">
          <p className="text-xs sm:text-sm font-semibold text-[#11558E] uppercase tracking-wider mb-2">
            Clinical Services & Evaluations
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[46px] leading-[1.08] font-normal text-[#0B3866] text-balance">
            Therapy Sessions & Diagnostic Assessments
          </h2>
        </div>
        <div className="lg:col-span-5 text-[#0B3866]/85 text-sm sm:text-[15px] leading-relaxed max-w-[65ch]">
          <p>
            From relaxed play-based consultations and ongoing therapy (from €115) to formal
            standardized diagnostic reports for schools, each pathway is tailored to your child.
          </p>
        </div>
      </ScrollReveal>

      {/* FULL WIDTH SPLIT VIEW: Clean Directory on Left, Expansive Detail on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT COLUMN: Clinical Directory List with Slide Reveal */}
        <ScrollReveal variant="fade-left" className="lg:col-span-5 flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#0B3866]/15">
            <span className="text-xs font-bold text-[#11558E] uppercase tracking-wider">
              Select Clinical Pathway
            </span>
            <span className="text-xs font-semibold text-[#0B3866] tabular-nums">
              8 Available Pathways
            </span>
          </div>

          {/* Clean Directory Items */}
          <div
            role="tablist"
            aria-label="Clinical pathways"
            className="divide-y divide-[#0B3866]/10 max-h-[580px] overflow-y-auto pr-1 focus:outline-none"
          >
            {CLINICAL_SERVICES.map((service, idx) => {
              const isSelected = activeService.id === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`w-full text-left py-4 px-3 sm:px-4 tab-press cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#0B3866] text-white rounded-xl shadow-xs'
                      : 'hover:bg-[#C4E0F9]/30 text-[#0B3866]'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs mb-1">
                      <span
                        className={`font-semibold tabular-nums ${
                          isSelected ? 'text-[#C4E0F9]' : 'text-[#11558E]'
                        }`}
                      >
                        {String(idx + 1).padStart(2, '0')}.{' '}
                        {service.category === 'consultation-therapy' ? 'Therapy' : 'Diagnostic'}
                      </span>
                      <span className={isSelected ? 'text-white/40' : 'text-[#0B3866]/30'}>·</span>
                      <span
                        className={`truncate text-xs ${
                          isSelected ? 'text-white/80' : 'text-[#0B3866]/70'
                        }`}
                      >
                        {service.duration}
                      </span>
                    </div>

                    <h3
                      className={`font-display text-lg sm:text-xl leading-snug font-normal truncate ${
                        isSelected ? 'text-white' : 'text-[#0B3866]'
                      }`}
                    >
                      {service.title}
                    </h3>

                    <div className="flex items-center gap-2 mt-1 text-xs">
                      <span
                        className={`font-semibold tabular-nums ${
                          isSelected ? 'text-[#C4E0F9]' : 'text-[#0B3866]/80'
                        }`}
                      >
                        From €{service.startingFee} · Receipt Provided
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-160 ${
                        isSelected
                          ? 'bg-white/20 text-white translate-x-0.5'
                          : 'bg-[#0B3866]/5 text-[#0B3866]'
                      }`}
                    >
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* RIGHT COLUMN: Full Clinical Information (Smooth Crossfade on Pathway Selection) */}
        <ScrollReveal variant="bloom" delayMs={60} className="lg:col-span-7 lg:border-l lg:border-[#0B3866]/15 lg:pl-10 flex flex-col justify-between min-h-[580px]">
          <div key={activeService.id} className="fade-in-swap">
            {/* Top Stepper Bar */}
            <div className="flex items-center justify-between gap-3 pb-3 mb-5 border-b border-[#0B3866]/15">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#11558E]">
                {activeService.category === 'diagnostic-assessment'
                  ? 'Standardized Diagnostic Assessment · Formal Report Included'
                  : 'Clinical Consultation & Ongoing Therapy'}
              </span>

              <div className="flex items-center gap-2 text-xs text-[#0B3866]">
                <button
                  type="button"
                  onClick={handlePrevService}
                  aria-label="Previous service"
                  className="p-1.5 rounded-full hover:bg-[#C4E0F9]/50 text-[#0B3866] btn-press cursor-pointer border border-[#0B3866]/15"
                >
                  <ChevronLeft className="w-4 h-4 shrink-0" />
                </button>
                <span className="text-xs font-semibold px-1 tabular-nums">
                  {currentIndex + 1} / {CLINICAL_SERVICES.length}
                </span>
                <button
                  type="button"
                  onClick={handleNextService}
                  aria-label="Next service"
                  className="p-1.5 rounded-full hover:bg-[#C4E0F9]/50 text-[#0B3866] btn-press cursor-pointer border border-[#0B3866]/15"
                >
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>

            {/* Title & Timing Meta */}
            <h3 className="font-display text-3xl sm:text-4xl text-[#0B3866] font-normal mb-3">
              {activeService.title}
            </h3>

            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[#0B3866]/85 mb-5 pb-4 border-b border-[#0B3866]/10">
              <span className="inline-flex items-center gap-1.5 font-medium text-[#11558E]">
                <Clock className="w-4 h-4 shrink-0" />
                <span>{activeService.duration}</span>
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#11558E] shrink-0" />
                <span>{activeService.deliveryModalities.join(' · ')}</span>
              </span>
            </div>

            {/* Concise Clinical Summary */}
            <p className="text-sm sm:text-base text-[#0B3866]/90 leading-relaxed mb-6 max-w-[65ch]">
              {activeService.clinicalDescription || activeService.shortSummary}
            </p>

            {/* Open Editorial Breakdown: Ideal For & Deliverables */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-y border-[#0B3866]/10 mb-6">
              {/* Ideal For */}
              <div>
                <p className="text-xs font-bold text-[#11558E] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Ideal for your child if:</span>
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-[#0B3866]/85">
                  {activeService.idealFor.slice(0, 4).map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#11558E] font-bold leading-none mt-1 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What Is Included */}
              <div>
                <p className="text-xs font-bold text-[#11558E] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>What is included:</span>
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-[#0B3866]/85">
                  {activeService.deliverables.slice(0, 4).map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#11558E] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Action Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-[#0B3866]/70 uppercase tracking-wide">Starting Session Fee</p>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl sm:text-4xl font-normal text-[#0B3866] tabular-nums">
                  €{activeService.startingFee}
                </span>
                <span className="text-xs text-[#0B3866]/75">
                  {activeService.category === 'diagnostic-assessment'
                    ? 'Includes formal written report'
                    : 'Per individual session'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectServiceForBooking(activeService)}
              className="min-h-[48px] px-8 py-3 rounded-full bg-[#11558E] hover:bg-[#0B3866] text-white text-sm font-medium btn-press flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Book / Inquire About This Pathway</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
