import { motion, AnimatePresence } from "motion/react";
import { X, ArrowUpRight, Github, Linkedin, MessageSquare, Mail } from "lucide-react";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  const menuItems = [
    { title: "Home", num: "01", href: "#home" },
    { title: "Services", num: "02", href: "#services" },
    { title: "Works", num: "03", href: "#works" },
    { title: "About", num: "04", href: "#about" },
    { title: "Contact", num: "05", href: "#contact" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur overlay */}
          <motion.div
            id="menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col md:flex-row justify-between p-6 md:p-16"
          >
            {/* Design accents in background */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Menu Header with close button */}
            <div className="absolute top-6 right-6 md:top-16 md:right-16 z-[60]">
              <motion.button
                id="btn-close-menu"
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full border border-white/20 bg-black/40 flex items-center justify-center text-white cursor-pointer hover:border-white/50 transition-colors"
                type="button"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Left side: Navigation Items */}
            <div className="flex flex-col justify-center h-full pt-16 md:pt-0 max-w-xl">
              <span className="text-xs uppercase tracking-widest text-[#FF5A00] font-medium mb-6 block font-mono">
                — Navigation
              </span>
              <nav className="flex flex-col gap-4">
                {menuItems.map((item, index) => (
                  <motion.div
                    id={`menu-item-container-${index}`}
                    key={item.title}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                    className="group"
                  >
                    <a
                      id={`menu-item-link-${index}`}
                      href={item.href}
                      onClick={() => {
                        onClose();
                        const el = document.getElementById(item.href.replace("#", ""));
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="inline-flex items-baseline gap-4 hover:pl-4 transition-all duration-300 group"
                    >
                      <span className="text-sm font-mono text-zinc-600 group-hover:text-[#FF5A00] transition-colors">
                        {item.num}
                      </span>
                      <span className="text-4xl md:text-6xl font-light tracking-tight text-white group-hover:text-neutral-300 transition-colors">
                        {item.title}
                      </span>
                      <ArrowUpRight className="w-5 h-5 text-neutral-600 opacity-0 group-hover:opacity-100 group-hover:text-white transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Right side: Studio Info & Location */}
            <div className="flex flex-col justify-end h-full pt-8 md:pt-0 pb-4 max-w-sm border-t border-zinc-900 md:border-none">
              <div className="space-y-6 md:space-y-8">
                <div>
                  <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono block mb-2">
                    Our HQ
                  </span>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    650 California Street, Floor 14<br />
                    San Francisco, CA 94108<br />
                    United States
                  </p>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono block mb-2">
                    Inquiries
                  </span>
                  <a
                    id="menu-email-link"
                    href="mailto:hello@orbitly.design"
                    className="text-base text-white hover:text-[#FF5A00] transition-colors"
                  >
                    hello@orbitly.design
                  </a>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono block mb-3">
                    Connect
                  </span>
                  <div className="flex gap-4">
                    <a
                      id="social-github"
                      href="#"
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      id="social-linkedin"
                      href="#"
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      id="social-mail"
                      href="#"
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
