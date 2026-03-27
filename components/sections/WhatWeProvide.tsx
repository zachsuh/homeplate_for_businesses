"use client";
import { motion } from "framer-motion";
import { ClipboardList, LayoutDashboard, Users, Megaphone } from "lucide-react";

const cards = [
  {
    icon: <ClipboardList size={20} />,
    title: "Medically Designed Menus",
    desc: "Diabetes-friendly, low-sodium, renal, and texture-modified protocols developed with clinical dietitians. Your kitchen executes. We handle the nutrition science.",
  },
  {
    icon: <LayoutDashboard size={20} />,
    title: "Ordering & Management Software",
    desc: "A simple portal that takes orders, manages subscriptions, tracks dietary profiles, and routes tickets straight to your kitchen. No new tech headaches.",
  },
  {
    icon: <Users size={20} />,
    title: "Staff Training & Certification",
    desc: "We come to you. Your team learns the protocols, the portioning, and the packaging standards. Ongoing support included at no extra cost.",
  },
  {
    icon: <Megaphone size={20} />,
    title: "Done-For-You Marketing",
    desc: "Local digital campaigns, physician office outreach, and community awareness programs that bring paying customers to your door — not yours to manage.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function WhatWeProvide() {
  return (
    <section className="px-20 py-20" id="provide">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-2 gap-10 mb-12 items-end"
      >
        <h2 className="text-[clamp(24px,2.8vw,38px)] font-black tracking-[-0.04em] leading-[1.2]">
          Everything You Need.<br />Nothing You Don't.
        </h2>
        <p className="text-[15px] text-[#71717A] leading-[1.72]">
          HomePlate handles the complexity so your kitchen team can focus on cooking.
          We bring the menus, the software, the training, and the customers — you bring the kitchen.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-2 gap-4"
      >
        {cards.map((c) => (
          <motion.div
            key={c.title}
            variants={card}
            whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
            className="bg-white border border-[#E4E2DE] rounded-2xl p-7 cursor-default transition-shadow"
          >
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#E8470A] mb-5">
              {c.icon}
            </div>
            <h3 className="text-[16px] font-bold text-[#18181B] mb-2">{c.title}</h3>
            <p className="text-[14px] text-[#71717A] leading-[1.67]">{c.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
