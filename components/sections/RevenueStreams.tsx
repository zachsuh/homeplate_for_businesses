"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";

const streams = [
  {
    n: "1",
    title: "Residents in your facility",
    desc: "Supplement your existing dining program with medically tailored meals for residents managing chronic conditions.",
  },
  {
    n: "2",
    title: "Independent seniors nearby",
    desc: "Your kitchen becomes a community hub for seniors living at home who need medically appropriate meals delivered or for pickup.",
  },
  {
    n: "3",
    title: "Insurance-referred patients",
    desc: "Medicare Advantage and managed care plans are increasingly covering medically tailored meals. HomePlate connects you to those referral networks.",
  },
];

const WORD = "HOMEPLATEHP";

export default function RevenueStreams() {
  const letters = useMemo(() =>
    Array.from({ length: 110 }, (_, i) => ({
      char: WORD[i % WORD.length],
      bright: Math.random() > 0.6,
    })), []);

  return (
    <section className="px-10 pb-20" id="streams">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#E8470A] rounded-[20px] overflow-hidden px-16 py-16 grid grid-cols-2 gap-16 items-center min-h-[460px] relative"
      >
        {/* Left text */}
        <div>
          <h2 className="text-[clamp(26px,3vw,40px)] font-black text-white tracking-[-0.045em] leading-[1.15] mb-4">
            Three Revenue Streams.<br />One Kitchen.
          </h2>
          <p className="text-[15px] text-white/72 leading-[1.65]">
            Your certified kitchen can serve your existing residents, your broader community,
            and insurance-referred patients — all through one HomePlate portal,
            all generating revenue from the same prep window.
          </p>
        </div>

        {/* Right: letter grid + cards overlay */}
        <div className="relative">
          {/* Letter grid */}
          <div className="grid grid-cols-10 gap-1 absolute inset-0 pointer-events-none">
            {letters.map((l, i) => (
              <span
                key={i}
                className={`lc text-[10.5px] font-semibold text-center py-0.5 select-none ${l.bright ? "!text-white/45" : "!text-white/15"}`}
              >
                {l.char}
              </span>
            ))}
          </div>

          {/* Cards */}
          <div className="relative z-10 flex flex-col gap-3">
            {streams.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 4 }}
                className="bg-white/15 border border-white/25 rounded-2xl px-5 py-4 text-white backdrop-blur-sm"
              >
                <div className="w-5 h-5 bg-white/25 rounded-full flex items-center justify-center text-[10px] font-bold mb-3">
                  {s.n}
                </div>
                <h3 className="text-[14px] font-bold mb-1.5">{s.title}</h3>
                <p className="text-[12.5px] text-white/70 leading-[1.55]">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
