import React, { useState } from 'react';
import { X, Mail, Phone, Copy, Check, ExternalLink, Send } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(text);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${PERSONAL_INFO.emails[0]}?subject=${encodeURIComponent(
      subject || 'Research Collaboration Inquiry'
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="liquid-glass w-full max-w-lg rounded-2xl p-6 sm:p-8 relative border border-cyan-500/30 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close contact dialog"
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-6">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
            Communication & Collaboration
          </div>
          <h3 className="text-2xl font-bold text-white font-display">
            Contact Dharmasastha
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Open to computational oncology inquiries, doctoral research opportunities, and academic collaborations.
          </p>
        </div>

        {/* Direct Contacts List */}
        <div className="space-y-2.5 mb-6 text-xs font-mono">
          {PERSONAL_INFO.emails.map((email) => (
            <div
              key={email}
              className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-slate-300"
            >
              <div className="flex items-center gap-2 truncate">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="truncate">{email}</span>
              </div>
              <button
                onClick={() => handleCopy(email)}
                className="text-xs text-slate-400 hover:text-white transition-colors ml-2"
              >
                {copiedEmail === email ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Copied
                  </span>
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          ))}

          <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-slate-300">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{PERSONAL_INFO.phone}</span>
            </div>
            <button
              onClick={() => handleCopy(PERSONAL_INFO.phone)}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              {copiedEmail === PERSONAL_INFO.phone ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Copied
                </span>
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Direct Email Draft Form */}
        <form onSubmit={handleSendMail} className="space-y-3">
          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
              Subject
            </label>
            <input
              type="text"
              placeholder="e.g. Research Collaboration / Single-Cell Project"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
              Message
            </label>
            <textarea
              rows={3}
              placeholder="Write your research query or opportunity details..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md font-sans"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Open Email Client</span>
          </button>
        </form>
      </div>
    </div>
  );
};
