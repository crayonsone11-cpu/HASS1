import React, { useState, useEffect } from 'react';
import {
  CLINICAL_INDICATIONS,
  CLINICAL_SERVICES,
  PRACTICE_INFO,
} from '../data/clinicData';
import {
  IntakeTriageFormData,
  recommendClinicalPathway,
  validateIntakeSubmission,
  ValidationErrors,
} from '../utils/clinicLogic';
import { CheckCircle2, MapPin, Phone, Mail, Sparkles, ArrowRight } from 'lucide-react';

interface IntakeTriageFormProps {
  preselectedServiceId?: string;
  preselectedConcernId?: string;
}

export interface SubmittedInquiry extends IntakeTriageFormData {
  referenceCode: string;
  submittedAt: string;
}

const AGE_GROUPS = [
  'Under 3 years (Infant / Toddler)',
  'Preschool (3 – 5 years)',
  'Primary School (5 – 12 years)',
  'Secondary School (12+ years)',
];

const DELIVERY_MODALITIES = [
  'In-Clinic (Ballymount D12)',
  'Preschool / School Visit (Dublin, Kildare, Wicklow)',
  'Online Teletherapy / Parent Coaching',
];

export function IntakeTriageForm({
  preselectedServiceId,
  preselectedConcernId,
}: IntakeTriageFormProps) {
  const [formData, setFormData] = useState<IntakeTriageFormData>({
    childName: '',
    childAgeGroup: 'Under 3 years (Infant / Toddler)',
    primaryConcernId: preselectedConcernId || 'late-talkers',
    preferredModality: 'In-Clinic (Ballymount D12)',
    preferredServiceId: preselectedServiceId || 'initial-consultation',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    locationArea: 'South County Dublin',
    additionalNotes: '',
    acceptedPolicy: false,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submittedInquiries, setSubmittedInquiries] = useState<SubmittedInquiry[]>([]);

  useEffect(() => {
    if (preselectedServiceId) {
      setFormData((prev) => ({ ...prev, preferredServiceId: preselectedServiceId }));
    }
  }, [preselectedServiceId]);

  useEffect(() => {
    if (preselectedConcernId) {
      const rec = recommendClinicalPathway(preselectedConcernId, formData.childAgeGroup);
      setFormData((prev) => ({
        ...prev,
        primaryConcernId: preselectedConcernId,
        preferredServiceId: rec.recommendedService.id,
      }));
    }
  }, [preselectedConcernId]);

  const pathwayRecommendation = recommendClinicalPathway(
    formData.primaryConcernId,
    formData.childAgeGroup
  );

  const handleConcernChange = (concernId: string) => {
    const rec = recommendClinicalPathway(concernId, formData.childAgeGroup);
    setFormData((prev) => ({
      ...prev,
      primaryConcernId: concernId,
      preferredServiceId: rec.recommendedService.id,
    }));
    if (errors.primaryConcernId) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.primaryConcernId;
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateIntakeSubmission(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const reference = `ASP-${Date.now().toString().slice(-6)}`;
      const newInquiry: SubmittedInquiry = {
        ...formData,
        referenceCode: reference,
        submittedAt: new Date().toLocaleDateString('en-IE', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setSubmittedInquiries((prev) => [newInquiry, ...prev]);

      // Reset form fields
      setFormData({
        childName: '',
        childAgeGroup: 'Under 3 years (Infant / Toddler)',
        primaryConcernId: 'late-talkers',
        preferredModality: 'In-Clinic (Ballymount D12)',
        preferredServiceId: 'initial-consultation',
        parentName: '',
        parentEmail: '',
        parentPhone: '',
        locationArea: 'South County Dublin',
        additionalNotes: '',
        acceptedPolicy: false,
      });
    }
  };

  const latestSubmission = submittedInquiries[0];

  return (
    <section id="contact" className="scroll-mt-20 w-full border-b border-[#0B3866]/10">
      {/* 50/50 Full-Width Split Screen: Clinic Information on Left, Intake Triage on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
        {/* Left Column: Clinic Location, Catchment & Direct Contact Details */}
        <div className="bg-[#F4EFEA] px-8 sm:px-14 lg:px-20 py-16 lg:py-24 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold text-[#11558E] mb-3 uppercase tracking-wider">
              Currently Accepting New Clients · No GP Referral Required
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[54px] text-[#0B3866] font-normal leading-[1.08] mb-4">
              Arrange an Initial Consultation
            </h2>
            <p className="text-sm sm:text-base text-[#0B3866]/85 leading-relaxed mb-8 max-w-lg">
              Complete our clinical intake form or contact our Ballymount clinic directly.
              Every inquiry is reviewed by dual CORU & ASHA registered clinicians.
            </p>

            <div className="space-y-6 border-t border-[#0B3866]/15 pt-8 max-w-md">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[#C4E0F9] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-[#0B3866]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#11558E] uppercase tracking-wide">Ballymount Clinic Address</p>
                  <p className="text-sm text-[#0B3866] font-medium">{PRACTICE_INFO.addressLine1}</p>
                  <p className="text-sm text-[#0B3866]/85">{PRACTICE_INFO.addressLine2}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[#C4E0F9] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5 text-[#0B3866]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#11558E] uppercase tracking-wide">Direct Clinic Telephone</p>
                  <a
                    href={PRACTICE_INFO.phoneHref}
                    className="text-lg font-medium text-[#0B3866] hover:text-[#11558E] hover:underline tabular-nums"
                  >
                    {PRACTICE_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[#C4E0F9] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5 text-[#0B3866]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#11558E] uppercase tracking-wide">Clinical Director Email</p>
                  <a
                    href={PRACTICE_INFO.emailHref}
                    className="text-base font-medium text-[#0B3866] hover:text-[#11558E] hover:underline"
                  >
                    {PRACTICE_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#0B3866]/15 max-w-md">
            <p className="text-xs font-bold text-[#11558E] uppercase tracking-wider mb-2">
              Catchment & Visit Coverage:
            </p>
            <p className="text-xs sm:text-sm text-[#0B3866]/85 leading-relaxed">
              {PRACTICE_INFO.catchmentAreas.join(' · ')}
            </p>
          </div>
        </div>

        {/* Right Column: Digital Intake Form (Full-width, Card-free) */}
        <div className="bg-[#FBF9F5] px-8 sm:px-14 lg:px-20 py-16 lg:py-24 border-t lg:border-t-0 lg:border-l border-[#0B3866]/10 flex flex-col justify-between">
          <div>
            <div className="mb-8">
              <span className="text-xs font-bold text-[#11558E] uppercase tracking-wider">
                Direct Clinic Intake
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-[#0B3866] font-normal mt-1 mb-2">
                Digital Intake & Triage Form
              </h3>
              <p className="text-xs sm:text-sm text-[#0B3866]/80 leading-relaxed">
                Tell us about your child to help our clinical team recommend the ideal starting pathway.
              </p>
            </div>

            {latestSubmission && (
              <div
                className="mb-8 bg-[#C4E0F9]/30 p-6 border-l-4 border-[#11558E]"
                role="status"
                aria-live="polite"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#11558E] shrink-0" />
                    <h4 className="font-display text-xl text-[#0B3866] font-semibold">
                      Inquiry Received ({latestSubmission.referenceCode})
                    </h4>
                  </div>
                  <span className="text-xs text-[#0B3866]/70 tabular-nums">
                    {latestSubmission.submittedAt}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#0B3866]/90 mb-2">
                  Thank you, <strong>{latestSubmission.parentName}</strong>. We have logged your
                  inquiry for{' '}
                  <strong>
                    {CLINICAL_SERVICES.find((s) => s.id === latestSubmission.preferredServiceId)
                      ?.title || 'Initial Consultation'}
                  </strong>{' '}
                  ({latestSubmission.childAgeGroup} · {latestSubmission.preferredModality}).
                </p>
                <p className="text-xs text-[#0B3866]/75">
                  Our clinical team will follow up directly at{' '}
                  <strong className="tabular-nums">{latestSubmission.parentPhone}</strong> within 1
                  business day.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Step 1: Child Profile & Triage */}
              <div className="space-y-4">
                <p className="text-xs font-bold text-[#11558E] uppercase tracking-wider">
                  01 · Child’s Developmental Stage & Primary Focus
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="intake-child-name"
                      className="block text-xs font-semibold text-[#0B3866] mb-1.5"
                    >
                      Child’s First Name (Optional)
                    </label>
                    <input
                      id="intake-child-name"
                      type="text"
                      value={formData.childName}
                      onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                      placeholder="e.g. Liam"
                      className="w-full bg-white border border-[#0B3866]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#0B3866] focus:outline-none focus:ring-2 focus:ring-[#11558E]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="intake-age-group"
                      className="block text-xs font-semibold text-[#0B3866] mb-1.5"
                    >
                      Child’s Age Stage *
                    </label>
                    <select
                      id="intake-age-group"
                      value={formData.childAgeGroup}
                      onChange={(e) => setFormData({ ...formData, childAgeGroup: e.target.value })}
                      className="w-full bg-white border border-[#0B3866]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#0B3866] focus:outline-none focus:ring-2 focus:ring-[#11558E]"
                    >
                      {AGE_GROUPS.map((age) => (
                        <option key={age} value={age}>
                          {age}
                        </option>
                      ))}
                    </select>
                    {errors.childAgeGroup && (
                      <p className="text-xs text-red-700 mt-1">{errors.childAgeGroup}</p>
                    )}
                  </div>
                </div>

                {/* Primary Communication Concern */}
                <div>
                  <label
                    htmlFor="intake-concern"
                    className="block text-xs font-semibold text-[#0B3866] mb-1.5"
                  >
                    Primary Communication Area *
                  </label>
                  <select
                    id="intake-concern"
                    value={formData.primaryConcernId}
                    onChange={(e) => handleConcernChange(e.target.value)}
                    className="w-full bg-white border border-[#0B3866]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#0B3866] focus:outline-none focus:ring-2 focus:ring-[#11558E]"
                  >
                    {CLINICAL_INDICATIONS.map((ind) => (
                      <option key={ind.id} value={ind.id}>
                        {ind.fullTitle} ({ind.ageFocus})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dynamic Triage Recommendation Callout */}
                <div className="bg-[#F4EFEA] border-l-2 border-[#11558E] p-3.5 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#11558E] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#0B3866]/90 leading-relaxed">
                    <span className="font-semibold text-[#0B3866]">
                      Recommended Clinical Pathway:{' '}
                    </span>
                    {pathwayRecommendation.rationale}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="intake-service"
                      className="block text-xs font-semibold text-[#0B3866] mb-1.5"
                    >
                      Preferred Service *
                    </label>
                    <select
                      id="intake-service"
                      value={formData.preferredServiceId}
                      onChange={(e) =>
                        setFormData({ ...formData, preferredServiceId: e.target.value })
                      }
                      className="w-full bg-white border border-[#0B3866]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#0B3866] focus:outline-none focus:ring-2 focus:ring-[#11558E]"
                    >
                      {CLINICAL_SERVICES.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.title} (From €{service.startingFee})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="intake-modality"
                      className="block text-xs font-semibold text-[#0B3866] mb-1.5"
                    >
                      Preferred Delivery Format *
                    </label>
                    <select
                      id="intake-modality"
                      value={formData.preferredModality}
                      onChange={(e) =>
                        setFormData({ ...formData, preferredModality: e.target.value })
                      }
                      className="w-full bg-white border border-[#0B3866]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#0B3866] focus:outline-none focus:ring-2 focus:ring-[#11558E]"
                    >
                      {DELIVERY_MODALITIES.map((mod) => (
                        <option key={mod} value={mod}>
                          {mod}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2: Parent / Guardian Contact Details */}
              <div className="space-y-4 pt-4 border-t border-[#0B3866]/10">
                <p className="text-xs font-bold text-[#11558E] uppercase tracking-wider">
                  02 · Parent or Guardian Contact Information
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="intake-parent-name"
                      className="block text-xs font-semibold text-[#0B3866] mb-1.5"
                    >
                      Parent / Guardian Name *
                    </label>
                    <input
                      id="intake-parent-name"
                      type="text"
                      required
                      value={formData.parentName}
                      onChange={(e) => {
                        setFormData({ ...formData, parentName: e.target.value });
                        if (errors.parentName) setErrors({ ...errors, parentName: '' });
                      }}
                      placeholder="e.g. Niamh Walsh"
                      className="w-full bg-white border border-[#0B3866]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#0B3866] focus:outline-none focus:ring-2 focus:ring-[#11558E]"
                    />
                    {errors.parentName && (
                      <p className="text-xs text-red-700 mt-1">{errors.parentName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="intake-location"
                      className="block text-xs font-semibold text-[#0B3866] mb-1.5"
                    >
                      Family Location / Catchment
                    </label>
                    <select
                      id="intake-location"
                      value={formData.locationArea}
                      onChange={(e) => setFormData({ ...formData, locationArea: e.target.value })}
                      className="w-full bg-white border border-[#0B3866]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#0B3866] focus:outline-none focus:ring-2 focus:ring-[#11558E]"
                    >
                      {PRACTICE_INFO.catchmentAreas.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="intake-parent-email"
                      className="block text-xs font-semibold text-[#0B3866] mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="intake-parent-email"
                      type="email"
                      required
                      value={formData.parentEmail}
                      onChange={(e) => {
                        setFormData({ ...formData, parentEmail: e.target.value });
                        if (errors.parentEmail) setErrors({ ...errors, parentEmail: '' });
                      }}
                      placeholder="parent@example.ie"
                      className="w-full bg-white border border-[#0B3866]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#0B3866] focus:outline-none focus:ring-2 focus:ring-[#11558E]"
                    />
                    {errors.parentEmail && (
                      <p className="text-xs text-red-700 mt-1">{errors.parentEmail}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="intake-parent-phone"
                      className="block text-xs font-semibold text-[#0B3866] mb-1.5"
                    >
                      Mobile / Telephone Number *
                    </label>
                    <input
                      id="intake-parent-phone"
                      type="tel"
                      required
                      value={formData.parentPhone}
                      onChange={(e) => {
                        setFormData({ ...formData, parentPhone: e.target.value });
                        if (errors.parentPhone) setErrors({ ...errors, parentPhone: '' });
                      }}
                      placeholder="085 153 1931"
                      className="w-full bg-white border border-[#0B3866]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#0B3866] focus:outline-none focus:ring-2 focus:ring-[#11558E]"
                    />
                    {errors.parentPhone && (
                      <p className="text-xs text-red-700 mt-1">{errors.parentPhone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="intake-notes"
                    className="block text-xs font-semibold text-[#0B3866] mb-1.5"
                  >
                    Brief Note About Your Child’s Strengths or Goals (Optional)
                  </label>
                  <textarea
                    id="intake-notes"
                    rows={2}
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    placeholder="Share any context on previous reports, school supports, or preferred days..."
                    className="w-full bg-white border border-[#0B3866]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#0B3866] focus:outline-none focus:ring-2 focus:ring-[#11558E]"
                  />
                </div>

                <div className="pt-1">
                  <label
                    htmlFor="intake-policy-check"
                    className="flex items-start gap-2.5 text-xs text-[#0B3866]/85 cursor-pointer"
                  >
                    <input
                      id="intake-policy-check"
                      type="checkbox"
                      checked={formData.acceptedPolicy}
                      onChange={(e) => {
                        setFormData({ ...formData, acceptedPolicy: e.target.checked });
                        if (errors.acceptedPolicy) setErrors({ ...errors, acceptedPolicy: '' });
                      }}
                      className="w-4 h-4 rounded accent-[#11558E] mt-0.5 shrink-0"
                    />
                    <span>
                      I understand that session fees are payable on the day of appointment (from €115)
                      and that a minimum of 24 hours notice is required for cancellations. *
                    </span>
                  </label>
                  {errors.acceptedPolicy && (
                    <p className="text-xs text-red-700 mt-1">{errors.acceptedPolicy}</p>
                  )}
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#0B3866]/70">
                  Reviewed directly by CORU & ASHA registered clinicians.
                </p>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#11558E] hover:bg-[#0B3866] text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
                >
                  <span>Submit Clinical Intake Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
