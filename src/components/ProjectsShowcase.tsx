import React, { useState, useMemo } from 'react';
import { Github, ExternalLink, Search, Code2, Terminal, Filter, ArrowUpRight } from 'lucide-react';
import { PROJECTS, Project } from '../data/portfolioData';

export const ProjectsShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Biophysical Simulation', 'Single-Cell Omics', 'Deep Learning & GNN', 'Medical Imaging'];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((proj) => {
      const matchesCategory = selectedCategory === 'All' || proj.category === selectedCategory;
      const matchesSearch =
        proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.architecture.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-20 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3 tracking-wider uppercase">
          <span>03. Open-Source Codebases</span>
          <span aria-hidden="true">·</span>
          <span>Computational Repositories & In-Silico Pipelines</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display mb-4">
          Software & Research Pipelines
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Production-grade algorithms spanning single-cell VAEs, molecular dynamics HPC scripts, agent-based cancer simulations, and medical image denoising networks.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        {/* Categories (Functional Segmented Buttons) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 text-xs w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`filter-pill px-3 py-1.5 text-xs font-medium ${
                selectedCategory === cat
                  ? 'active'
                  : ''
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search pipelines, models, tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="project-card p-5 flex flex-col justify-between group"
          >
            <div>
              {/* Header metadata */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="project-category-badge px-2.5 py-1">{project.category}</span>
                <div className="project-icon-circle w-8 h-8 flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-purple-600" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-slate-800 font-display mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                {project.description}
              </p>

              {/* Architecture stack */}
              <div className="mb-4 p-2.5 rounded-lg bg-white/40 border border-slate-200/50 text-[11px] font-mono text-slate-600 space-y-1 backdrop-blur-sm">
                <div className="text-[10px] uppercase text-purple-600 flex items-center gap-1.5 font-semibold">
                  <Terminal className="w-3 h-3" />
                  <span>Architecture</span>
                </div>
                <div className="text-slate-700 truncate font-medium">{project.architecture}</div>
              </div>

              {/* Key Results */}
              <div className="space-y-1.5 mb-4">
                {project.keyResults.slice(0, 2).map((res, i) => (
                  <div key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                    <span className="text-purple-500 shrink-0 font-bold">›</span>
                    <span className="line-clamp-1">{res}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom action & tags */}
            <div className="pt-4 border-t border-slate-200/50 flex items-center justify-between mt-auto">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono text-slate-600 bg-white/50 border border-slate-200/50 px-2 py-0.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-view-repo px-3 py-1.5 flex items-center gap-2 text-xs font-medium"
              >
                <span>View Repository</span>
                <Github className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 liquid-glass rounded-2xl">
          <p className="text-slate-400 text-sm">No repositories found matching your query.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-3 text-xs text-cyan-400 underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
