import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  ChevronRight, 
  Globe, 
  Sparkles, 
  Check, 
  Send, 
  Layers, 
  Maximize2, 
  Compass, 
  Activity, 
  Smartphone, 
  Eye, 
  Clock, 
  MessageSquare,
  Flame,
  Award,
  Zap,
  CheckCircle2
} from "lucide-react";

import FullscreenMenu from "./components/FullscreenMenu";
import ContactModal from "./components/ContactModal";
import ClockWidget from "./components/ClockWidget";
import { SERVICES_DATA, PROJECTS_DATA, PARTNERS_DATA, Project } from "./data";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [logoSpeed, setLogoSpeed] = useState(1); // Click to shift speeds: 1 -> 4 -> 0.25

  // Active service slide indicator
  const [activeServiceId, setActiveServiceId] = useState("brand-strategy");

  // State for interactive project widgets
  const [aetherMetric, setAetherMetric] = useState(78); // Interactive slider value
  const [vesperCoords, setVesperCoords] = useState({ x: 45, y: -20, z: 124 }); // Hover coordinates
  const [novaTheme, setNovaTheme] = useState<"slate" | "sunset" | "lime">("slate"); // Mock theme selector

  // About stats clicker state (makes stats interactive!)
  const [brandStat, setBrandStat] = useState(54);
  const [awardStat, setAwardStat] = useState(16);
  const [retentionStat, setRetentionStat] = useState(99);

  // Direct contact message form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Digital Product Design",
    budget: "$25k - $50k",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Clicked partner logo focus state
  const [selectedPartnerIndex, setSelectedPartnerIndex] = useState<number | null>(null);

  // Ref for local interactivity
  const vesperRef = useRef<HTMLDivElement>(null);

  // Ref for background video playback stability
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play/silent initialization on mount to ensure Safari and Chrome mobile webviews play successfully
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      videoRef.current.play().catch((err) => {
        console.warn("Background video autoplay deferred or blocked by browser:", err);
      });
    }
  }, []);

  // Smooth scroll logic for standard anchors and header height offset
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.hash && anchor.hash.startsWith("#")) {
        e.preventDefault();
        const id = anchor.hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          const header = document.getElementById("site-header");
          const offset = header ? header.offsetHeight : 80;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: "smooth"
          });
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  // Tracking cursor on Vesper Spatial card for coordinates simulation
  const handleVesperMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!vesperRef.current) return;
    const rect = vesperRef.current.getBoundingClientRect();
    const xRelative = Math.round(((e.clientX - rect.left) / rect.width) * 200 - 100);
    const yRelative = Math.round(((e.clientY - rect.top) / rect.height) * 200 - 100);
    const calculatedZ = Math.abs(xRelative * 2 + yRelative * 3);
    setVesperCoords({ x: xRelative, y: yRelative, z: calculatedZ });
  };

  // Pre-fill service scope from Service Card CTA and scroll to form
  const handleServiceSelect = (serviceTitle: string) => {
    setFormData(prev => ({ ...prev, service: serviceTitle }));
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Direct contact form submit mock
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormLoading(true);

    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
    }, 1000);
  };

  const resetDirectForm = () => {
    setFormData({
      name: "",
      email: "",
      service: "Digital Product Design",
      budget: "$25k - $50k",
      message: ""
    });
    setFormSubmitted(false);
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-[#FF5A00] selection:text-white bg-transparent">
      
      {/* 
        OPTIMIZED PERFORMANCE: FIXED BACKGROUND VIDEO 
        Using simple hardware-accelerated overlay and avoiding heavy backdrop blur filters 
        on scrolling containers, which eliminates scroll jitter and lag in all web browsers!
      */}
      <div className="fixed inset-0 w-full h-full overflow-hidden -z-20 select-none pointer-events-none">
        <video
          ref={videoRef}
          id="hero-background-video"
          src="https://res.cloudinary.com/djhbhzx5o/video/upload/v1780745304/kling_20260606_Image_to_Video__4906_0_ubeejq.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.55)" }}
        />
        {/* Soft atmospheric dim overlay for impeccable legibility */}
        <div className="absolute inset-0 bg-black/55 mix-blend-multiply pointer-events-none" />
      </div>

      {/* 
        Hardware-accelerated ambient glowing gradients. 
        Using pure radial-gradients which perform instantly on GPU without costly CSS blur recalculations.
      */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10" 
        style={{
          background: "radial-gradient(circle at 80% 25%, rgba(255, 90, 0, 0.08) 0%, rgba(0,0,0,0) 65%), radial-gradient(circle at 15% 85%, rgba(255, 117, 71, 0.03) 0%, rgba(0,0,0,0) 55%)"
        }} 
      />

      {/* STICKY GLASSMORPHIC HEADER */}
      <header 
        id="site-header" 
        className="sticky top-0 bg-black/60 backdrop-blur-md border-b border-white/5 z-40 w-full px-6 py-4 md:px-12 md:py-5 flex items-center justify-between transition-all"
      >
        {/* Left: Interactive Navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-mono text-neutral-400">
          <a id="nav-home" href="#home" className="hover:text-[#FF5A00] transition-colors duration-200">
            Home
          </a>
          <a id="nav-services" href="#services" className="hover:text-[#FF5A00] transition-colors duration-200">
            Services
          </a>
          <a id="nav-works" href="#works" className="hover:text-[#FF5A00] transition-colors duration-200">
            Works
          </a>
          <a id="nav-about" href="#about" className="hover:text-[#FF5A00] transition-colors duration-200">
            About
          </a>
          <a id="nav-contact" href="#contact" className="hover:text-[#FF5A00] transition-colors duration-200">
            Contact
          </a>
        </nav>
        
        {/* Mobile brand indicator */}
        <div className="lg:hidden flex items-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#FF5A00] font-mono">
            Orbitly
          </span>
        </div>

        {/* Center: Interactive rotating core Orbitly clockwork logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-40">
          <button
            id="center-star-logo"
            onClick={() => setLogoSpeed((prev) => (prev === 1 ? 4 : prev === 4 ? 0.25 : 1))}
            onMouseEnter={() => setLogoSpeed(3)}
            onMouseLeave={() => setLogoSpeed(1)}
            title="Orbitly Core - Click to shift speeds (Normal / Turbo / Cosmic)"
            className="focus:outline-none cursor-pointer flex flex-col items-center justify-center p-2 group"
          >
            <div className="relative">
              <svg
                viewBox="0 0 100 100"
                style={{
                  animationDuration: `${20 / logoSpeed}s`,
                }}
                className="w-10 h-10 select-none animate-[spin_20s_linear_infinite]"
              >
                {[...Array(16)].map((_, i) => (
                  <rect
                    key={i}
                    x="47"
                    y="10"
                    width="6"
                    height="20"
                    transform={`rotate(${i * 22.5} 50 50)`}
                    rx="1.5"
                    className="fill-white group-hover:fill-[#FF5A00] transition-colors duration-300"
                  />
                ))}
              </svg>
              {/* Inner core circle */}
              <div className="absolute inset-0 m-auto w-2 h-2 bg-[#FF5A00] rounded-full shadow-[0_0_8px_#FF5A00]" />
            </div>
          </button>
        </div>

        {/* Right: Social & Navigation Trigger button */}
        <div className="flex items-center gap-3">
          
          {/* Social Channels with customized hover states */}
          <div className="hidden sm:flex items-center gap-2">
            
            {/* X */}
            <a
              id="header-social-x"
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Join our Space on X"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-xs font-mono text-neutral-300 hover:text-white hover:border-[#FF5A00] hover:bg-[#FF5A00]/10 transition-all cursor-pointer"
            >
              X
            </a>

            {/* Behance */}
            <a
              id="header-social-behance"
              href="https://behance.net"
              target="_blank"
              rel="noopener noreferrer"
              title="Explore Portfolios on Behance"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-xs font-serif font-bold text-neutral-300 hover:text-white hover:border-[#FF5A00] hover:bg-[#FF5A00]/10 transition-all cursor-pointer"
            >
              Bē
            </a>

            {/* Orbitly Website Globe */}
            <a
              id="header-social-globe"
              href="#home"
              title="Orbitly Space Hub"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white hover:border-[#FF5A00] hover:bg-[#FF5A00]/10 transition-all cursor-pointer"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>

          {/* Fully Functional Drawer Trigger Menu button */}
          <button
            id="header-menu-button"
            onClick={() => setMenuOpen(true)}
            className="h-10 px-5 rounded-full border border-white/10 hover:border-[#FF5A00]/50 bg-neutral-950/40 backdrop-blur-sm hover:bg-neutral-900 flex items-center gap-3 text-sm font-light text-neutral-200 transition-all cursor-pointer group"
          >
            <span className="group-hover:text-white">Menu</span>
            
            {/* Beautiful custom responsive layout grid representation */}
            <div className="grid grid-cols-2 gap-0.5 w-3 h-3 group-hover:rotate-90 transition-transform duration-300">
              <div className="w-[4px] h-[4px] bg-white rounded-full group-hover:bg-[#FF5A00] transition-colors"></div>
              <div className="w-[4px] h-[4px] bg-neutral-400 rounded-full"></div>
              <div className="w-[4px] h-[4px] bg-neutral-400 rounded-full"></div>
              <div className="w-[4px] h-[4px] bg-[#FF5A00] rounded-full group-hover:bg-white transition-colors"></div>
            </div>
          </button>
        </div>
      </header>

      {/* CORE HERO SECTION */}
      <section id="home" className="min-h-[90vh] flex items-center px-6 md:px-16 lg:px-24 py-16 md:py-24">
        <div className="max-w-5xl w-full">
          
          {/* Subtle Label with horizontal timeline line */}
          <div className="flex items-center gap-3 text-neutral-300 mb-6">
            <div className="h-[1px] w-8 bg-[#FF5A00]" />
            <span className="text-xs uppercase tracking-widest font-mono text-[#FF5A00] font-semibold">
              Orbitly Design Agency
            </span>
          </div>

          {/* Celestial giant agency title typography */}
          <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-light tracking-tighter leading-[0.95] text-white">
            <span className="block mb-2 md:mb-4">Building</span>
            <span className="block mb-2 md:mb-4 bg-gradient-to-r from-white via-[#FFC533] to-[#FF5A00] bg-clip-text text-transparent font-medium">
              brands that
            </span>
            <span className="block">stand out</span>
          </h1>

          {/* Agency Intro Manifesto */}
          <p className="mt-8 md:mt-10 max-w-xl text-sm md:text-base text-neutral-300 leading-relaxed font-light">
            Based in San Francisco & Zurich, we are a digital products design & development studio passionate about creating high applicability, luxury-tier digital experiences that redefine user metrics.
          </p>

          {/* Interactive CTAs */}
          <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-4">
            
            {/* Primary Orange Brief Launch button */}
            <button
              id="cta-start-now"
              onClick={() => setModalOpen(true)}
              className="px-8 py-4 rounded-full bg-[#FF5A00] hover:bg-[#E34E00] active:scale-95 text-white text-sm font-semibold tracking-wide transition-all shadow-lg hover:shadow-[#FF5A00]/33 cursor-pointer flex items-center gap-2 group"
            >
              <span>Start Now</span>
              <Sparkles className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Outlined secondary learning jump button */}
            <a
              id="cta-learn-more"
              href="#services"
              className="px-7 py-4 rounded-full border border-white/10 hover:border-white/30 bg-neutral-900/20 backdrop-blur-sm text-neutral-200 hover:text-white text-sm font-medium flex items-center gap-1.5 transition-all cursor-pointer group"
            >
              <span>Our Services</span>
              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

        </div>
      </section>

      {/* 2. SERVICES INTERACTIVE PAGE */}
      <section id="services" className="py-24 md:py-32 border-t border-white/5 bg-black/60 relative z-10 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#FF5A00] font-mono block mb-2 font-semibold">
                — Our Capabilities
              </span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white">
                Core design expertise for <br />
                the next digital horizon
              </h2>
            </div>
            <p className="text-neutral-400 text-sm max-w-sm leading-relaxed font-light">
              We focus on premium execution. Select any capability card to explore deliverables and instantly populate your custom project brief.
            </p>
          </div>

          {/* Grid layout of interactively toggleable service blocks */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {SERVICES_DATA.map((service) => {
              const isActive = activeServiceId === service.id;
              return (
                <div
                  id={`service-card-${service.id}`}
                  key={service.id}
                  onClick={() => setActiveServiceId(service.id)}
                  className={`p-8 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isActive 
                      ? "bg-neutral-900/95 border-[#FF5A00] shadow-xl shadow-[#FF5A00]/5 min-h-[360px]" 
                      : "bg-neutral-950/40 border-white/5 hover:border-white/20 min-h-[320px] hover:translate-y-[-4px]"
                  }`}
                >
                  <div>
                    {/* Index header */}
                    <div className="flex items-center justify-between mb-8">
                      <span className="font-mono text-xs font-semibold text-[#FF5A00]">
                        {service.num}
                      </span>
                      <div className={`w-2 h-2 rounded-full ${isActive ? "bg-[#FF5A00] animate-ping" : "bg-neutral-800"}`} />
                    </div>

                    <h3 className="text-xl font-medium text-white mb-3">
                      {service.title}
                    </h3>

                    <p className={`text-xs leading-relaxed transition-all ${
                      isActive ? "text-neutral-300" : "text-neutral-400 line-clamp-3"
                    }`}>
                      {service.headline}
                    </p>

                    {/* Deliverable bullets exposed if card is active */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-6 space-y-2 overflow-hidden"
                        >
                          <span className="text-[10px] uppercase tracking-widest text-[#FF5A00] font-mono block mb-2 font-semibold">
                            What you get:
                          </span>
                          {service.deliverables.map((del, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                              <Check className="w-3.5 h-3.5 text-[#FF5A00] shrink-0" />
                              <span>{del}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="pt-6">
                    <button
                      id={`btn-select-service-${service.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleServiceSelect(service.title);
                      }}
                      className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isActive
                          ? "bg-[#FF5A00] hover:bg-[#E34E00] text-white"
                          : "bg-neutral-900 hover:bg-neutral-850 text-neutral-300 hover:text-white border border-white/5"
                      }`}
                    >
                      <span>Partner in {service.num}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. WORKS PORTFOLIO SHOWCASE (Interactive Prototypes) */}
      <section id="works" className="py-24 md:py-32 border-t border-white/5 bg-black/40 relative z-10 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-16">
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono block mb-2">
              — Portfolio Case Studies
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-4">
              Our interactive work
            </h2>
            <p className="text-neutral-400 text-sm max-w-lg leading-relaxed font-light">
              An showcase of Orbitly's precision. Interact with each project card's dynamic console to preview real-time responsive styling and biometric calculations!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* WORK 1: AETHER (Interactive metrics widget) */}
            <div className="group rounded-3xl overflow-hidden bg-neutral-950 border border-white/5 hover:border-white/10 flex flex-col justify-between transition-all">
              <div className="p-8">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs uppercase font-mono text-zinc-400">01 / Fintech Brand</span>
                  <div className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-400 font-mono">
                    Live Demo
                  </div>
                </div>
                
                <h3 className="text-2xl font-light tracking-tight text-white mb-2">
                  Aether Wealth
                </h3>
                <p className="text-neutral-400 text-xs leading-relaxed mb-6 font-light">
                  A premier corporate asset system featuring live fluid visualizations and lightning-fast dark terminal screens.
                </p>

                {/* INTERACTIVE WIDGET: AETHER METRICS SLIDER */}
                <div className="p-5 rounded-2xl bg-neutral-900 border border-white/5 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase tracking-widest text-[#FF5A00] font-mono leading-none font-semibold">
                      ROI Target
                    </span>
                    <span className="font-mono text-lg font-light text-white">
                      +{aetherMetric}%
                    </span>
                  </div>
                  
                  {/* Dynamic circular SVG speedometer */}
                  <div className="flex justify-center py-2 relative">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="#1c1c1e" strokeWidth="6" fill="transparent" />
                      <circle 
                        cx="48" 
                        cy="48" 
                        r="40" 
                        stroke="#FF5A00" 
                        strokeWidth="6" 
                        fill="transparent" 
                        strokeDasharray={251}
                        strokeDashoffset={251 - (251 * aetherMetric) / 100}
                        className="transition-all duration-300"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[10px] uppercase text-neutral-400 tracking-wide font-mono">
                        Projected
                      </span>
                      <span className="text-xs font-semibold text-emerald-400">
                        Strong Growth
                      </span>
                    </div>
                  </div>

                  {/* Manual control slider */}
                  <div className="mt-4">
                    <label className="text-[9px] uppercase tracking-wider text-neutral-500 font-mono block mb-1">
                      Drag to Simulate Growth
                    </label>
                    <input 
                      id="aether-slider"
                      type="range"
                      min="10"
                      max="100"
                      value={aetherMetric}
                      onChange={(e) => setAetherMetric(Number(e.target.value))}
                      className="w-full accent-[#FF5A00] bg-neutral-950 rounded-lg cursor-pointer h-1"
                    />
                  </div>
                </div>

              </div>
              
              <div className="px-8 pb-8 pt-4">
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-[10px] px-2.5 py-1 rounded-md bg-neutral-900 text-neutral-400 border border-white/5">UX Core</span>
                  <span className="text-[10px] px-2.5 py-1 rounded-md bg-neutral-900 text-neutral-400 border border-white/5">Charts Node</span>
                </div>
                
                <button 
                  id="btn-view-aether"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, message: "Interested in Aether Fintech framework!" }));
                    handleServiceSelect("Digital Product Design");
                  }}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium border border-white/10 group-hover:border-[#FF5A00]/50 text-white transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Build Fintech Brand like Aether</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* WORK 2: VESPER SPATIAL OS (Mouse Tracker Widget) */}
            <div 
              className="group rounded-3xl overflow-hidden bg-neutral-950 border border-white/5 hover:border-white/10 flex flex-col justify-between transition-all"
              ref={vesperRef}
              onMouseMove={handleVesperMouseMove}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs uppercase font-mono text-zinc-400">02 / Spatial UI</span>
                  <div className="px-2.5 py-0.5 rounded-full bg-[#FF5A00]/10 border border-[#FF5A00]/30 text-[10px] text-[#FF5A00] font-mono">
                    Interactive
                  </div>
                </div>
                
                <h3 className="text-2xl font-light tracking-tight text-white mb-2">
                  Vesper OS
                </h3>
                <p className="text-neutral-400 text-xs leading-relaxed mb-6 font-light">
                  An interface blueprint for spatial VR terminals, optimized for responsive layout grids and zero-latency movement tracking.
                </p>

                {/* INTERACTIVE WIDGET: COORDINATES TRACKER */}
                <div className="p-5 rounded-2xl bg-neutral-900 border border-white/5 flex flex-col justify-between h-[178px] relative overflow-hidden group">
                  
                  {/* Subtle layout grid in background of coordinate module */}
                  <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-[0.03] pointer-events-none">
                    {[...Array(24)].map((_, i) => (
                      <div key={i} className="border border-white" />
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono leading-none z-10 text-neutral-400">
                    <span>TRACKING GYRO</span>
                    <span className="text-[#FF5A00] flex items-center gap-1 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A00] " />
                      ONLINE
                    </span>
                  </div>

                  {/* Visual Coordinate Crosshair representing tracking */}
                  <div className="relative w-full h-16 flex items-center justify-center my-2 select-none">
                    <div className="absolute w-full h-[1px] bg-white/5" />
                    <div className="absolute h-full w-[1px] bg-white/5" />
                    
                    {/* Floating target point corresponding to coordinates */}
                    <div 
                      className="absolute w-4 h-4 rounded-full border border-[#FF5A00] bg-black/40 flex items-center justify-center transition-all duration-100 ease-out"
                      style={{
                        transform: `translate(${vesperCoords.x / 4}px, ${vesperCoords.y / 4}px)`
                      }}
                    >
                      <div className="w-1.5 h-1.5 bg-[#FF5A00] rounded-full" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono leading-tight z-10 text-zinc-400">
                    <div className="p-1 px-1 py-1.5 rounded bg-black/30 border border-white/5">
                      <span className="text-zinc-500 block">AXIS_X</span>
                      <span className="text-white font-medium">{vesperCoords.x}px</span>
                    </div>
                    <div className="p-1 px-1 py-1.5 rounded bg-black/30 border border-white/5">
                      <span className="text-zinc-500 block">AXIS_Y</span>
                      <span className="text-white font-medium">{vesperCoords.y}px</span>
                    </div>
                    <div className="p-1 px-1 py-1.5 rounded bg-black/30 border border-white/5">
                      <span className="text-zinc-500 block">AXIS_Z</span>
                      <span className="text-[#FF5A00] font-medium">{vesperCoords.z}hz</span>
                    </div>
                  </div>

                </div>

              </div>
              
              <div className="px-8 pb-8 pt-4">
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-[10px] px-2.5 py-1 rounded-md bg-neutral-900 text-neutral-400 border border-white/5">Spatial OS</span>
                  <span className="text-[10px] px-2.5 py-1 rounded-md bg-neutral-900 text-neutral-400 border border-white/5">latency &lt; 2.4ms</span>
                </div>
                
                <button 
                  id="btn-view-vesper"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, message: "Seeking Spatial OS / Virtual Reality consult." }));
                    handleServiceSelect("Creative Direction & Spatial OS");
                  }}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium border border-white/10 group-hover:border-[#FF5A00]/50 text-white transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Inquire Spatial Systems</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* WORK 3: NOVA ECOSYSTEM (Theme Switcher Widget) */}
            <div className="group rounded-3xl overflow-hidden bg-neutral-950 border border-white/5 hover:border-white/10 flex flex-col justify-between transition-all">
              <div className="p-8">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs uppercase font-mono text-zinc-400">03 / Brand Suite</span>
                  <div className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-[10px] text-blue-400 font-mono">
                    Live Style
                  </div>
                </div>
                
                <h3 className="text-2xl font-light tracking-tight text-white mb-2">
                  Nova System
                </h3>
                <p className="text-neutral-400 text-xs leading-relaxed mb-6 font-light">
                  Bespoke e-commerce layout built with brand guidelines and dynamic custom mockup render presets.
                </p>

                {/* INTERACTIVE WIDGET: THEME/STYLE CONTROLLER */}
                <div className="p-5 rounded-2xl bg-neutral-900 border border-white/5 relative overflow-hidden flex flex-col justify-between h-[178px]">
                  
                  {/* Mock Wearable Card whose style changes depending on state */}
                  <div className={`p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                    novaTheme === "slate"
                      ? "bg-slate-900/90 border-slate-700/50"
                      : novaTheme === "sunset"
                      ? "bg-amber-950/40 border-amber-500/40"
                      : "bg-neutral-900 border-lime-500/40"
                  }`}>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 block uppercase">Premium Series</span>
                      <span className="text-sm font-semibold text-white tracking-tight">Nova Gear X1</span>
                    </div>
                    
                    {/* Simulated visual watch or display badge */}
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-mono transition-all duration-300 ${
                      novaTheme === "slate"
                        ? "bg-slate-800 border-slate-500 text-white"
                        : novaTheme === "sunset"
                        ? "bg-orange-600 border-orange-400 text-white font-bold"
                        : "bg-lime-500 border-lime-300 text-black font-bold"
                    }`}>
                      {novaTheme === "slate" ? "SLT" : novaTheme === "sunset" ? "SNT" : "LIM"}
                    </div>
                  </div>

                  {/* Selector tabs trigger styling changes */}
                  <div className="mt-4">
                    <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-mono block mb-2">
                      Select Workspace Brand Color:
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setNovaTheme("slate")}
                        className={`py-1 text-[9px] rounded font-mono border transition-all cursor-pointer ${
                          novaTheme === "slate"
                            ? "bg-slate-800/80 text-white border-slate-600"
                            : "bg-black/30 text-zinc-400 border-white/5 hover:text-white"
                        }`}
                      >
                        Slate Slate
                      </button>
                      <button
                        type="button"
                        onClick={() => setNovaTheme("sunset")}
                        className={`py-1 text-[9px] rounded font-mono border transition-all cursor-pointer ${
                          novaTheme === "sunset"
                            ? "bg-orange-900/50 text-white border-orange-500"
                            : "bg-black/30 text-zinc-400 border-white/5 hover:text-white"
                        }`}
                      >
                        Sunset orange
                      </button>
                      <button
                        type="button"
                        onClick={() => setNovaTheme("lime")}
                        className={`py-1 text-[9px] rounded font-mono border transition-all cursor-pointer ${
                          novaTheme === "lime"
                            ? "bg-lime-950/50 text-lime-400 border-lime-500"
                            : "bg-black/30 text-zinc-400 border-white/5 hover:text-white"
                        }`}
                      >
                        Active Lime
                      </button>
                    </div>
                  </div>

                </div>

              </div>
              
              <div className="px-8 pb-8 pt-4">
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-[10px] px-2.5 py-1 rounded-md bg-neutral-900 text-neutral-400 border border-white/5">Brand System</span>
                  <span className="text-[10px] px-2.5 py-1 rounded-md bg-neutral-900 text-neutral-400 border border-white/5">+32.5% Growth</span>
                </div>
                
                <button 
                  id="btn-view-nova"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, message: "Requesting customized dynamic Brand System consultation." }));
                    handleServiceSelect("Brand Strategy & Positioning");
                  }}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium border border-white/10 group-hover:border-[#FF5A00]/50 text-white transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Build Brand like Nova</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. ABOUT THE STUDIO (Interactively counting statistics) */}
      <section id="about" className="py-24 md:py-32 border-t border-white/5 bg-black/60 relative z-10 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Left Col: Core Studio philosophy and story */}
            <div>
              <span className="text-xs uppercase tracking-widest text-[#FF5A00] font-mono block mb-2 font-semibold">
                — Who We Are
              </span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-6">
                We design for the ambitious
              </h2>
              <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-light">
                Orbitly is structured around small, hyper-specialized teams of product managers, brand developers, and senior design engineers. We completely bypassed the typical administrative bloat of traditional digital agencies to deliver direct, uncompromised craft directly to founders.
              </p>
              <p className="text-neutral-400 text-sm leading-relaxed font-light">
                Our philosophy prioritizes high contrast density, fluid transitions, and uncompromising performance. We don't believe in generic design slop — we deliver memorable digital artifacts.
              </p>

              {/* Award highlights */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                  <Award className="w-5 h-5 text-[#FF5A00] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-white">UX Design Award</h4>
                    <p className="text-[10px] text-neutral-400">Honorable Studio, 2026</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                  <Zap className="w-5 h-5 text-[#FF5A00] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-white">Studio of the Year</h4>
                    <p className="text-[10px] text-neutral-400">CSS Pioneer Gold, 2025</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Interactive KPI block (click stats to increase them!) */}
            <div className="relative">
              
              {/* Backlight glow */}
              <div className="absolute inset-0 bg-[#FF5A00]/5 rounded-3xl blur-2xl pointer-events-none" />

              <div className="relative p-8 md:p-12 rounded-3xl bg-neutral-950 border border-white/5">
                <span className="text-[10px] uppercase tracking-widest text-[#FF5A00] font-mono block mb-8 font-semibold">
                  Orbitly Studio Metrics — Click block to expand stats
                </span>

                <div className="space-y-6">
                  
                  {/* Stat 1: Brand Launched */}
                  <button
                    type="button"
                    onClick={() => setBrandStat(prev => prev + 1)}
                    className="w-full text-left p-5 rounded-2xl bg-neutral-900 border border-white/5 hover:border-[#FF5A00]/40 transition-all cursor-pointer block group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-neutral-400 font-light font-mono">Brands Launched & Scaled</span>
                      <span className="text-xs text-neutral-500 font-mono group-hover:text-white">+ click</span>
                    </div>
                    <span className="text-4xl text-white font-light tracking-tight font-mono block group-hover:text-[#FF5A00] transition-colors">
                      {brandStat}+
                    </span>
                  </button>

                  {/* Stat 2: Awards */}
                  <button
                    type="button"
                    onClick={() => setAwardStat(prev => prev + 1)}
                    className="w-full text-left p-5 rounded-2xl bg-neutral-900 border border-white/5 hover:border-[#FF5A00]/40 transition-all cursor-pointer block group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-neutral-400 font-light font-mono">Design Honors Awarded</span>
                      <span className="text-xs text-neutral-500 font-mono group-hover:text-white">+ click</span>
                    </div>
                    <span className="text-4xl text-white font-light tracking-tight font-mono block group-hover:text-[#FF5A00] transition-colors">
                      {awardStat}x
                    </span>
                  </button>

                  {/* Stat 3: Retention */}
                  <button
                    type="button"
                    onClick={() => setRetentionStat(prev => prev === 100 ? 99 : 100)}
                    className="w-full text-left p-5 rounded-2xl bg-neutral-900 border border-white/5 hover:border-[#FF5A00]/40 transition-all cursor-pointer block group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-neutral-400 font-light font-mono">Client Partnership Retention</span>
                      <span className="text-xs text-neutral-500 font-mono group-hover:text-white">toggle</span>
                    </div>
                    <span className="text-4xl text-white font-light tracking-tight font-mono block group-hover:text-[#FF5A00] transition-colors">
                      {retentionStat}%
                    </span>
                  </button>

                </div>

                <div className="mt-8 flex items-center gap-2.5 text-xs text-neutral-400 font-light leading-snug">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span>Interactive statistics verified under genuine 2026 Orbitly partner registry.</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE DIRECT CONTACT BRIEF FORM (Real submission block) */}
      <section id="contact" className="py-24 md:py-32 border-t border-white/5 bg-black/80 relative z-10 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Left column: HQ Location details, dynamic local time, email details */}
            <div className="space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#FF5A00] font-mono block mb-2 font-semibold">
                  — Get in Touch
                </span>
                <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-4">
                  Let's bring your <br />
                  project to life.
                </h2>
                <p className="text-neutral-400 text-sm max-w-sm leading-relaxed font-light">
                  Submit your details on the right, or write directly to our project partners at hello@orbitly.design.
                </p>
              </div>

              {/* Dynamic clocks displaying accurate live time and status */}
              <div>
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono block mb-3 font-semibold">
                  Our Presence & Operating Clocks
                </span>
                <ClockWidget />
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5 text-sm">
                <div>
                  <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono block mb-1">
                    Press Inquiries
                  </span>
                  <a href="mailto:press@orbitly.design" className="text-white hover:text-[#FF5A00] transition-colors font-mono">
                    press@orbitly.design
                  </a>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono block mb-1">
                    General HQ
                  </span>
                  <p className="text-neutral-300 leading-relaxed font-light">
                    650 California Street, Floor 14<br />
                    San Francisco, CA 94108, USA
                  </p>
                </div>
              </div>
            </div>

            {/* Right column: Beautiful Direct Project Brief Form */}
            <div className="p-8 md:p-10 rounded-3xl bg-neutral-950/80 border border-white/5 backdrop-blur-md">
              {!formSubmitted ? (
                <div>
                  <h3 className="text-xl font-medium text-white mb-6">
                    Bespoke Project Planner
                  </h3>

                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    
                    {/* Name */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-400 font-mono mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g. Richard Hendricks"
                        className="w-full bg-neutral-900 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#FF5A00] transition-colors font-light"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-400 font-mono mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="e.g. richard@piedpiper.com"
                        className="w-full bg-neutral-900 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#FF5A00] transition-colors font-light"
                      />
                    </div>

                    {/* Service selection category */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-400 font-mono mb-2">
                        Service Category
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                        className="w-full bg-neutral-900 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#FF5A00] transition-colors font-light appearance-none cursor-pointer"
                      >
                        <option>Brand Strategy & Positioning</option>
                        <option>Digital Product Design</option>
                        <option>Creative Web & App Dev</option>
                        <option>Creative Direction & Spatial OS</option>
                      </select>
                    </div>

                    {/* Choose budget tiers */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-400 font-mono mb-2">
                        Budget Range
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {["$15k - $25k", "$25k - $50k", "$50k+"].map((tier) => (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, budget: tier }))}
                            className={`py-2 text-xs rounded-xl border transition-all cursor-pointer ${
                              formData.budget === tier
                                ? "bg-[#FF5A00]/25 border-[#FF5A00] text-white font-medium"
                                : "bg-neutral-900 border-white/5 text-neutral-400 hover:border-neutral-700"
                            }`}
                          >
                            {tier}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Brief message block */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-400 font-mono mb-2">
                        Brief Project Description (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Tell us about your digital goals, constraints, or visual style..."
                        className="w-full bg-neutral-900 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#FF5A00] transition-colors font-light"
                      />
                    </div>

                    <button
                      id="btn-direct-submit"
                      type="submit"
                      disabled={formLoading}
                      className="w-full py-4 bg-[#FF5A00] hover:bg-[#E34E00] active:scale-98 rounded-xl text-sm font-semibold text-white tracking-wider cursor-pointer shadow-lg hover:shadow-[#FF5A00]/20 flex items-center justify-center gap-2 transition-all"
                    >
                      {formLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Send Project Brief</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                  </form>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-light text-white tracking-tight mb-2">
                    Brief Configured!
                  </h3>
                  <p className="text-sm text-neutral-400 mb-8 max-w-sm mx-auto leading-relaxed">
                    Thank you <span className="text-white font-semibold">{formData.name}</span>! Our managing partners are notified of your requested budget tier (<span className="text-white">{formData.budget}</span>) for the <span className="text-white">{formData.service}</span>. Let's schedule a kickoff within 24 hours.
                  </p>
                  
                  <button
                    id="btn-form-reset"
                    onClick={resetDirectForm}
                    className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-850 border border-white/5 hover:border-white/20 text-xs text-white rounded-xl transition-colors cursor-pointer font-mono uppercase tracking-widest font-semibold"
                  >
                    ← Configure New Brief
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* 
        INTERACTIVE PARTNERS BAR & VISUAL LAUNCH FOOTER 
        Hovering or clicking on partner logos pops open a premium card describing completed designs.
      */}
      <section id="footer-partners" className="relative w-full px-6 md:px-16 lg:px-24 py-16 bg-neutral-950 border-t border-white/5 z-20">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs uppercase tracking-widest text-[#FF5A00] font-mono block font-semibold">
              — Our Partners Registry
            </span>
            <span className="text-[10px] text-neutral-500 font-mono hidden sm:block">
              Click individual partner brand to preview custom deliverables
            </span>
          </div>

          {/* Interactive Partners Grid with expanding popover */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
            {PARTNERS_DATA.map((partner, index) => {
              const isSelected = selectedPartnerIndex === index;
              return (
                <div
                  id={`partner-logo-item-${index}`}
                  key={index}
                  onClick={() => setSelectedPartnerIndex(isSelected ? null : index)}
                  className={`p-5 rounded-2xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    isSelected
                      ? "bg-neutral-900 border-[#FF5A00] shadow-md"
                      : "bg-neutral-900/30 border-white/5 hover:border-white/20 hover:bg-neutral-900/40"
                  }`}
                >
                  {/* Dynamic partner vector logo simulation */}
                  <div className="flex items-center gap-1.5">
                    {index % 3 === 0 ? (
                      <Layers className={`w-4 h-4 ${isSelected ? "text-[#FF5A00]" : "text-neutral-500"}`} />
                    ) : index % 3 === 1 ? (
                      <Activity className={`w-4 h-4 ${isSelected ? "text-[#FF5A00]" : "text-neutral-500"}`} />
                    ) : (
                      <Compass className={`w-4 h-4 ${isSelected ? "text-[#FF5A00]" : "text-neutral-500"}`} />
                    )}
                    <span className="text-base font-semibold text-neutral-200 tracking-tight">
                      {partner.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Connected deliverables showcase badge depending on clicked partner */}
          <AnimatePresence>
            {selectedPartnerIndex !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-5 rounded-2xl bg-[#FF5A00]/5 border border-[#FF5A00]/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none mb-10"
              >
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#FF5A00] block mb-0.5 leading-none font-semibold">
                    Completed Deliverables — {PARTNERS_DATA[selectedPartnerIndex].name}
                  </span>
                  <p className="text-sm text-neutral-200 font-light mt-1">
                    {PARTNERS_DATA[selectedPartnerIndex].workedOn} ({PARTNERS_DATA[selectedPartnerIndex].year})
                  </p>
                </div>
                <div className="p-3 py-2 rounded-xl bg-black/40 border border-[#FF5A00]/20 text-center shrink-0">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-mono block mb-0.5">
                    Impact Metric
                  </span>
                  <span className="text-sm font-semibold font-mono text-emerald-400">
                    {PARTNERS_DATA[selectedPartnerIndex].metric}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Legal and credits bar */}
          <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
            <span>© 2026 Orbitly Inc. Zurich & San Francisco. All Rights Reserved.</span>
            <div className="flex gap-4">
              <a href="#home" className="hover:text-white transition-colors">Privacy</a>
              <a href="#home" className="hover:text-white transition-colors">Workspace Terms</a>
              <a href="#home" className="hover:text-white transition-colors">Briefing Registry</a>
            </div>
          </div>

        </div>
      </section>

      {/* FULLSCREEN NAVIGATION DRAWER */}
      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* DETAILED BRIEF SUBMISSION MODAL */}
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

    </div>
  );
}
