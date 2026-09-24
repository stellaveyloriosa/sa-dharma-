import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Github,
  Linkedin,
  BookOpen,
  Award,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { PORTFOLIO_DATA } from '../../data/portfolio';

interface ContactProps {
  isMobile: boolean;
}

export const Contact: React.FC<ContactProps> = ({ isMobile: _isMobile }) => {
  const { personal } = PORTFOLIO_DATA;

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    topic: 'Research Collaboration',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const topics = [
    'Research Collaboration',
    'Graduate / PhD Opportunity',
    'Single-Cell Modelling',
    'General Inquiry',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      const subject = encodeURIComponent(`[${formState.topic}] Inquiry from ${formState.name}`);
      const body = encodeURIComponent(
        `Name: ${formState.name}\nEmail: ${formState.email}\nTopic: ${formState.topic}\n\nMessage:\n${formState.message}`
      );
      window.location.href = `mailto:${personal.socialLinks.email}?subject=${subject}&body=${body}`;
    }, 600);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="liquid-glass rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        <SectionHeading
          title="Let's Connect"
          subtitle="Collaborations, Scientific Inquiries & Graduate Research"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct Communication Cards */}
          <div className="lg:col-span-5 space-y-4">
            <p className="text-[14.5px] sm:text-base text-slate-700 font-medium leading-relaxed mb-6 font-sans">
              I am open to discussions regarding computational biology pipelines, single-cell foundation models,
              structural bioinformatics, and graduate research opportunities worldwide.
            </p>

            <div className="space-y-3">
              {/* Primary Email */}
              <motion.a
                href={`mailto:${personal.socialLinks.email}`}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="edge-glow-card rounded-[22px] p-4 flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-blue-500/10 to-purple-500/10 border border-indigo-200/80 flex items-center justify-center text-indigo-600 shadow-[0_2px_10px_rgba(99,102,241,0.2)] shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5 text-indigo-600" strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Primary Email
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors truncate block">
                      {personal.socialLinks.email}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors shrink-0 ml-2" />
              </motion.a>

              {/* Secondary Email */}
              <motion.a
                href={`mailto:${personal.socialLinks.secondaryEmail}`}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="edge-glow-card rounded-[22px] p-4 flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500/20 via-indigo-500/10 to-pink-500/10 border border-purple-200/80 flex items-center justify-center text-purple-600 shadow-[0_2px_10px_rgba(168,85,247,0.2)] shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5 text-purple-600" strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Secondary Academic Email
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-purple-600 transition-colors truncate block">
                      {personal.socialLinks.secondaryEmail}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-colors shrink-0 ml-2" />
              </motion.a>

              {/* Phone */}
              <div className="edge-glow-card rounded-[22px] p-4 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500/20 via-sky-500/10 to-indigo-500/10 border border-blue-200/80 flex items-center justify-center text-blue-600 shadow-[0_2px_10px_rgba(59,130,246,0.2)] shrink-0">
                  <Phone className="w-5 h-5 text-blue-600" strokeWidth={2.2} />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Direct Phone / WhatsApp
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    +91 9949256647
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className="edge-glow-card rounded-[22px] p-4 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-indigo-500/10 border border-emerald-200/80 flex items-center justify-center text-emerald-600 shadow-[0_2px_10px_rgba(16,185,129,0.2)] shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-600" strokeWidth={2.2} />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Location & Mobility
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    India · Open to Global Relocation & Graduate Research
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links Row with Luxury Badges */}
            <div className="pt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3 font-display">
                Scholarly Profiles & Code
              </span>
              <div className="flex items-center gap-3">
                {[
                  { href: personal.socialLinks.github, icon: Github, label: 'GitHub', color: 'hover:text-slate-900' },
                  { href: personal.socialLinks.linkedin, icon: Linkedin, label: 'LinkedIn', color: 'hover:text-blue-600' },
                  { href: personal.socialLinks.scholar, icon: BookOpen, label: 'Scholar', color: 'hover:text-indigo-600' },
                  { href: personal.socialLinks.orcid, icon: Award, label: 'ORCID', color: 'hover:text-emerald-600' },
                ].map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    className={`w-11 h-11 rounded-2xl bg-white/95 border border-white/90 flex items-center justify-center text-slate-700 shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:shadow-[0_4px_16px_rgba(99,102,241,0.2)] transition-all ${item.color}`}
                  >
                    <item.icon className="w-5 h-5" strokeWidth={2.2} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: High-End Interactive Inquiry Console */}
          <div className="lg:col-span-7">
            <div className="glass-frost-card rounded-[32px] p-6 sm:p-9 border border-white/95 shadow-xl relative overflow-hidden group">
              {/* Glowing perimeter border overlay */}
              <div className="absolute inset-0 rounded-[32px] border border-transparent group-hover:border-indigo-400/80 pointer-events-none transition-colors duration-300" />

              {isSuccess ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600 shadow-md">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                    Inquiry Form Prepared
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Your preferred email client has been prepared with your inquiry details. If it did not open automatically, reach out directly at{' '}
                    <strong className="text-indigo-600">{personal.socialLinks.email}</strong>.
                  </p>
                  <motion.button
                    onClick={() => setIsSuccess(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-indigo-600 transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </motion.button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Send an Inquiry or Research Proposal
                    </span>
                  </div>

                  {/* Inquiry Topic Selector Pills */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-display">
                      Topic of Collaboration
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {topics.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setFormState({ ...formState, topic: t })}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            formState.topic === t
                              ? 'bg-slate-900 text-white shadow-xs'
                              : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200/80 hover:border-indigo-300'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-display"
                      >
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="Dr. Alex Morgan"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white/80 focus:bg-white focus:border-indigo-500 focus:ring-3 focus:ring-indigo-100 outline-none text-sm font-medium transition-all text-slate-900"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-display"
                      >
                        Your Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="alex.morgan@university.edu"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white/80 focus:bg-white focus:border-indigo-500 focus:ring-3 focus:ring-indigo-100 outline-none text-sm font-medium transition-all text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-display"
                    >
                      Research Proposal / Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      placeholder="Share details regarding potential joint projects, single-cell analysis, or graduate program openings..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white/80 focus:bg-white focus:border-indigo-500 focus:ring-3 focus:ring-indigo-100 outline-none text-sm font-medium transition-all text-slate-900 resize-none"
                    />
                  </div>

                  {/* Submit Button with Jelly Spring Physics */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-sm font-bold flex items-center justify-center gap-2.5 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-shadow cursor-pointer disabled:opacity-70"
                  >
                    <Send className="w-4 h-4 text-indigo-300" />
                    <span>{isSubmitting ? 'Preparing Transmission...' : 'Transmit Inquiry'}</span>
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
