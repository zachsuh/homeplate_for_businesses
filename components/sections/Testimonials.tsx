"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    logo: "Heritage House",
    quote: "Our kitchen sat empty six hours a day. HomePlate changed that in two weeks. We're now serving 180 meals a week to seniors in our community without touching our existing dining operation.",
    author: "Director of Operations — Heritage House Senior Center",
    statVal: "$3,100",
    statLabel: "New monthly revenue, first 60 days",
    color: "rgba(232,71,10,0.08)",
  },
  {
    logo: "Harmony Senior Center",
    quote: "We didn't need another vendor. We needed a complete program we could hand to our kitchen manager and actually run. HomePlate is exactly that — they handled everything from training to the first order.",
    author: "Executive Director — Harmony Senior Center",
    statVal: "240",
    statLabel: "Meals delivered per month, month 2",
    color: "rgba(232,71,10,0.06)",
  },
  {
    logo: "Golden Years Village",
    quote: "The medically-tailored aspect is what made this work for us. Our residents managing diabetes and kidney disease finally have meal options designed for them, and our kitchen is generating real new revenue.",
    author: "Dining Services Manager — Golden Years Village",
    statVal: "0",
    statLabel: "New full-time hires required",
    color: "rgba(232,71,10,0.05)",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const go = (n: number) => setCurrent(((n % slides.length) + slides.length) % slides.length);

  useEffect(() => {
    timerRef.current = setInterval(() => go(current + 1), 5500);
    return () => clearInterval(timerRef.current);
  }, [current]);

  return (
    <section className="px-10 pt-20 pb-0">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12"
      >
        <h2 className="text-[clamp(32px,4vw,50px)] font-black tracking-[-0.045em] leading-[1.1] mb-4">
          Trusted by Senior Centers<br />Across the Country
        </h2>
        <div className="flex justify-center gap-6 flex-wrap">
          {["Zero New Hires Required", "Ready in Under Two Weeks", "No Per-Meal Fees"].map((t) => (
            <div key={t} className="flex items-center gap-2 text-[15px] text-[#71717A]">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="#E8470A" strokeWidth="1.5" />
                <path d="M6.5 10l2.5 2.5 4.5-4.5" stroke="#E8470A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#E8470A] rounded-[20px] overflow-hidden"
      >
        {/* Logo bar */}
        <div className="px-10 py-4 flex items-center gap-8 border-b border-white/15 overflow-x-auto">
          {slides.map((s, i) => (
            <button
              key={s.logo}
              onClick={() => { clearInterval(timerRef.current); go(i); }}
              className={cn(
                "text-[15px] font-bold whitespace-nowrap border-none bg-transparent cursor-pointer transition-all duration-300",
                i === current ? "text-white" : "text-white/35 hover:text-white/60"
              )}
            >
              {s.logo}
            </button>
          ))}
        </div>

        {/* Slides */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="grid grid-cols-[200px_1fr_320px] min-h-[380px]"
            >
              {/* Left side illustration */}
              <div className="bg-white/10 flex items-center justify-center p-6">
                <svg viewBox="0 0 160 300" fill="none" width="140" height="260">
                  <rect x="10" y="30" width="140" height="220" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                  <rect x="24" y="48" width="52" height="52" rx="4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <rect x="84" y="48" width="54" height="16" rx="3" fill="rgba(255,255,255,0.08)" />
                  <rect x="84" y="70" width="38" height="12" rx="3" fill="rgba(255,255,255,0.05)" />
                  <rect x="24" y="115" width="114" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
                  <rect x="24" y="129" width="82" height="8" rx="4" fill="rgba(255,255,255,0.05)" />
                  <rect x="24" y="152" width="114" height="70" rx="6" fill="rgba(255,255,255,0.04)" />
                  <circle cx="38" cy="190" r="12" fill="rgba(255,255,255,0.1)" />
                  <rect x="56" y="183" width="68" height="7" rx="3" fill="rgba(255,255,255,0.1)" />
                  <rect x="56" y="196" width="46" height="6" rx="3" fill="rgba(255,255,255,0.06)" />
                </svg>
              </div>

              {/* Content */}
              <div className="bg-white p-10 flex flex-col justify-between">
                <div>
                  <p className="text-[19px] font-semibold leading-[1.55] tracking-[-0.02em] text-[#18181B] mb-3">
                    "{slides[current].quote}"
                  </p>
                  <p className="text-[13px] text-[#71717A]">{slides[current].author}</p>
                </div>
                <div className="bg-[#EDEBE6] rounded-xl px-4 py-3.5 mt-6 flex items-center gap-3">
                  <TrendingUp size={18} className="text-[#E8470A] shrink-0" />
                  <div>
                    <div className="text-[22px] font-black text-[#18181B]">{slides[current].statVal}</div>
                    <div className="text-[12px] text-[#71717A]">{slides[current].statLabel}</div>
                  </div>
                </div>
              </div>

              {/* Right illustration */}
              <div className="bg-white/8 relative flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 320 380" fill="none" width="100%" height="100%" className="absolute inset-0">
                  <circle cx="160" cy="170" r="90" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                  <circle cx="160" cy="170" r="56" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  <path d="M100 170 Q130 140 160 170 Q190 200 220 170" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none" />
                  <circle cx="100" cy="170" r="5" fill="rgba(255,255,255,0.55)" />
                  <circle cx="220" cy="170" r="5" fill="rgba(255,255,255,0.55)" />
                  <circle cx="160" cy="150" r="5" fill="rgba(255,255,255,0.55)" />
                  <circle cx="160" cy="190" r="5" fill="rgba(255,255,255,0.55)" />
                  <circle cx="120" cy="140" r="3" fill="rgba(255,255,255,0.35)" />
                  <circle cx="200" cy="200" r="3" fill="rgba(255,255,255,0.35)" />
                </svg>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[rgba(200,60,0,0.6)] to-transparent text-white text-center py-5 pt-10 text-[14px] font-semibold cursor-pointer hover:from-[rgba(200,60,0,0.75)] transition-all">
                  Read more
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="px-10 py-3.5 flex items-center justify-between border-t border-white/15">
          <div className="flex items-center gap-2 text-[13px] text-white/60">
            <TrendingUp size={13} />
            Faster Service
          </div>
          <div className="flex gap-2">
            {[ChevronLeft, ChevronRight].map((Icon, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => { clearInterval(timerRef.current); go(current + (i === 0 ? -1 : 1)); }}
                className="w-9 h-9 rounded-xl border border-white/30 bg-transparent text-white flex items-center justify-center cursor-pointer hover:bg-white/15 transition-colors"
              >
                <Icon size={15} />
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
