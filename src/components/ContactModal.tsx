import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [projectType, setProjectType] = useState("Brand Strategy");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const services = [
    "Brand Strategy",
    "Digital Product Design",
    "Web & App Development",
    "Creative Direction",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const resetForm = () => {
    setEmail("");
    setName("");
    setProjectType("Brand Strategy");
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="contact-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            id="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            id="modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl z-10 p-6 md:p-10"
          >
            {/* Top Close Button */}
            <button
              id="btn-close-modal"
              onClick={onClose}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white cursor-pointer transition-colors"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div>
                <span className="text-xs uppercase tracking-widest text-[#FF5A00] font-mono block mb-2">
                  — Let's Collaborate
                </span>
                <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-6">
                  Start Your Project
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-400 font-mono mb-2">
                      Full Name
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Connor"
                      className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF5A00] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-400 font-mono mb-2">
                      Email Address
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. sarah@example.com"
                      className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF5A00] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-400 font-mono mb-2.5">
                      Service Category
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {services.map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => setProjectType(service)}
                          className={`text-left px-3.5 py-2.5 text-xs rounded-xl border transition-all ${
                            projectType === service
                              ? "bg-[#FF5A00]/10 border-[#FF5A00] text-white font-medium"
                              : "bg-neutral-950 border-neutral-800 text-zinc-400 hover:border-neutral-700 hover:text-white"
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      id="btn-submit-project"
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#FF5A00] hover:bg-[#E04F00] active:scale-98 text-white font-medium text-sm py-4 rounded-xl cursor-pointer transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        "Submit Brief"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-10"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-xl md:text-2xl font-light text-white tracking-tight mb-2">
                  Brief Received!
                </h3>
                <p className="text-sm text-zinc-400 max-w-sm mb-8 leading-relaxed">
                  Thank you, <span className="text-white font-medium">{name}</span>. Our design partners will review your request for <span className="text-white font-medium">{projectType}</span> and follow up within 24 hours.
                </p>
                <button
                  id="btn-dismiss-success"
                  onClick={resetForm}
                  className="px-6 py-2.5 bg-neutral-850 hover:bg-neutral-800 text-sm text-white rounded-xl border border-neutral-800 cursor-pointer transition-colors"
                >
                  Close Window
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
