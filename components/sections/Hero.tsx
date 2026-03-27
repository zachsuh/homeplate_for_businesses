"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Phone, Sparkles } from "lucide-react";

const words = ["Your Kitchen", "Is Already Built.", "Now Put It", "to Work."];

function WordReveal({ words }: { words: string[] }) {
  return (
    <h1 className="text-[clamp(44px,6vw,78px)] font-black tracking-[-0.05em] leading-[1.04] text-[#18181B] max-w-[720px] mx-auto mb-5">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.65, delay: 0.25 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block mr-3"
          style={{ display: i === 2 ? "block" : "inline-block" }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const illoLeftX = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const illoRightX = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const illoY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <section
      ref={containerRef}
      className="relative pt-20 pb-0 text-center overflow-hidden min-h-[580px]"
    >
      <motion.div style={{ y: contentY }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-white border border-[#E4E2DE] rounded-full px-4 py-1.5 text-[12.5px] font-medium text-[#3F3F46] mb-6 shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8470A] shrink-0" />
          Now onboarding senior center partners nationwide
        </motion.div>

        {/* Headline */}
        <div className="text-center">
          <WordReveal words={words} />
        </div>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-[17px] text-[#71717A] max-w-[490px] mx-auto mb-10 leading-[1.65] px-4"
        >
          HomePlate turns your senior center's idle kitchen into a fully operational
          medically-tailored meal program — menus, software, training, and marketing already handled.
        </motion.p>

        {/* Input card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[540px] mx-auto mb-3.5 px-4"
        >
          <motion.div
            animate={{
              borderColor: focused ? "#E8470A" : "#E4E2DE",
              boxShadow: focused
                ? "0 0 0 4px rgba(232,71,10,0.10), 0 4px 24px rgba(232,71,10,0.12)"
                : "0 2px 8px rgba(0,0,0,0.06)",
            }}
            transition={{ duration: 0.2 }}
            className="bg-white border-2 rounded-2xl px-6 pt-5 pb-3 text-left"
          >
            <div className="flex items-center gap-2 text-[12.5px] text-[#71717A] mb-3">
              <Sparkles size={13} className="text-[#E8470A]" />
              See what your kitchen could earn
            </div>
            <input
              type="text"
              placeholder='Enter your senior center name or try "Sunrise Senior Living"'
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="w-full bg-transparent border-none outline-none text-[16px] text-[#18181B] placeholder:text-[#C4C2BD] pb-3 font-[inherit]"
            />
          </motion.div>
        </motion.div>

        {/* Demo CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[540px] mx-auto px-4"
        >
          <div className="bg-white border border-[#E4E2DE] rounded-2xl px-5 py-3.5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[#E8470A] rounded-xl flex items-center justify-center shrink-0">
                <Phone size={18} className="text-white" />
              </div>
              <div className="text-left">
                <div className="text-[15px] font-semibold text-[#18181B]">Talk to HomePlate</div>
                <div className="text-[13px] text-[#71717A]">Partnership demos are easy</div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="w-11 h-11 bg-[#E8470A] rounded-xl flex items-center justify-center text-white hover:bg-[#C73D08] transition-colors border-none cursor-pointer"
            >
              <Phone size={18} />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Left illustration */}
      <motion.div
        style={{ x: illoLeftX, y: illoY }}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 w-[260px] pointer-events-none hidden lg:block"
      >
        <svg viewBox="0 0 280 340" fill="none">
          <text x="12" y="48" fontSize="9.5" fontWeight="700" letterSpacing="0.1em" fill="#E8470A">IDLE CAPACITY</text>
          <line x1="76" y1="52" x2="76" y2="68" stroke="#E8470A" strokeWidth="1" strokeDasharray="3 3" />
          <rect x="40" y="80" width="148" height="180" rx="4" stroke="#E8470A" strokeWidth="1.5" fill="rgba(232,71,10,0.04)" />
          <rect x="58" y="98" width="28" height="28" rx="2" stroke="#E8470A" strokeWidth="1.2" fill="none" strokeDasharray="2 2" />
          <rect x="96" y="98" width="28" height="28" rx="2" stroke="#E8470A" strokeWidth="1.2" fill="none" strokeDasharray="2 2" />
          <rect x="134" y="98" width="28" height="28" rx="2" stroke="#E8470A" strokeWidth="1.2" fill="none" strokeDasharray="2 2" />
          <rect x="75" y="200" width="42" height="60" rx="3" stroke="#E8470A" strokeWidth="1.2" fill="rgba(232,71,10,0.06)" />
          <rect x="58" y="144" width="28" height="28" rx="2" stroke="#E8470A" strokeWidth="1.2" fill="none" strokeDasharray="2 2" />
          <rect x="134" y="144" width="28" height="28" rx="2" stroke="#E8470A" strokeWidth="1.2" fill="none" strokeDasharray="2 2" />
          <path d="M30 80 L114 50 L198 80" stroke="#E8470A" strokeWidth="1.5" fill="none" />
          <circle cx="40" cy="80" r="4" fill="#E8470A" />
          <circle cx="188" cy="80" r="4" fill="#E8470A" />
          <circle cx="114" cy="50" r="4" fill="#E8470A" />
          <circle cx="30" cy="80" r="3" fill="none" stroke="#E8470A" strokeWidth="1.5" />
          <text x="56" y="168" fontSize="9" fill="#E8470A" fontWeight="600" opacity="0.5">KITCHEN</text>
          <text x="140" y="14" fontSize="9.5" fontWeight="700" letterSpacing="0.1em" fill="#E8470A">NEW REVENUE</text>
          <line x1="164" y1="18" x2="164" y2="36" stroke="#E8470A" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="164" cy="38" r="3" fill="#E8470A" />
        </svg>
      </motion.div>

      {/* Right illustration */}
      <motion.div
        style={{ x: illoRightX, y: illoY }}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 right-0 w-[260px] pointer-events-none hidden lg:block"
      >
        <svg viewBox="0 0 280 340" fill="none">
          <text x="60" y="48" fontSize="9.5" fontWeight="700" letterSpacing="0.1em" fill="#E8470A">GET INSIGHTS</text>
          <line x1="100" y1="52" x2="100" y2="68" stroke="#E8470A" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M60 110 L70 90 L200 90 L210 110" stroke="#E8470A" strokeWidth="1.5" fill="rgba(232,71,10,0.04)" />
          <rect x="56" y="110" width="158" height="140" rx="6" stroke="#E8470A" strokeWidth="1.5" fill="rgba(232,71,10,0.04)" />
          <line x1="56" y1="160" x2="214" y2="160" stroke="#E8470A" strokeWidth="1" strokeDasharray="4 3" />
          <line x1="135" y1="160" x2="135" y2="250" stroke="#E8470A" strokeWidth="1" strokeDasharray="4 3" />
          <circle cx="95" cy="130" r="20" stroke="#E8470A" strokeWidth="1.2" fill="none" strokeDasharray="3 2" />
          <circle cx="95" cy="130" r="12" stroke="#E8470A" strokeWidth="1" fill="rgba(232,71,10,0.08)" />
          <circle cx="175" cy="130" r="16" stroke="#E8470A" strokeWidth="1.2" fill="none" strokeDasharray="3 2" />
          <circle cx="60" cy="110" r="4" fill="#E8470A" />
          <circle cx="214" cy="110" r="4" fill="#E8470A" />
          <circle cx="135" cy="160" r="3" fill="#E8470A" />
          <circle cx="95" cy="110" r="3" fill="none" stroke="#E8470A" strokeWidth="1.5" />
          <text x="64" y="285" fontSize="9" fill="#E8470A" fontWeight="600" opacity="0.5">MEDICAL MEALS</text>
          <text x="30" y="14" fontSize="9.5" fontWeight="700" letterSpacing="0.1em" fill="#E8470A">ADD REVENUE</text>
          <line x1="78" y1="18" x2="78" y2="36" stroke="#E8470A" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="78" cy="38" r="3" fill="#E8470A" />
        </svg>
      </motion.div>
    </section>
  );
}
