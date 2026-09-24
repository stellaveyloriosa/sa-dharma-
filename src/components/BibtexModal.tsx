import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode } from 'lucide-react';
import { PUBLICATIONS } from '../data/portfolioData';

interface BibtexModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BibtexModal: React.FC<BibtexModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fullBibtex = PUBLICATIONS.map((p) => p.bibtex).join('\n\n');

  const handleCopyAll = () => {
    navigator.clipboard.writeText(fullBibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadBib = () => {
    const blob = new Blob([fullBibtex], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dharmasastha_karthikeya_publications.bib';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="liquid-glass w-full max-w-2xl rounded-2xl p-6 sm:p-8 relative border border-cyan-500/30 shadow-2xl flex flex-col max-h-[85vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close BibTeX dialog"
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-4">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <FileCode className="w-4 h-4" />
            <span>Academic Citation Library</span>
          </div>
          <h3 className="text-xl font-bold text-white font-display">
            Consolidated BibTeX Records
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Complete citation metadata for papers, book chapters, conference proceedings, preprints, and patents.
          </p>
        </div>

        {/* BibTeX Code Area */}
        <div className="flex-1 overflow-y-auto bg-black/60 rounded-xl p-4 border border-white/10 mb-4 font-mono text-[11px] text-cyan-200/90 whitespace-pre leading-relaxed">
          {fullBibtex}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={handleCopyAll}
            className="px-4 py-2 text-xs font-medium rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 flex items-center gap-2 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy All Entries'}</span>
          </button>
          <button
            onClick={handleDownloadBib}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black flex items-center gap-2 transition-colors shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Download .bib File</span>
          </button>
        </div>
      </div>
    </div>
  );
};
