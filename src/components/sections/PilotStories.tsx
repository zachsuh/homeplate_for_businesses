"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const WORD = "NEW ";
const CELLS = Array.from({ length: 200 }, (_, i) => ({
  char: WORD[i % 4],
  bright: (i * 13 + i % 5 * 7) % 10 > 4,
}));

export default function PilotStories() {
  const cells = CELLS;

  return (
    <section className="px-10 pb-16" id="pilot">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#E8470A] rounded-[20px] overflow-hidden p-12 grid grid-cols-[280px_1fr] gap-10 min-h-[240px] relative"
      >
        {/* Text */}
        <div className="relative z-10">
          <div className="mb-4">
            <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
              <path d="M4 8L28 8L28 22L16 30L4 22Z" fill="white" fillOpacity="0.9" />
              <path d="M8 10L24 10L24 21L16 27L8 21Z" fill="rgba(232,71,10,0.3)" />
            </svg>
          </div>
          <h2 className="text-[28px] font-black text-white tracking-[-0.04em] mb-2">
            HomePlate Pilot Stories
          </h2>
          <p className="text-[14px] text-white/70 mb-6 leading-[1.65]">
            Real senior centers. Real kitchens. Real results from our earliest partners.
          </p>
          <motion.button
            whileHover={{ borderColor: "white" }}
            className="inline-flex items-center gap-2 bg-transparent text-white border border-white/40 rounded-xl px-4 py-2.5 text-[13px] font-semibold cursor-pointer transition-colors"
          >
            Visit <ArrowRight size={13} />
          </motion.button>
        </div>

        {/* "NEW" grid */}
        <div className="grid overflow-hidden" style={{ gridTemplateColumns: "repeat(20, 1fr)", gap: "5px", alignContent: "start" }}>
          {cells.map((c, i) => (
            <span
              key={i}
              className={`lc text-[10.5px] font-bold select-none tracking-[0.02em] ${c.bright ? "!text-white/32" : "!text-white/14"}`}
            >
              {c.char}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
