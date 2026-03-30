"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What is HomePlate and how does it help my senior center?",
    a: "HomePlate is a turnkey medical meal program for senior center kitchens. We provide everything needed to launch a medically-tailored meal service using your existing staff and equipment — including menus, software, training, and done-for-you marketing. You earn revenue from every meal sold without adding staff or managing the complexity yourself.",
  },
  {
    q: "How quickly can we set up the HomePlate program?",
    a: "Most partner kitchens are ready to take their first orders within two weeks. Our onboarding includes a kitchen assessment, compliance confirmation, software setup, and staff training — all handled by our team on your timeline. We do not require any construction, equipment upgrades, or new hires to get started.",
  },
  {
    q: "Does HomePlate work with our current kitchen setup and certifications?",
    a: "Yes. If your kitchen already holds a valid commercial food service permit, we can typically build on your existing certifications. Our onboarding team reviews your current health permits and HACCP compliance, then identifies any gaps we need to address before launch. Most certified senior center kitchens qualify without additional licensing.",
  },
  {
    q: "Can HomePlate handle both residents and community seniors?",
    a: "Absolutely. HomePlate is designed to serve three distinct customer groups from a single kitchen: your on-site residents with chronic conditions, independent seniors in the surrounding community, and insurance-referred patients through Medicare Advantage and managed care partnerships.",
  },
  {
    q: "What are the costs and how does the revenue share work?",
    a: "There are no per-meal fees to HomePlate. Partners pay a flat program fee that covers onboarding, software, training, and marketing support. You keep a significant percentage of every meal sold — actual figures depend on your location, meal volume, and insurance mix. Our team builds a custom revenue projection during your free assessment call.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="max-w-[800px] mx-auto px-10 py-20" id="faq">
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
