import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/clinicData';
import { ScrollReveal } from './ScrollReveal';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FaqSection() {
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      id="faq"
      className="scroll-mt-20 w-full py-16 sm:py-20 px-6 sm:px-12 lg:px-20 border-b border-[#0B3866]/10 bg-[#FBF9F5]"
    >
      <div className="max-w-4xl mx-auto">
        <ScrollReveal variant="fade-up" className="text-center mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-semibold text-[#11558E] uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-[#11558E] shrink-0" />
            <span>Helpful Information</span>
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[46px] leading-[1.08] font-normal text-[#0B3866] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#0B3866]/80 max-w-[65ch] mx-auto leading-relaxed">
            Clear answers about appointment fees, health insurance reimbursement (VHI, Laya, Irish Life),
            clinic policies, and what to expect during your child&apos;s visit.
          </p>
        </ScrollReveal>

        {/* Full-Width Unboxed FAQ Accordion (Unique: Venetian Curtain Unroll) */}
        <div className="border-t border-[#0B3866]/15 divide-y divide-[#0B3866]/15">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaqId === item.id;
            return (
              <ScrollReveal key={item.id} variant="curtain" delayMs={idx * 45}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  onClick={() => toggleFaq(item.id)}
                  className="w-full min-h-[58px] py-5 sm:py-6 text-left flex items-center justify-between gap-6 cursor-pointer group active:opacity-85 transition-opacity"
                >
                  <span className="font-display text-xl sm:text-2xl text-[#0B3866] font-normal leading-snug group-hover:text-[#11558E] transition-colors">
                    {item.question}
                  </span>
                  <span
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border border-[#0B3866]/15 transition-transform duration-200 ease-out ${
                      isOpen
                        ? 'rotate-180 bg-[#11558E] text-white border-transparent'
                        : 'bg-[#FBF9F5] text-[#0B3866] group-hover:border-[#11558E]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 shrink-0" />
                  </span>
                </button>
                <div
                  id={`faq-answer-${item.id}`}
                  className="accordion-wrapper"
                  data-open={isOpen ? 'true' : 'false'}
                >
                  <div className="accordion-inner">
                    <div className="pb-6 pt-1 text-sm sm:text-base text-[#0B3866]/85 leading-relaxed max-w-[65ch]">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Export as FeesAndFaqSection as well for drop-in compatibility
export { FaqSection as FeesAndFaqSection };
