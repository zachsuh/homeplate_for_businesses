"use client";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ─── Card 1 graphic: recipe cards fade in one by one ───────────────────────
const RECIPES = [
  { name: "Low-Sodium Herb Chicken",  tag: "Low Sodium",       color: "#DBEAFE", text: "#1D4ED8" },
  { name: "Diabetic Grain Bowl",       tag: "Diabetic-Friendly", color: "#D1FAE5", text: "#065F46" },
  { name: "Renal-Safe Pasta",          tag: "Renal",            color: "#FEF3C7", text: "#92400E" },
  { name: "Heart-Healthy Salmon",      tag: "Heart-Healthy",    color: "#FCE7F3", text: "#9D174D" },
  { name: "Texture-Modified Stew",     tag: "Dysphagia",        color: "#EDE9FE", text: "#5B21B6" },
  { name: "High-Protein Egg Plate",    tag: "High Protein",     color: "#FEE2E2", text: "#991B1B" },
];

function RecipeGraphic() {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="grid grid-cols-2 gap-2 w-full">
        {RECIPES.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.18, duration: 0.4, ease: "easeOut", repeat: Infinity, repeatDelay: RECIPES.length * 0.18 + 1.2, repeatType: "loop" }}
            className="bg-white rounded-xl p-3 shadow-sm border border-[#F0EFEC]"
          >
            <div className="text-[11px] font-medium text-[#1A1A1A] mb-1.5 leading-tight">{r.name}</div>
            <span
              className="text-[9.5px] font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: r.color, color: r.text }}
            >
              {r.tag}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Card 2 graphic: order slides in, badge flips, counter ticks ───────────
function OrderGraphic() {
  const [phase, setPhase] = useState<"in" | "flip" | "count">("in");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    let t3: ReturnType<typeof setTimeout>;

    function cycle() {
      setPhase("in");
      t1 = setTimeout(() => setPhase("flip"), 1400);
      t2 = setTimeout(() => {
        setPhase("count");
        animate(count, 247, { duration: 1.2, ease: "easeOut" });
      }, 2400);
      t3 = setTimeout(() => {
        count.set(0);
        cycle();
      }, 4800);
    }
    cycle();
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [count]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-6">
      {/* Incoming order row */}
      <motion.div
        key={phase}
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full bg-white rounded-2xl px-4 py-3 shadow-sm border border-[#F0EFEC] flex items-center justify-between"
      >
        <div>
          <div className="text-[12px] font-semibold text-[#1A1A1A]">Order #2041 — Margaret Chen</div>
          <div className="text-[10.5px] text-[#71717A] mt-0.5">Diabetic · 5 items · Mon delivery</div>
        </div>
        <motion.span
          animate={{ backgroundColor: phase === "flip" || phase === "count" ? "#D1FAE5" : "#FEF3C7",
                     color: phase === "flip" || phase === "count" ? "#065F46" : "#92400E" }}
          transition={{ duration: 0.35 }}
          className="text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0"
        >
          {phase === "in" ? "Pending" : "Confirmed"}
        </motion.span>
      </motion.div>

      {/* Counter */}
      <div className="w-full bg-white rounded-2xl px-4 py-3 shadow-sm border border-[#F0EFEC] flex items-center justify-between">
        <div className="text-[11px] text-[#71717A]">Total orders this week</div>
        <motion.span className="text-[16px] font-bold text-[#183E34]">
          {rounded}
        </motion.span>
      </div>
    </div>
  );
}

// ─── Card 3 graphic: progress bar fills, badge appears ────────────────────
const DAYS = ["Day 1", "Day 2", "Day 3"];

function CertGraphic() {
  const [step, setStep] = useState(-1);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeouts: ReturnType<typeof setTimeout>[] = [];

    function cycle() {
      setStep(-1);
      setDone(false);
      DAYS.forEach((_, i) => {
        timeouts.push(setTimeout(() => setStep(i), 600 + i * 900));
      });
      timeouts.push(setTimeout(() => setDone(true), 600 + DAYS.length * 900 + 200));
      timeouts.push(setTimeout(() => cycle(), 600 + DAYS.length * 900 + 2200));
    }
    cycle();
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5 px-8">
      {/* Steps */}
      <div className="w-full flex items-center gap-0">
        {DAYS.map((d, i) => (
          <div key={d} className="flex-1 flex flex-col items-center gap-1.5">
            <motion.div
              animate={{ backgroundColor: step >= i ? "#183E34" : "#E4E2DE" }}
              transition={{ duration: 0.4 }}
              className="w-7 h-7 rounded-full flex items-center justify-center"
            >
              {step >= i && (
                <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              )}
            </motion.div>
            <div className="text-[10px] text-[#71717A]">{d}</div>
            {/* Connector */}
            {i < DAYS.length - 1 && (
              <div className="absolute" style={{ display: "none" }} />
            )}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-[#E4E2DE] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#183E34] rounded-full"
          animate={{ width: step >= 0 ? `${((step + 1) / DAYS.length) * 100}%` : "0%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>

      {/* Badge */}
      <motion.div
        animate={{ opacity: done ? 1 : 0, scale: done ? 1 : 0.85 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="flex items-center gap-2 bg-[#D1FAE5] text-[#065F46] text-[11px] font-semibold px-3.5 py-2 rounded-full"
      >
        <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="9" stroke="#065F46" strokeWidth="1.5"/>
          <path d="M6 10l3 3 5-5" stroke="#065F46" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        HomePlate Certified
      </motion.div>
    </div>
  );
}

// ─── Main section ──────────────────────────────────────────────────────────
const CARDS = [
  {
    title: "Recipe Database",
    desc: "A library of 50+ medically tailored menu items, developed with senior dietitians and chefs to meet a range of dietary and health conditions.",
    Graphic: RecipeGraphic,
  },
  {
    title: "Ordering & Management",
    desc: "A clean dashboard that integrates with your existing software — handling order intake, menu updates, and weekly forecasting in one place.",
    Graphic: OrderGraphic,
  },
  {
    title: "Staff Training & Certification",
    desc: "A three-day certification program that equips your kitchen team to expand their menu and meet HomePlate's quality standards.",
    Graphic: CertGraphic,
  },
];

export default function WhatWeProvide() {
  return (
    <section className="px-4 sm:px-10 lg:px-20 py-12 sm:py-16 lg:py-24" id="provide">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8 sm:mb-14"
      >
        <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#183E34] mb-4">
          What We Provide
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10 items-end">
          <h2 className="text-[clamp(24px,3vw,42px)] font-normal tracking-[-0.03em] leading-[1.18] text-[#1A1A1A]">
            Everything a senior center needs to run a meal program.
          </h2>
          <p className="text-[15px] text-[#71717A] leading-[1.75]">
            From kitchen to doorstep — we handle the systems, training, and tools so your team can focus on what they do best.
          </p>
        </div>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {CARDS.map((c, i) => {
          const { Graphic } = c;
          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              className="bg-white border border-[#E4E2DE] rounded-2xl overflow-hidden flex flex-col"
            >
              {/* Graphic area */}
              <div className="h-[220px] bg-[#F7F5F2] border-b border-[#E4E2DE] relative overflow-hidden">
                <Graphic />
              </div>

              {/* Text */}
              <div className="p-6 flex flex-col gap-2">
                <h3 className="text-[15px] font-semibold text-[#1A1A1A]">{c.title}</h3>
                <p className="text-[13.5px] text-[#71717A] leading-[1.68]">{c.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
