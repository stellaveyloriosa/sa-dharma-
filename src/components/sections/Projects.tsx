import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Activity,
  Network,
  Brain,
  Dna,
  FlaskConical,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { PORTFOLIO_DATA } from '../../data/portfolio';

interface ProjectsProps {
  isMobile: boolean;
}

const CATEGORY_ACCENT: Record<string, string> = {
  'Biophysical Simulation': 'text-sky-600',
  'Single-Cell Omics': 'text-emerald-600',
  'Deep Learning & GNN': 'text-violet-600',
  'Machine Learning': 'text-indigo-600',
  'Medical Imaging': 'text-pink-600',
};

export const Projects: React.FC<ProjectsProps> = ({ isMobile: _isMobile }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { projects } = PORTFOLIO_DATA;

  const categories = [
    'All',
    'Biophysical Simulation',
    'Single-Cell Omics',
    'Deep Learning & GNN',
    'Machine Learning',
    'Medical Imaging',
  ];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const renderIcon = (iconName: string, accentClass: string) => {
    const iconProps = { className: `w-5 h-5 ${accentClass}`, strokeWidth: 2.2 as const };
    switch (iconName) {
      case 'Activity':
        return <Activity {...iconProps} />;
      case 'Network':
        return <Network {...iconProps} />;
      case 'Brain':
        return <Brain {...iconProps} />;
      case 'Dna':
        return <Dna {...iconProps} />;
      case 'FlaskConical':
        return <FlaskConical {...iconProps} />;
      default:
        return <Code2 {...iconProps} />;
    }
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="liquid-glass section-bg-radial-projects rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        <SectionHeading
          title="Featured Projects"
          subtitle="Open-Source Computational Biology, AI Frameworks & Simulations"
        />

        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                className={`filter-pill px-4 py-2 text-xs font-bold cursor-pointer ${isActive ? 'active' : ''}`}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const accent = CATEGORY_ACCENT[project.category] ?? 'text-violet-600';
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="h-full flex flex-col"
                >
                  <div className="project-card p-5 sm:p-6 flex flex-col justify-between h-full group relative overflow-hidden">
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <span className="project-category-badge font-bold px-3 py-1">
                          {project.category}
                        </span>
                        <div className="project-icon-circle w-11 h-11 shrink-0 group-hover:scale-105 transition-transform duration-300">
                          {renderIcon(project.icon, accent)}
                        </div>
                      </div>

                      <h3 className="text-[17px] sm:text-[18px] font-extrabold text-slate-900 mb-2 leading-snug font-display group-hover:text-violet-600 transition-colors min-h-[48px] flex items-center">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-[12.5px] text-slate-600 font-medium leading-relaxed mb-4 line-clamp-3 min-h-[54px]">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-3.5 border-t border-white/60 mt-auto">
                      <div className="flex flex-wrap gap-1.5 mb-4 min-h-[56px] content-start">
                        {project.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10.5px] font-mono font-semibold text-slate-600 bg-white/70 px-2 py-0.5 rounded-md border border-[rgba(200,190,255,0.4)] backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                        className="btn-view-repo w-full py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>View Repository</span>
                        <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
