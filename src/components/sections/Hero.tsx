"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarCheck, CreditCard, MessageSquare, ClipboardList, FileText } from "lucide-react";
import Image from "next/image";

const tabs = [
  { id: "attendance",    label: "Attendance",    icon: CalendarCheck, src: "/dashboard/attendence.webp" },
  { id: "billing",       label: "Billing",       icon: CreditCard,    src: "/dashboard/billing.webp" },
  { id: "communication", label: "Communication", icon: MessageSquare, src: "/dashboard/communication.webp" },
  { id: "registration",  label: "Registration",  icon: ClipboardList, src: "/dashboard/registration.webp" },
  { id: "paperwork",     label: "Paperwork",     icon: FileText,      src: "/dashboard/paperwork.webp" },
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(1);

  function goTo(index: number) {
    setDirection(index > activeTab ? 1 : -1);
    setActiveTab(index);
  }

  function prev() {
    const next = (activeTab - 1 + tabs.length) % tabs.length;
    setDirection(-1);
    setActiveTab(next);
  }

  function next() {
    const next = (activeTab + 1) % tabs.length;
    setDirection(1);
    setActiveTab(next);
  }

  return (
    <section className="pt-20 pb-0 text-center overflow-hidden bg-white">
      {/* ── Top text block ── */}
      <div className="max-w-[780px] mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-[var(--font-poppins)] text-[clamp(36px,5.5vw,68px)] font-normal tracking-[-0.02em] leading-[1.12] text-[#1A1A1A] mb-5"
        >
          Medically tailored meal&nbsp;management{" "}
          <span className="text-[#1A1A1A]">senior centers love</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="text-[17px] text-[#52525B] max-w-[520px] mx-auto mb-7 leading-[1.65]"
        >
          Everything your senior center needs to run a medically tailored meal
          program — menus, software, billing, and compliance in one place.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25, ease: "easeOut" }}
          className="flex items-center justify-center mb-5"
        >
          <a href="#apply" className="bg-[#183E34] hover:bg-[#122D26] transition-colors text-white font-semibold text-[15px] px-7 py-3.5 rounded-xl shadow-sm cursor-pointer no-underline inline-block">
            Get a free demo
          </a>
        </motion.div>
      </div>

      {/* ── Tab strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
        className="mt-10 flex items-center justify-center gap-3 px-4"
      >
        {/* Left arrow */}
        <button
          onClick={prev}
          className="shrink-0 w-8 h-8 flex items-center justify-center text-[#A8A29E] hover:text-[#57534E] transition-colors cursor-pointer"
          aria-label="Previous tab"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Pill container */}
        <div className="bg-[#F2EDE6] rounded-full p-1.5 flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            const active = activeTab === i;
            return (
              <button
                key={tab.id}
                onClick={() => goTo(i)}
                className="relative shrink-0 cursor-pointer"
              >
                {active && (
                  <motion.div
                    layoutId="tab-pill"
                    className="absolute inset-0 bg-white rounded-full shadow-sm"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
                <span
                  className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-[13.5px] font-semibold whitespace-nowrap transition-colors
                    ${active ? "text-[#1A1A1A]" : "text-[#A8A29E] hover:text-[#78716C]"}`}
                >
                  <Icon size={14} strokeWidth={2.2} />
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right arrow */}
        <button
          onClick={next}
          className="shrink-0 w-8 h-8 flex items-center justify-center text-[#A8A29E] hover:text-[#57534E] transition-colors cursor-pointer"
          aria-label="Next tab"
        >
          <ChevronRight size={18} />
        </button>
      </motion.div>

      {/* ── Dashboard screenshot ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.45, ease: "easeOut" }}
        className="mt-8 max-w-[1100px] mx-auto px-4 relative"
      >
        <div className="relative overflow-hidden rounded-t-xl shadow-[0_8px_60px_rgba(0,0,0,0.13)]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeTab}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Image
                src={tabs[activeTab].src}
                alt={`${tabs[activeTab].label} dashboard`}
                width={1100}
                height={700}
                className="w-full h-auto object-cover"
                priority={activeTab === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </section>
  );
}
