import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Download,
  GraduationCap,
  FileCheck,
  Github,
  Linkedin,
  BookOpen,
  Award,
  Mail,
} from 'lucide-react';
import StrokeText from '../ui/StrokeText';
import RippleDistortion from '../ui/RippleDistortion';
import GlassSurface from '../ui/GlassSurface';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { ASSETS } from '../../data/assets';


interface HeroProps {
  isMobile: boolean;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ isMobile, onExploreClick }) => {
  const { personal } = PORTFOLIO_DATA;


  return (
    <section
      id="hero"
      className="relative min-h-screen pb-16 max-w-7xl mx-auto flex flex-col justify-between overflow-hidden"
    >
      {/* Background Soft Blobs */}
      <div className="absolute top-10 left-[-8%] w-[550px] h-[550px] bg-gradient-to-tr from-blue-100/40 via-indigo-50/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-[-5%] w-[650px] h-[650px] bg-gradient-to-bl from-purple-100/40 via-blue-50/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* ── MOBILE LAYOUT: Portrait on top, text below ── (hidden on lg+) */}
      <div className="lg:hidden flex flex-col">
        {/* Portrait — full width, no card frame, floats at top */}
        <div className="relative w-full flex justify-center items-end pt-24 pb-4 px-4">
          <div className="relative w-[82vw] max-w-[340px] aspect-square">
            <RippleDistortion
              src={ASSETS.realPhoto}
              brushSize={140}
              strength={0.06}
              swirl={0.4}
              rings={2.5}
              spread={3.2}
              fade={3.0}
              spacing={18}
              dispersion={0.01}
              glint={0.12}
              tint="#6366f1"
              tintAmount={0.06}
              highlightColor="#ffffff"
              grayscale={false}
              trigger="both"
              clickStrength={1.0}
              quality="medium"
              enabled
              className="w-full h-full object-cover object-top rounded-3xl"
            />
          </div>
        </div>

        {/* Text content below portrait */}
        <div className="px-5 pb-8 space-y-4">
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            {/* Compact pill badge — wraps cleanly on small screens */}
            <div
              className="mobile-hero-badge inline-flex items-start gap-2 px-3.5 py-2 rounded-2xl text-[11.5px] font-medium text-slate-600"
              style={{
                background: 'rgba(255,255,255,0.72)',
                border: '1px solid rgba(167,139,250,0.3)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
                maxWidth: '100%',
              }}
            >
              <span
                className="mt-[3px] shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600"
                style={{ boxShadow: '0 0 6px rgba(147,51,234,0.55)' }}
              />
              <span className="leading-snug">
                Biomedical Engineering{' '}
                <span className="text-purple-400 mx-0.5">×</span> AI{' '}
                <span className="text-purple-400 mx-0.5">×</span>{' '}
                Healthcare Innovation
              </span>
            </div>
          </motion.div>


          {/* Name — large, bold, stacked */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-0"
          >
            <StrokeText
              text="SA DHARMASASTHA"
              strokeColor="#6366F1"
              fillColor="#0A0A0A"
              strokeWidth={2.0}
              drawDuration={1.3}
              fillDelay={0.15}
              stagger={0.03}
              ease="power2.out"
              trigger="mount"
              fillMode="wipe"
              fontSize={40}
              fontWeight={800}
              letterSpacing={-1.5}
              fontFamily="'Sora', 'Plus Jakarta Sans', sans-serif"
            />
            <StrokeText
              text="KARTHIKEYA"
              strokeColor="#9333EA"
              fillColor="#4F46E5"
              strokeWidth={2.0}
              drawDuration={1.4}
              fillDelay={0.25}
              stagger={0.04}
              ease="power2.out"
              trigger="mount"
              fillMode="wipe"
              fontSize={40}
              fontWeight={800}
              letterSpacing={-1.5}
              fontFamily="'Sora', 'Plus Jakarta Sans', sans-serif"
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[13px] font-sans font-semibold tracking-wide text-slate-600"
          >
            Biomedical Engineer <span className="mx-1.5 text-indigo-500 font-bold">·</span> Computational Researcher <span className="mx-1.5 text-indigo-500 font-bold">·</span> Single-Cell Biology
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-[13.5px] font-sans font-normal text-slate-500 leading-relaxed"
          >
            Exploring the intersection of biomedical engineering, artificial intelligence,
            and data-driven healthcare to build impactful solutions for a healthier tomorrow.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 pt-1"
          >
            <motion.button
              onClick={onExploreClick}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-[13px] font-bold flex items-center gap-2 shadow-[0_8px_20px_-5px_rgba(15,23,42,0.35)] cursor-pointer"
            >
              <span>View My Work</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-300" />
            </motion.button>
            <motion.a
              href="https://drive.google.com"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              className="px-5 py-2.5 rounded-full bg-white/90 border border-slate-200 text-slate-900 text-[13px] font-bold flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-700" />
              <span>Download Resume</span>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT: Side-by-side grid ── (hidden on mobile) */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-center my-auto px-8 xl:px-12 pt-32 pb-4">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6 pt-4">
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >

            <GlassSurface
              width="auto"
              height={38}
              borderRadius={19}
              backgroundOpacity={0.65}
              distortionScale={-80}
              displace={2}
              className="border border-purple-200/80 shadow-xs px-3.5"
              contentClassName="flex items-center gap-2 p-0 text-[11.5px] sm:text-[12.5px] text-slate-700"
            >
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-[0_0_8px_rgba(147,51,234,0.6)]" />
              <span className="font-medium text-slate-600 whitespace-nowrap">
                Biomedical Engineering <span className="text-purple-400 mx-1">×</span> AI <span className="text-purple-400 mx-1">×</span> Healthcare Innovation
              </span>
            </GlassSurface>
          </motion.div>

          {/* Main Title Heading: Animated SVG StrokeText with beautiful colors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-1"
          >
            <div className="w-full max-w-xl">
              <StrokeText
                text="SA DHARMASASTHA"
                strokeColor="#6366F1"
                fillColor="#0A0A0A"
                strokeWidth={2.0}
                drawDuration={1.3}
                fillDelay={0.15}
                stagger={0.035}
                ease="power2.out"
                trigger="mount"
                fillMode="wipe"
                fontSize={isMobile ? 46 : 68}
                fontWeight={800}
                letterSpacing={-2.0}
                fontFamily="'Sora', 'Plus Jakarta Sans', sans-serif"
              />
            </div>
            <div className="w-full max-w-xl -mt-1 sm:-mt-2">
              <StrokeText
                text="KARTHIKEYA"
                strokeColor="#9333EA"
                fillColor="#4F46E5"
                strokeWidth={2.0}
                drawDuration={1.4}
                fillDelay={0.25}
                stagger={0.04}
                ease="power2.out"
                trigger="mount"
                fillMode="wipe"
                fontSize={isMobile ? 46 : 68}
                fontWeight={800}
                letterSpacing={-2.0}
                fontFamily="'Sora', 'Plus Jakarta Sans', sans-serif"
              />
            </div>
          </motion.div>

          {/* Subtitle with dot separators */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[14px] sm:text-[15.5px] font-sans font-semibold tracking-wide text-slate-700"
          >
            Biomedical Engineer <span className="mx-2 text-indigo-500 font-bold">·</span> Computational Researcher <span className="mx-2 text-indigo-500 font-bold">·</span> Single-Cell Biology
          </motion.p>

          {/* Intro Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-[14.5px] sm:text-[15.5px] font-sans font-normal text-slate-600 leading-relaxed max-w-xl"
          >
            Exploring the intersection of biomedical engineering, artificial intelligence,
            and data-driven healthcare to build impactful solutions for a healthier tomorrow.
          </motion.p>

          {/* Action Buttons: View My Work -> & Download Resume */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3.5 pt-2"
          >
            <motion.button
              onClick={onExploreClick}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-[13.5px] font-bold flex items-center gap-2.5 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.35)] cursor-pointer"
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4 text-indigo-300" />
            </motion.button>

            <motion.a
              href="https://drive.google.com"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              className="px-6 py-3 rounded-full bg-white/90 hover:bg-white border border-slate-200 text-slate-900 text-[13.5px] font-bold flex items-center gap-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-700" />
              <span>Download Resume</span>
            </motion.a>
          </motion.div>

          {/* Academic & Innovation Highlight Badges — hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="hidden sm:grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3"
          >

            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 450, damping: 14 }}
              className="edge-glow-card rounded-[22px] p-3.5 flex items-center gap-3 cursor-default"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500/20 via-sky-500/10 to-indigo-500/10 border border-blue-200/90 flex items-center justify-center text-blue-600 shadow-[0_2px_10px_rgba(59,130,246,0.2)] shrink-0">
                <GraduationCap className="w-5 h-5 text-blue-600" strokeWidth={2.2} />
              </div>
              <div className="min-w-0">
                <div className="text-[12.5px] font-extrabold text-slate-900 font-display truncate">
                  B.Tech Biomedical
                </div>
                <div className="text-[11px] text-slate-500 font-medium truncate">
                  Vignan University
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 450, damping: 14 }}
              className="edge-glow-card rounded-[22px] p-3.5 flex items-center gap-3 cursor-default"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500/20 via-indigo-500/10 to-pink-500/10 border border-purple-200/90 flex items-center justify-center text-purple-600 shadow-[0_2px_10px_rgba(168,85,247,0.2)] shrink-0">
                <FileCheck className="w-5 h-5 text-purple-600" strokeWidth={2.2} />
              </div>
              <div className="min-w-0">
                <div className="text-[12.5px] font-extrabold text-slate-900 font-display truncate">
                  IEEE Published
                </div>
                <div className="text-[11px] text-purple-700/80 font-medium truncate">
                  BioXplore & AIP Conf
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 450, damping: 14 }}
              className="edge-glow-card rounded-[22px] p-3.5 flex items-center gap-3 cursor-default"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500/25 via-yellow-500/15 to-orange-500/10 border border-amber-300/90 flex items-center justify-center text-amber-600 shadow-[0_2px_10px_rgba(245,158,11,0.25)] shrink-0">
                <Award className="w-5 h-5 text-amber-600" strokeWidth={2.2} />
              </div>
              <div className="min-w-0">
                <div className="text-[12.5px] font-extrabold text-slate-900 font-display truncate">
                  Patent Granted
                </div>
                <div className="text-[11px] text-amber-700/90 font-medium truncate">
                  Design #6325190
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Social Icons Row — hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden sm:flex items-center gap-3 pt-2"
          >

            {[
              { href: personal.socialLinks.github, icon: Github, label: 'GitHub' },
              { href: personal.socialLinks.linkedin, icon: Linkedin, label: 'LinkedIn' },
              { href: personal.socialLinks.scholar, icon: BookOpen, label: 'Scholar' },
              { href: personal.socialLinks.orcid, icon: Award, label: 'ORCID' },
              { href: `mailto:${personal.socialLinks.email}`, icon: Mail, label: 'Email' },
            ].map((soc, idx) => (
              <motion.a
                key={idx}
                href={soc.href}
                target={soc.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={soc.label}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-2xl bg-white/95 border border-white/95 flex items-center justify-center text-slate-700 hover:text-indigo-600 hover:border-indigo-300 shadow-[0_2px_8px_rgba(15,23,42,0.06)] hover:shadow-[0_4px_16px_rgba(99,102,241,0.2)] transition-all cursor-pointer"
              >
                <soc.icon className="w-4 h-4" strokeWidth={2} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Portrait — visible on all screen sizes */}
        <div className="col-span-1 lg:col-span-5 relative flex justify-center items-center">
          <div className="relative w-full max-w-[480px] aspect-[4/5] flex items-center justify-center">
            {/* Background Circular Aura — hidden on mobile to keep it clean */}
            <div className="absolute inset-0 hidden sm:flex items-center justify-center pointer-events-none">
              <div className="w-[320px] sm:w-[380px] h-[320px] sm:h-[380px] rounded-full border border-purple-200/50 bg-gradient-to-b from-purple-50/40 via-blue-50/20 to-transparent relative" />
              {/* Floating tag — desktop only */}
              <div className="absolute top-4 left-6 sm:left-2 text-indigo-600/80 font-mono text-xs sm:text-sm font-bold tracking-wider select-none pointer-events-none rotate-[-6deg] bg-white/70 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-indigo-100 shadow-2xs">
                <span>// Build · Learn · Innovate</span>
              </div>
            </div>

            {/* Portrait — real photo with RippleDistortion */}
            <div className="relative z-10 w-[130px] sm:w-[270px] lg:w-[330px] h-[130px] sm:h-[270px] lg:h-[330px] rounded-[24px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden shadow-[0_20px_50px_-10px_rgba(99,102,241,0.25)] border-2 border-white/95 bg-white/60 backdrop-blur-md cursor-pointer group">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent pointer-events-none z-10" />
              <RippleDistortion
                src={ASSETS.realPhoto}
                brushSize={140}
                strength={0.06}
                swirl={0.4}
                rings={2.5}
                spread={3.2}
                fade={3.0}
                spacing={18}
                dispersion={0.01}
                glint={0.12}
                tint="#6366f1"
                tintAmount={0.08}
                highlightColor="#ffffff"
                grayscale={false}
                trigger="both"
                clickStrength={1.0}
                quality="medium"
                enabled
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Floating Glass Card 1: Top-Right - "AI for Healthcare" — desktop only */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -top-2 -right-2 sm:right-2 z-20 cursor-pointer group hidden sm:block"
            >
              <GlassSurface
                width={144}
                height={132}
                borderRadius={20}
                backgroundOpacity={0.7}
                distortionScale={-140}
                displace={4}
                className="border border-white/90 shadow-lg"
                contentClassName="p-3 flex flex-col items-center text-center w-full h-full"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden mb-1.5 shadow-xs bg-indigo-50/50 flex items-center justify-center">
                  <RippleDistortion
                    src={ASSETS.brain}
                    brushSize={60}
                    strength={0.22}
                    swirl={0.5}
                    rings={3}
                    spread={4}
                    fade={2.2}
                    tint="#6366f1"
                    tintAmount={0.15}
                    trigger="both"
                    quality="low"
                    className="w-full h-full"
                  />
                </div>
                <span className="text-[11px] font-semibold text-slate-800 leading-tight">
                  AI for<br />Healthcare
                </span>
                <div className="mt-1 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <div className="w-3 h-1 rounded-full bg-indigo-200" />
                  <div className="w-4 h-1 rounded-full bg-purple-200" />
                </div>
              </GlassSurface>
            </motion.div>

            {/* Floating Glass Card 2: Mid-Left - "Single-Cell Biology" — desktop only */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute bottom-16 -left-3 sm:-left-6 z-20 cursor-pointer group hidden sm:block"
            >
              <GlassSurface
                width={176}
                height={84}
                borderRadius={20}
                backgroundOpacity={0.7}
                distortionScale={-140}
                displace={4}
                className="border border-white/90 shadow-lg"
                contentClassName="p-3.5 flex items-center gap-3 w-full h-full"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden shadow-xs bg-blue-50/50 flex items-center justify-center shrink-0">
                  <RippleDistortion
                    src={ASSETS.dna}
                    brushSize={60}
                    strength={0.22}
                    swirl={0.5}
                    rings={3}
                    spread={4}
                    fade={2.2}
                    tint="#3b82f6"
                    tintAmount={0.15}
                    trigger="both"
                    quality="low"
                    className="w-full h-full"
                  />
                </div>
                <div className="min-w-0 text-left">
                  <div className="text-[12px] font-semibold text-slate-800 leading-tight">
                    Single-Cell<br />Biology
                  </div>
                  <div className="mt-1 flex items-end gap-0.5 h-3">
                    <div className="w-1 h-1.5 bg-blue-400 rounded-xs" />
                    <div className="w-1 h-3 bg-indigo-500 rounded-xs" />
                    <div className="w-1 h-2 bg-purple-400 rounded-xs" />
                    <div className="w-1 h-2.5 bg-pink-400 rounded-xs" />
                  </div>
                </div>
              </GlassSurface>
            </motion.div>

            {/* Floating Glass Card 3: Bottom-Right - "Medical Innovation" — desktop only */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-4 -right-2 sm:right-0 z-20 cursor-pointer group hidden sm:block"
            >
              <GlassSurface
                width={176}
                height={84}
                borderRadius={20}
                backgroundOpacity={0.7}
                distortionScale={-140}
                displace={4}
                className="border border-white/90 shadow-lg"
                contentClassName="p-3.5 flex items-center gap-3 w-full h-full"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden shadow-xs bg-purple-50/50 flex items-center justify-center shrink-0">
                  <RippleDistortion
                    src={ASSETS.lungs}
                    brushSize={60}
                    strength={0.22}
                    swirl={0.5}
                    rings={3}
                    spread={4}
                    fade={2.2}
                    tint="#a855f7"
                    tintAmount={0.15}
                    trigger="both"
                    quality="low"
                    className="w-full h-full"
                  />
                </div>
                <div className="min-w-0 text-left">
                  <div className="text-[12px] font-semibold text-slate-800 leading-tight">
                    Medical<br />Innovation
                  </div>
                  <div className="text-[10px] text-slate-400 font-light mt-0.5">
                    Bio-Devices
                  </div>
                </div>
              </GlassSurface>
            </motion.div>
          </div>
        </div>
      </div>


    </section>

  );
};
