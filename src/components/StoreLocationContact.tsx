import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Send, CheckCircle2, Navigation, Clock } from 'lucide-react';
import { BUSINESS_PHONE_LOCAL, BUSINESS_PHONE_INTL, WHATSAPP_INTL_NUMBER } from '../utils/cart';

export const StoreLocationContact: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sendViaWhatsapp, setSendViaWhatsapp] = useState(true);
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string; message?: string }>({});

  const validate = () => {
    const newErrors: { fullName?: string; phone?: string; message?: string } = {};
    if (!fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Please enter your phone number (e.g., 0909236008).';
    } else if (phone.trim().length < 9) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!message.trim()) {
      newErrors.message = 'Please enter your inquiry or message.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (sendViaWhatsapp) {
      // Build WhatsApp message and open
      const waMsg =
        `*NEW INQUIRY — ZI PERFUME*\n` +
        `• Name: *${fullName.trim()}*\n` +
        `• Phone: *${phone.trim()}*\n` +
        (email.trim() ? `• Email: ${email.trim()}\n` : '') +
        `• Message: ${message.trim()}\n\n` +
        `_Sent from ZI PERFUME Website Contact Form_`;

      const url = `https://wa.me/${WHATSAPP_INTL_NUMBER}?text=${encodeURIComponent(waMsg)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }

    setSubmitted(true);
  };

  const resetForm = () => {
    setFullName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setErrors({});
    setSubmitted(false);
  };

  // Google Maps embed URL for Bole, Addis Ababa near Stadium area
  const mapEmbedUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15761.542263158055!2d38.7844005!3d8.9953005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8504f7627447%3A0x7d97e937d53b26c0!2sBole%2C%20Addis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2set!4v1715000000000!5m2!1sen!2set';

  const directionsUrl =
    'https://www.google.com/maps/search/?api=1&query=Bole+FM+Building+Addis+Ababa+Ethiopia';

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#FAF9F5] border-b border-[#E8E5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-gold" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-deep font-body">
              SHOWROOM & INQUIRIES
            </span>
            <span className="w-6 h-[1px] bg-gold" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal font-semibold tracking-tight">
            Visit ZI PERFUME
          </h2>

          <p className="mt-4 text-base text-charcoal-muted leading-relaxed font-light">
            We welcome you to experience our collection in person at our Bole showroom, or contact our fragrance advisors anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column (7 cols): Store Location Info + Map Embed */}
          <div className="lg:col-span-7 space-y-6">
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Address card */}
              <div className="p-6 rounded-2xl bg-white border border-[#E8E5DC] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-sage-50 text-emerald-deep flex items-center justify-center mb-3">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-charcoal mb-1">
                  Physical Address
                </h3>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  Bole, in front of the New Stadium, <br />
                  FM Building, 2nd Floor, Room #214, <br />
                  Addis Ababa, Ethiopia.
                </p>
              </div>

              {/* Hours & Direct Contact card */}
              <div className="p-6 rounded-2xl bg-white border border-[#E8E5DC] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-sage-50 text-emerald-deep flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-charcoal mb-1">
                  Boutique Hours
                </h3>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  Monday – Saturday: 9:00 AM – 8:00 PM <br />
                  Sunday: 11:00 AM – 6:00 PM <br />
                  WhatsApp Orders: Daily 24/7
                </p>
              </div>
            </div>

            {/* Quick Action Buttons (Call + WhatsApp + Directions) */}
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${BUSINESS_PHONE_LOCAL}`}
                className="flex-1 min-w-[160px] py-3 px-4 rounded-xl bg-emerald-deep text-ivory text-xs font-semibold tracking-wider uppercase hover:bg-emerald-dark transition-colors flex items-center justify-center gap-2 border border-gold/40 shadow-xs"
              >
                <Phone className="w-4 h-4 text-gold-light" />
                <span>Call Us: {BUSINESS_PHONE_LOCAL}</span>
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_INTL_NUMBER}?text=${encodeURIComponent(
                  'Hello ZI PERFUME! I am planning to visit your Bole showroom. Are you open today?'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[160px] py-3 px-4 rounded-xl bg-[#25D366]/15 text-[#128C7E] hover:bg-[#25D366]/25 text-xs font-semibold tracking-wider uppercase border border-[#25D366]/40 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#128C7E]" />
                <span>WhatsApp ({BUSINESS_PHONE_LOCAL})</span>
              </a>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-white hover:bg-sage-50 text-charcoal text-xs font-semibold tracking-wider uppercase border border-[#E8E5DC] transition-colors flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4 text-emerald-deep" />
                <span>Directions</span>
              </a>
            </div>

            {/* Interactive Google Map Embed */}
            <div className="relative rounded-2xl overflow-hidden border border-[#E8E5DC] bg-sage-50 shadow-sm h-[320px]">
              <iframe
                title="ZI PERFUME Bole Showroom Location Map"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Floating map pin pill */}
              <div className="absolute top-3 left-3 bg-[#FAF9F5]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E8E5DC] shadow-sm flex items-center gap-2 pointer-events-none">
                <div className="w-2 h-2 rounded-full bg-emerald-deep" />
                <span className="text-[11px] font-semibold text-emerald-deep tracking-wider uppercase">
                  Bole · FM Building #214
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Contact Form */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-white border border-[#E8E5DC] shadow-md">
              <div className="mb-6">
                <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-emerald-deep block">
                  DIRECT ASSISTANCE
                </span>
                <h3 className="font-display text-2xl font-semibold text-charcoal mt-1">
                  Send Us a Message
                </h3>
                <p className="text-xs text-charcoal-muted mt-1 font-light">
                  Inquire about perfume notes, batch availability, or custom gift orders.
                </p>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 bg-sage-100 text-emerald-deep rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-display text-xl font-semibold text-charcoal">
                    Thank You, {fullName}!
                  </h4>
                  <p className="text-xs text-charcoal-muted leading-relaxed max-w-sm mx-auto">
                    {sendViaWhatsapp
                      ? 'Your inquiry was prepared and transferred to WhatsApp for immediate personal assistance from our Bole team.'
                      : 'Your message has been successfully received by our concierge team. We will call you back shortly.'}
                  </p>
                  <button
                    onClick={resetForm}
                    className="mt-4 px-6 py-2.5 rounded-full bg-emerald-deep text-ivory text-xs font-semibold tracking-wider uppercase hover:bg-emerald-dark transition-colors cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Abebech Tadesse"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-charcoal bg-[#FAF9F5] focus:outline-hidden focus:bg-white transition-colors ${
                        errors.fullName ? 'border-red-400' : 'border-[#E8E5DC] focus:border-gold'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 0909236008"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-charcoal bg-[#FAF9F5] focus:outline-hidden focus:bg-white transition-colors ${
                        errors.phone ? 'border-red-400' : 'border-[#E8E5DC] focus:border-gold'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Email (Optional) */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-1">
                      Email Address <span className="text-[10px] lowercase text-charcoal-muted/70">(optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E5DC] text-xs text-charcoal bg-[#FAF9F5] focus:outline-hidden focus:bg-white focus:border-gold transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-1">
                      Message / Fragrance Request <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us what scent profile or perfume you are searching for..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-charcoal bg-[#FAF9F5] focus:outline-hidden focus:bg-white transition-colors resize-none ${
                        errors.message ? 'border-red-400' : 'border-[#E8E5DC] focus:border-gold'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Routing preference */}
                  <div className="pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-charcoal select-none">
                      <input
                        type="checkbox"
                        checked={sendViaWhatsapp}
                        onChange={(e) => setSendViaWhatsapp(e.target.checked)}
                        className="rounded border-[#E8E5DC] text-emerald-deep focus:ring-gold"
                      />
                      <span>Send directly to WhatsApp (Fastest response)</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full bg-emerald-deep hover:bg-emerald-dark text-ivory text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer border border-gold/40 mt-2"
                  >
                    <Send className="w-3.5 h-3.5 text-gold-light" />
                    <span>{sendViaWhatsapp ? 'SEND VIA WHATSAPP' : 'SUBMIT INQUIRY'}</span>
                  </button>

                  <p className="text-[11px] text-center text-charcoal-muted pt-1">
                    Direct phone support available during showroom hours: {BUSINESS_PHONE_INTL}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
