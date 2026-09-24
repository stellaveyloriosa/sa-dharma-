import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  ExternalLink,
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Bookmark,
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { PORTFOLIO_DATA } from '../../data/portfolio';

interface PublicationsProps {
  isMobile: boolean;
}

type FilterType = 'All' | 'Published' | 'Under Review' | 'Preprint' | 'In Preparation';

const statusStripeClass = (status: string) => {
  switch (status) {
    case 'Published':
      return 'pub-status-Published';
    case 'Under Review':
      return 'pub-status-Under-Review';
    case 'Preprint':
      return 'pub-status-Preprint';
    case 'In Preparation':
      return 'pub-status-In-Preparation';
    case 'Accepted Conf.':
    case 'Accepted Conference':
      return 'pub-status-Accepted-Conf';
    default:
      return 'pub-status-Published';
  }
};

const statusBadgeClass = (status: string) => {
  switch (status) {
    case 'Published':
      return 'pub-badge-Published';
    case 'Under Review':
      return 'pub-badge-Under-Review';
    case 'Preprint':
      return 'pub-badge-Preprint';
    case 'In Preparation':
      return 'pub-badge-In-Preparation';
    case 'Accepted Conf.':
    case 'Accepted Conference':
      return 'pub-badge-Accepted-Conf';
    default:
      return 'pub-badge-Published';
  }
};

export const Publications: React.FC<PublicationsProps> = ({ isMobile: _isMobile }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const { publications, patents } = PORTFOLIO_DATA;

  const filters: FilterType[] = ['All', 'Published', 'Under Review', 'Preprint', 'In Preparation'];

  const filteredPubs =
    activeFilter === 'All'
      ? publications
      : publications.filter((pub) => pub.status === activeFilter);

  return (
    <section id="publications" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="liquid-glass section-bg-radial-pubs rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        <SectionHeading
          title="Publications"
          subtitle="Peer-Reviewed Articles, Conference Proceedings & Preprints"
        />

        <div className="flex flex-wrap items-center gap-2 mb-10">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                className={`filter-pill px-4 py-2 text-xs font-bold cursor-pointer ${isActive ? 'active' : ''}`}
              >
                {filter}
              </motion.button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredPubs.map((pub) => (
              <motion.div
                key={pub.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="h-full flex flex-col"
              >
                <div
                  className={`publication-card ${statusStripeClass(pub.status)} p-6 sm:p-7 flex flex-col justify-between h-full group relative`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <span className="text-xs font-mono font-bold text-slate-600 bg-white/60 px-2.5 py-1 rounded-md border border-[rgba(200,190,255,0.35)] backdrop-blur-sm">
                        {pub.year}
                      </span>
                      <span className={`pub-badge text-xs font-bold ${statusBadgeClass(pub.status)}`}>
                        {pub.status} {pub.note ? `· ${pub.note}` : ''}
                      </span>
                    </div>

                    <h3 className="text-[17.5px] sm:text-[19px] font-extrabold text-slate-900 mb-3 leading-snug font-display group-hover:text-violet-600 transition-colors">
                      {pub.title}
                    </h3>

                    <p className="text-xs sm:text-[12.5px] font-medium text-slate-600 mb-3 leading-relaxed">
                      {pub.authors.split(',').map((auth, aIdx) => {
                        const isSelf =
                          auth.includes('Karthikeya') || auth.includes('Dharmasastha');
                        return (
                          <span
                            key={aIdx}
                            className={
                              isSelf
                                ? 'font-extrabold text-violet-700 bg-violet-50/80 px-1 py-0.5 rounded border border-violet-200/50'
                                : ''
                            }
                          >
                            {auth}
                            {aIdx < pub.authors.split(',').length - 1 ? ', ' : ''}
                          </span>
                        );
                      })}
                    </p>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/60 border border-[rgba(200,190,255,0.35)] text-xs font-semibold text-slate-800 mb-4 backdrop-blur-sm">
                      <div className="w-5 h-5 rounded-full bg-white/70 flex items-center justify-center text-violet-600 shrink-0 border border-white/90">
                        <BookOpen className="w-3.5 h-3.5 text-violet-600" />
                      </div>
                      <span className="font-medium italic">{pub.venue}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/60 flex items-center justify-between mt-auto gap-3 flex-wrap">
                    <span className="peer-reviewed-label font-bold uppercase flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Peer-Reviewed Output</span>
                    </span>
                    <motion.a
                      href="https://scholar.google.com/citations?user=oTUMMkMAAAAJ&hl=en"
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-scholar text-xs font-bold inline-flex items-center gap-1.5 px-3.5 py-1.5 cursor-pointer"
                    >
                      <span>Scholar Citation</span>
                      <ExternalLink className="w-3 h-3" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Patent spotlight — violet–gold hybrid */}
        <div className="pt-10 border-t border-violet-200/40">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-white/65 border border-white/90 flex items-center justify-center shadow-[0_4px_16px_rgba(124,58,237,0.12)] backdrop-blur-md">
              <Award className="w-5 h-5 text-amber-700" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                Patented Medical Inventions & Bio-Devices
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Government of India Granted Design Patent & Medical Instrument Classification
              </p>
            </div>
          </div>

          {patents.map((pat) => (
            <motion.div
              key={pat.id}
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 450, damping: 15 }}
              className="patent-card p-6 sm:p-10 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-violet-200/20 rounded-full blur-3xl pointer-events-none -z-0" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-100/25 rounded-full blur-3xl pointer-events-none -z-0" />

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-violet-200/40 mb-6">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[rgba(237,233,254,0.7)] text-[#7c3aed] text-xs font-extrabold border border-[rgba(167,139,250,0.35)] backdrop-blur-md">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      FEATURED MEDICAL DEVICE PATENT
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/60 text-violet-900 text-xs font-mono font-bold border border-[rgba(167,139,250,0.3)] backdrop-blur-sm">
                      <ShieldCheck className="w-3.5 h-3.5 text-violet-600" />
                      {pat.patentNumber}
                    </span>
                    <span className="text-xs font-semibold text-slate-700 bg-white/70 px-3.5 py-1.5 rounded-full border border-white/80 backdrop-blur-sm">
                      Granted {pat.date}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-violet-700 uppercase tracking-wider bg-[rgba(237,233,254,0.55)] border border-[rgba(167,139,250,0.3)] px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-sm">
                    <Bookmark className="w-3.5 h-3.5 text-amber-600" />
                    {pat.category}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <h4 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-slate-900 tracking-tight leading-tight font-display">
                      {pat.title}
                    </h4>

                    <p className="text-sm sm:text-[15px] text-slate-700 font-medium leading-relaxed">
                      {pat.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {[
                        'Non-Invasive Optical Estimation (Multi-wavelength sensor)',
                        'Eliminates heel-prick trauma & infection risks in newborns',
                        'Low-cost portable design engineered for rural health centers',
                        'Instant transcutaneous reading prevents kernicterus damage',
                      ].map((item) => (
                        <div
                          key={item}
                          className="p-3.5 rounded-2xl bg-white/55 border border-[rgba(167,139,250,0.25)] flex items-start gap-3 backdrop-blur-sm"
                        >
                          <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-[13px] font-bold text-slate-800">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex justify-center">
                    <div className="w-full max-w-xs p-6 rounded-3xl bg-white/65 border border-[rgba(167,139,250,0.3)] backdrop-blur-md shadow-[0_8px_28px_rgba(124,58,237,0.1)] text-center space-y-3 relative overflow-hidden">
                      <div className="w-16 h-16 rounded-full bg-white/70 border border-white/90 mx-auto flex items-center justify-center shadow-[0_4px_16px_rgba(180,83,9,0.15)]">
                        <Award className="w-9 h-9 text-amber-700" strokeWidth={2.2} />
                      </div>
                      <div className="text-[11px] uppercase font-extrabold tracking-widest text-violet-600">
                        Official Grant Status
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="status-dot" aria-hidden />
                        <div className="text-lg font-extrabold text-slate-900 font-display">
                          Granted & Published
                        </div>
                      </div>
                      <div className="text-xs font-mono font-semibold text-slate-500 pt-2 border-t border-violet-100/80">
                        Govt. of India Patent Office
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
