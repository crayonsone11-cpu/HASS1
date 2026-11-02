import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/clinicData';
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
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-semibold text-[#11558E] uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-[#11558E]" />
            <span>Helpful Information</span>
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[46px] leading-[1.08] font-normal text-[#0B3866] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#0B3866]/80 max-w-xl mx-auto leading-relaxed">
            Clear answers about appointment fees, health insurance reimbursement (VHI, Laya, Irish Life),
            clinic policies, and what to expect during your child&apos;s visit.
          </p>
        </div>

        {/* Full-Width Unboxed FAQ Accordion (Clean Hairline Borders, Zero Cards) */}
        <div className="border-t border-[#0B3866]/15 divide-y divide-[#0B3866]/15">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openFaqId === item.id;
            return (
              <div key={item.id} className="transition-colors">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  onClick={() => toggleFaq(item.id)}
                  className="w-full min-h-[58px] py-5 sm:py-6 text-left flex items-center justify-between gap-6 cursor-pointer group"
                >
                  <span className="font-display text-xl sm:text-2xl text-[#0B3866] font-normal leading-snug group-hover:text-[#11558E] transition-colors">
                    {item.question}
                  </span>
                  <span
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border border-[#0B3866]/15 transition-all duration-200 ${
                      isOpen
                        ? 'rotate-180 bg-[#11558E] text-white border-transparent'
                        : 'bg-[#FBF9F5] text-[#0B3866] group-hover:border-[#11558E]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>
                {isOpen && (
                  <div
                    id={`faq-answer-${item.id}`}
                    className="pb-6 pt-1 text-sm sm:text-base text-[#0B3866]/85 leading-relaxed max-w-3xl"
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Export as FeesAndFaqSection as well for drop-in compatibility
export { FaqSection as FeesAndFaqSection };
