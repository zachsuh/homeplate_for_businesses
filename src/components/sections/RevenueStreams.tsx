"use client";
import { motion } from "framer-motion";

const streams = [
  {
    n: "01",
    title: "Residents in your facility",
    desc: "Supplement your existing dining program with medically tailored meals for residents managing chronic conditions.",
  },
  {
    n: "02",
    title: "Independent seniors nearby",
    desc: "Your kitchen becomes a community hub for seniors living at home who need medically appropriate meals delivered or for pickup.",
  },
  {
    n: "03",
    title: "Insurance-referred patients",
    desc: "Medicare Advantage and managed care plans are increasingly covering medically tailored meals. HomePlate connects you to those referral networks.",
  },
];

export default function RevenueStreams() {
  return (
    <section className="px-4 sm:px-10 lg:px-20 py-12 sm:py-16 lg:py-24" id="streams">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8 sm:mb-14"
      >
        <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#183E34] mb-4">
          Revenue Streams
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10 items-end">
          <h2 className="text-[clamp(24px,3vw,42px)] font-normal tracking-[-0.03em] leading-[1.18] text-[#1A1A1A]">
            Three revenue streams.<br />One kitchen.
          </h2>
          <p className="text-[15px] text-[#71717A] leading-[1.75]">
            Your certified kitchen can serve your existing residents, your broader community,
            and insurance-referred patients — all through one HomePlate portal,
            all generating revenue from the same prep window.
          </p>
        </div>
      </motion.div>

      {/* Stream cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {streams.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
            className="bg-white border border-[#E4E2DE] rounded-2xl p-7 flex flex-col gap-5"
          >
            <span className="text-[13px] font-normal text-[#BBBBBB]">{s.n}</span>
            <div>
              <h3 className="text-[16px] font-medium text-[#1A1A1A] mb-2 leading-snug">{s.title}</h3>
              <p className="text-[13.5px] text-[#71717A] leading-[1.68]">{s.desc}</p>
            </div>
            <div className="mt-auto pt-4 border-t border-[#F0EFEC]">
              <div className="w-6 h-6 rounded-full bg-[#EDF4F0] flex items-center justify-center">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 9.5l7-7M9.5 9.5V2.5H2.5" stroke="#183E34" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
