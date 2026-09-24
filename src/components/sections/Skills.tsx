import React from 'react';
import { motion } from 'framer-motion';
import { Dna, Brain, FlaskConical, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

interface SkillsProps {
  isMobile: boolean;
}

export const Skills: React.FC<SkillsProps> = ({ isMobile: _isMobile }) => {
  const domainSkills = [
    {
      id: 'genomics',
      pillar: '01',
      title: 'Computational Biology & Single-Cell Genomics',
      subtitle: 'scRNA-seq, Trajectory Inference & Foundation Models',
      icon: Dna,
      iconColor: 'text-emerald-600',
      skills: [
        'Scanpy',
        'Seurat',
        'scKAN (Kolmogorov-Arnold)',
        'scGPT Foundation Model',
        'PAGA Trajectory Inference',
        'Monocle 3',
        'DESeq2 & Wilcoxon DE',
        'Spatial Transcriptomics',
        'ssGSEA Pathway Scoring',
        'TCGA & GEO Public Pipelines',
        'Bioconductor Ecosystem',
        'Gene Regulatory Networks (GRN)',
      ],
      highlights: [
        'High-dimensional single-cell cell-state mapping',
        'Nonlinear spline-based GRN reconstruction',
      ],
    },
    {
      id: 'ml-ai',
      pillar: '02',
      title: 'Machine Learning & Deep Neural Architectures',
      subtitle: 'Graph ML, Structural Equation Modelling & VAEs',
      icon: Brain,
      iconColor: 'text-violet-600',
      skills: [
        'PyTorch & PyTorch Geometric',
        'Graph Attention Networks (GAT)',
        'GraphSAGE Node Embedding',
        'DeepSEM Structural Modelling',
        'Variational Autoencoders (VAE)',
        'U-Net Medical Segmentation',
        'CNN-LSTM Biomedical Signals',
        'Random Forest Prioritisation',
        'scikit-learn Pipeline',
        'Explainable AI (SHAP/Grad-CAM)',
        'LoRA Fine-tuning',
        'Representation Learning',
      ],
      highlights: [
        'Confidence-weighted disease-gene prediction',
        'Causal gene regulatory structural modelling',
      ],
    },
    {
      id: 'biophysics',
      pillar: '03',
      title: 'Biophysical Simulation & Medical Devices',
      subtitle: 'Molecular Dynamics, Structural Biology & Bio-Sensors',
      icon: FlaskConical,
      iconColor: 'text-sky-600',
      skills: [
        'AlphaFold2 Multimer Scoring',
        'ProteinMPNN De Novo Redesign',
        '150ns GROMACS MD Simulations',
        'ParamRudra HPC Workflows',
        'Agent-Based Cancer Simulation',
        'ODE/PDE Dynamical Systems',
        'UV-Vis Spectrophotometry',
        'Non-Invasive Optical Sensors',
        'Bacterial Culture Kinetics',
        'Bilirubinometer Prototyping',
        'Biomedical Signal Processing',
        'Clinical Workflow Management',
      ],
      highlights: [
        'Rational engineering of archaeal AAA+ ATPase',
        'Patented transcutaneous optical bilirubinometer',
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="liquid-glass section-bg-radial rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        <SectionHeading
          title="Skills & Competencies"
          subtitle="Three Core Pillars of Scientific & Engineering Expertise"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {domainSkills.map((domain, idx) => {
            const Icon = domain.icon;
            return (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="h-full flex flex-col cursor-default"
              >
                <div className="skill-card p-6 sm:p-8 flex flex-col justify-between h-full group relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="skill-icon-container w-14 h-14 group-hover:scale-105 transition-transform duration-300">
                        <Icon className={`w-7 h-7 ${domain.iconColor}`} strokeWidth={2.2} />
                      </div>
                      <span className="skill-pillar-label text-xs font-mono font-extrabold px-3.5 py-1">
                        Pillar {domain.pillar}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-[22px] font-extrabold text-slate-900 mb-2 leading-snug font-display group-hover:text-violet-600 transition-colors">
                      {domain.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mb-6 leading-relaxed">
                      {domain.subtitle}
                    </p>

                    <div className="space-y-2 mb-6 p-4 rounded-2xl bg-white/50 border border-white/70 backdrop-blur-sm shadow-[0_2px_8px_rgba(124,58,237,0.04)]">
                      {domain.highlights.map((hl, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-start gap-2.5 text-xs font-semibold text-slate-800 leading-snug"
                        >
                          <div className="w-4 h-4 rounded-full bg-violet-50/80 text-violet-600 flex items-center justify-center shrink-0 mt-0.5 border border-violet-200/50">
                            <CheckCircle2 className="w-3 h-3" />
                          </div>
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/60 mt-auto">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Core Frameworks & Methodologies
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {domain.skills.map((skill, sIdx) => (
                        <motion.span
                          key={sIdx}
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.95 }}
                          className="skill-tag-pill text-[11.5px] font-mono font-medium text-slate-700 cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
