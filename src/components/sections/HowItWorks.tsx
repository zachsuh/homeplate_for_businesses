"use client";
import { motion } from "framer-motion";

const steps = [
  {
    n: "1",
    title: "Onboard",
    desc: "We assess your kitchen, confirm compliance, and configure your HomePlate ordering portal. Most partners are ready within two weeks.",
  },
  {
    n: "2",
    title: "Train",
    desc: "Our team trains your kitchen staff on medical dietary protocols — diabetes, heart disease, renal, and dysphagia-specific menus. No dietitian required.",
  },
  {
    n: "3",
    title: "Launch",
    desc: "We run your local marketing — digital ads, physician referrals, and community outreach — to drive orders directly to your location.",
  },
  {
    n: "4",
    title: "Earn",
    desc: "You keep a cut of every meal sold. The more your community orders, the more you make — with no per-meal fees to HomePlate.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-10 pb-20" id="how">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#E8470A] rounded-[20px] overflow-hidden px-16 py-16 relative noise"
      >
        {/* Background decorative lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute w-full h-px bg-white" style={{ top: `${12 + i * 12}%` }} />
          ))}
        </div>

        <h2 className="text-[clamp(26px,3.5vw,44px)] font-black text-white tracking-[-0.045em] leading-[1.1] mb-3 relative z-10">
          Behind Every Meal.<br />How HomePlate Works.
        </h2>
        <p className="text-[16px] text-white/70 mb-12 relative z-10">
          From kitchen assessment to your first paying order — in as little as two weeks.
        </p>

        <div className="grid grid-cols-4 gap-5 relative z-10">
          {/* Connector line */}
          <div className="absolute top-[27px] left-[12.5%] right-[12.5%] h-px bg-white/20 hidden lg:block" />

          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="bg-white/12 border border-white/20 rounded-2xl p-7 backdrop-blur-sm relative"
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[14px] font-black text-[#E8470A] mb-4 shadow-md">
                {step.n}
              </div>
              <h3 className="text-[16px] font-bold text-white mb-2">{step.title}</h3>
              <p className="text-[13px] text-white/70 leading-[1.62]">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Decorative illustrations */}
        <svg className="absolute bottom-0 left-4 opacity-40 pointer-events-none" width="120" height="100" viewBox="0 0 140 120" fill="none">
          <rect x="10" y="20" width="100" height="80" rx="4" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
          <rect x="22" y="32" width="30" height="30" rx="2" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
          <path d="M6 10 L70 2 L134 10" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
          <circle cx="70" cy="2" r="3" fill="rgba(255,255,255,0.45)"/>
          <circle cx="10" cy="20" r="3" fill="rgba(255,255,255,0.45)"/>
        </svg>
        <svg className="absolute bottom-0 right-4 opacity-40 pointer-events-none" width="120" height="110" viewBox="0 0 140 120" fill="none">
          <circle cx="70" cy="55" r="45" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 3"/>
          <circle cx="70" cy="55" r="28" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
          <circle cx="70" cy="55" r="12" fill="rgba(255,255,255,0.1)"/>
          <circle cx="42" cy="35" r="4" fill="rgba(255,255,255,0.5)"/>
          <circle cx="98" cy="35" r="4" fill="rgba(255,255,255,0.5)"/>
          <circle cx="70" cy="20" r="4" fill="rgba(255,255,255,0.5)"/>
          <circle cx="98" cy="75" r="4" fill="rgba(255,255,255,0.5)"/>
        </svg>
      </motion.div>
    </section>
  );
}
