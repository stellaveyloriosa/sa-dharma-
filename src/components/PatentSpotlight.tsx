import React from 'react';
import { ShieldCheck, Cpu, Eye, Award, ExternalLink, CheckCircle } from 'lucide-react';

export const PatentSpotlight: React.FC = () => {
  return (
    <section className="py-16 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="patent-card p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Column (5 cols): Product Render Frame */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-white/40 bg-black/5 shadow-2xl group">
              <img
                src="/src/assets/images/pocket_bilirubinometer_patent_1790232401449.jpg"
                alt="Pocket Neonatal Bilirubinometer registered patent design"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono drop-shadow-md">
                <span className="text-purple-200 font-semibold">Design No. 6325190</span>
                <span className="text-amber-300 font-semibold">Class: Medical Instruments</span>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Engineering Specifications & Clinical Value */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-purple-700 uppercase tracking-wider font-semibold">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Registered Design Patent · Nov 2023</span>
              <span aria-hidden="true">·</span>
              <span>Indian Patent Office</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 font-display">
              Pocket Neonatal Bilirubinometer
            </h3>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              A handheld, non-invasive optical medical device engineered for instant transcutaneous bilirubin estimation in neonates. Eliminates painful heel-prick blood draws, providing rapid screening for neonatal jaundice in resource-limited primary health centers and neonatal intensive care units (NICUs).
            </p>

            {/* Specifications Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/40 border border-slate-200/60 space-y-1">
                <div className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
                  Optical Principle
                </div>
                <div className="text-xs text-slate-800 font-medium">
                  Dual-wavelength spectrophotometric reflectance (460 nm & 550 nm)
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/40 border border-slate-200/60 space-y-1">
                <div className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
                  Clinical Target
                </div>
                <div className="text-xs text-slate-800 font-medium">
                  Non-invasive hyperbilirubinemia detection & kernicterus prevention
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/40 border border-slate-200/60 space-y-1">
                <div className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
                  Measurement Latency
                </div>
                <div className="text-xs text-purple-700 font-medium font-mono">
                  &lt; 1.5 seconds per site reading
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/40 border border-slate-200/60 space-y-1">
                <div className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
                  Form Factor
                </div>
                <div className="text-xs text-slate-800 font-medium">
                  Ergonomic pocket instrument with low-power microcontroller
                </div>
              </div>
            </div>

            {/* Verification link */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-mono text-slate-600">
              <span className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full text-emerald-700 font-medium shadow-sm">
                <div className="status-dot"></div>
                Granted & Published Design Patent
              </span>
              <a
                href="https://orcid.org/0009-0005-5355-3711"
                target="_blank"
                rel="noreferrer"
                className="text-purple-600 hover:text-purple-800 flex items-center gap-1 font-semibold"
              >
                <span>View on ORCID Record</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
