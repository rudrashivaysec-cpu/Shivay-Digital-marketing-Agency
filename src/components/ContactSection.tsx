import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, Copy, Check, Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import { SERVICES } from '../data/agencyData';

interface ContactSectionProps {
  preselectedService: string;
  preselectedPlan: string;
  preselectedNote: string;
}

interface FormErrors {
  name?: string;
  phoneOrEmail?: string;
}

export function ContactSection({
  preselectedService,
  preselectedPlan,
  preselectedNote,
}: ContactSectionProps) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(preselectedService || 'Performance Paid Ads');
  const [plan, setPlan] = useState(preselectedPlan || 'Growth Accelerator');
  const [notes, setNotes] = useState(preselectedNote || '');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  useEffect(() => {
    if (preselectedService) setService(preselectedService);
  }, [preselectedService]);

  useEffect(() => {
    if (preselectedPlan) setPlan(preselectedPlan);
  }, [preselectedPlan]);

  useEffect(() => {
    if (preselectedNote) setNotes(preselectedNote);
  }, [preselectedNote]);

  const handleCopy = async (text: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1800);
    } catch {
      // Clipboard blocked in restricted iframe; fallback silently
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: FormErrors = {};

    if (!name.trim() || name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name.';
    }

    const emailTrimmed = email.trim();
    const phoneDigits = phone.replace(/\D/g, '');
    const hasValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed);
    const hasValidPhone = phoneDigits.length >= 10;

    if (!hasValidEmail && !hasValidPhone) {
      nextErrors.phoneOrEmail = 'Enter a valid WhatsApp number (10+ digits) or email address.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  const whatsappSummaryUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    `Hi Shivay Digital! I'm ${name || 'a founder'}${brand ? ` from ${brand}` : ''}. Interested in ${service} (${plan}).${notes ? ` Notes: ${notes}` : ''}`
  )}`;

  return (
    <section id="contact" className="border-t border-white/8 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Direct Channels */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <p className="text-xs font-medium tracking-wide text-[#FF7A1A]">
                Start Your Growth Audit
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white text-balance sm:text-4xl">
                Book your free 48-hour brand &amp; funnel audit.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-300">
                Share your goals below or message us directly on WhatsApp. We review your current
                website speed, ad creatives, and conversion gaps before our discovery call.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#121116] p-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#FF7A1A]">
                      <Phone className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-zinc-400">Phone &amp; WhatsApp</p>
                      <p className="font-mono text-sm font-medium text-white truncate tabular-nums">
                        +91 98765 43210
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('+919876543210', 'phone')}
                    aria-label="Copy phone number"
                    className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-white/10 text-zinc-300 hover:border-white/25 hover:text-white cursor-pointer"
                  >
                    {copiedField === 'phone' ? (
                      <Check className="h-4 w-4 text-[#FF7A1A]" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#121116] p-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#FF7A1A]">
                      <Mail className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-zinc-400">Direct Email</p>
                      <p className="text-sm font-medium text-white truncate">
                        hello@shivaydigital.in
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('hello@shivaydigital.in', 'email')}
                    aria-label="Copy email address"
                    className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-white/10 text-zinc-300 hover:border-white/25 hover:text-white cursor-pointer"
                  >
                    {copiedField === 'email' ? (
                      <Check className="h-4 w-4 text-[#FF7A1A]" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-[#121116] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#FF7A1A]">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">Studio Base</p>
                    <p className="text-sm font-medium text-white">
                      Mumbai, India · Serving Global Brands
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={whatsappSummaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-5 py-3 text-sm font-semibold text-[#6EE79D] transition-colors hover:bg-[#25D366]/20 whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Chat Directly on WhatsApp</span>
            </a>
          </div>

          {/* Right Validated Lead Capture Form */}
          <div className="rounded-2xl border border-white/10 bg-[#121116] p-6 sm:p-8 lg:col-span-7">
            {submitted ? (
              <div className="flex h-full flex-col justify-between py-4">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF7A1A]/15 text-[#FF7A1A]">
                    <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold text-white">
                    Audit request received, {name}.
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                    Our strategist will review your brief for{' '}
                    <span className="font-semibold text-white">{service}</span> ({plan}) and reach
                    out within 4 business hours.
                  </p>

                  <div className="mt-6 rounded-xl border border-white/10 bg-[#09090B] p-4 text-xs text-zinc-300 space-y-1.5">
                    <p>
                      <span className="text-zinc-500">Brand:</span> {brand || 'Not specified'}
                    </p>
                    <p>
                      <span className="text-zinc-500">Contact:</span>{' '}
                      {[phone, email].filter(Boolean).join(' · ')}
                    </p>
                    <p>
                      <span className="text-zinc-500">Focus:</span> {service} — {plan}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={whatsappSummaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#FF7A1A] px-5 py-3 text-sm font-semibold text-[#09090B] hover:bg-[#FF8C38]"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>Send Brief via WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="min-h-[48px] rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-zinc-300 hover:border-white/35 hover:text-white cursor-pointer"
                  >
                    Edit Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="lead-name" className="block text-xs font-medium text-zinc-300">
                      Full Name *
                    </label>
                    <input
                      id="lead-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Aarav Sharma"
                      className="mt-1.5 min-h-[48px] w-full rounded-xl border border-white/12 bg-[#09090B] px-4 py-3 text-base text-white placeholder:text-zinc-600 focus:border-[#FF7A1A] focus:outline-none"
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-rose-400" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lead-brand" className="block text-xs font-medium text-zinc-300">
                      Brand / Company Name
                    </label>
                    <input
                      id="lead-brand"
                      type="text"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      placeholder="Veda Botanicals"
                      className="mt-1.5 min-h-[48px] w-full rounded-xl border border-white/12 bg-[#09090B] px-4 py-3 text-base text-white placeholder:text-zinc-600 focus:border-[#FF7A1A] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="lead-phone" className="block text-xs font-medium text-zinc-300">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      id="lead-phone"
                      type="tel"
                      inputMode="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 00000"
                      className="mt-1.5 min-h-[48px] w-full rounded-xl border border-white/12 bg-[#09090B] px-4 py-3 text-base text-white placeholder:text-zinc-600 focus:border-[#FF7A1A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="lead-email" className="block text-xs font-medium text-zinc-300">
                      Work Email
                    </label>
                    <input
                      id="lead-email"
                      type="email"
                      inputMode="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="founder@yourbrand.com"
                      className="mt-1.5 min-h-[48px] w-full rounded-xl border border-white/12 bg-[#09090B] px-4 py-3 text-base text-white placeholder:text-zinc-600 focus:border-[#FF7A1A] focus:outline-none"
                    />
                  </div>
                </div>

                {errors.phoneOrEmail && (
                  <p className="text-xs text-rose-400" role="alert">
                    {errors.phoneOrEmail}
                  </p>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="lead-service" className="block text-xs font-medium text-zinc-300">
                      Primary Service Needed
                    </label>
                    <select
                      id="lead-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="mt-1.5 min-h-[48px] w-full rounded-xl border border-white/12 bg-[#09090B] px-4 py-3 text-base text-white focus:border-[#FF7A1A] focus:outline-none"
                    >
                      {SERVICES.map((item) => (
                        <option key={item.id} value={item.title}>
                          {item.title}
                        </option>
                      ))}
                      <option value="Full-Stack Growth Retainer">Full-Stack Growth Retainer</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="lead-plan" className="block text-xs font-medium text-zinc-300">
                      Preferred Retainer / Scope
                    </label>
                    <select
                      id="lead-plan"
                      value={plan}
                      onChange={(e) => setPlan(e.target.value)}
                      className="mt-1.5 min-h-[48px] w-full rounded-xl border border-white/12 bg-[#09090B] px-4 py-3 text-base text-white focus:border-[#FF7A1A] focus:outline-none"
                    >
                      <option value="Launch Foundation">Launch Foundation</option>
                      <option value="Growth Accelerator">Growth Accelerator</option>
                      <option value="Scale Partner">Scale Partner</option>
                      <option value="One-Time Website / Brand Project">
                        One-Time Website / Brand Project
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="lead-notes" className="block text-xs font-medium text-zinc-300">
                    Website URL &amp; 90-Day Goal
                  </label>
                  <textarea
                    id="lead-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Share your website or Instagram handle and what you want to achieve in the next 90 days..."
                    className="mt-1.5 w-full rounded-xl border border-white/12 bg-[#09090B] px-4 py-3 text-base text-white placeholder:text-zinc-600 focus:border-[#FF7A1A] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="min-h-[48px] w-full rounded-xl bg-[#FF7A1A] px-6 py-3.5 text-sm font-semibold text-[#09090B] transition-all duration-150 hover:bg-[#FF8C38] active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Request Free Brand &amp; Funnel Audit
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
