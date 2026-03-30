"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What is HomePlate?",
    a: "HomePlate helps senior living kitchens turn unused capacity into medically tailored meal production for seniors living at home.",
  },
  {
    q: "Who is it for?",
    a: "Senior living communities, assisted living kitchens, and healthcare food service teams with existing staff and kitchen space.",
  },
  {
    q: "Do we need to change our setup?",
    a: "No. HomePlate is designed to fit into your current kitchen operations with minimal changes.",
  },
  {
    q: "Where do recipes come from?",
    a: "Our R&D team works with dietitians, chefs, and senior care partners to develop practical, nutritious meals.",
  },
  {
    q: "Do you integrate with our existing systems?",
    a: "Yes. We integrate with POS systems like Toast and Square, plus inventory tools and USDA nutrition databases. HomePlate works alongside your existing systems without disruption.",
  },
  {
    q: "Do we need technical staff?",
    a: "No. The platform is built for chefs and operators — no technical background required.",
  },
  {
    q: "Who handles delivery?",
    a: "We coordinate delivery through third-party logistics partners integrated into your workflow. You set your delivery range, and we help optimize based on cost and demand.",
  },
  {
    q: "How does the revenue split work?",
    a: "It's flexible and customized based on volume and level of support. Our team builds a custom revenue projection during your free assessment.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="max-w-[800px] mx-auto px-4 sm:px-8 py-12 sm:py-16 lg:py-20" id="faq">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="text-[clamp(24px,3vw,32px)] font-black tracking-[-0.04em] mb-10 text-center"
      >
        Questions we can answer
      </motion.h2>

      <div>
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="border-b border-[#E4E2DE]"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between py-5 text-left text-[16px] font-medium text-[#1A1A1A] gap-5 cursor-pointer bg-transparent border-none hover:text-[#1A1A1A] transition-colors"
            >
              {faq.q}
              <motion.span
                animate={{ rotate: open === i ? 180 : 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="shrink-0"
              >
                <ChevronDown size={18} className="text-[#71717A]" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="text-[15px] text-[#71717A] leading-[1.72] pb-5">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
