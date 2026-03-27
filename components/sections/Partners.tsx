"use client";
import { motion } from "framer-motion";
import { Star, Calendar, Users, BarChart2, ArrowRight } from "lucide-react";

const feats = [
  { icon: <Star size={22} />, title: "Revenue share on all accounts", desc: "Keep a meaningful cut of every meal sold through your kitchen." },
  { icon: <Calendar size={22} />, title: "Scale across your network", desc: "Multi-location operators can roll out across all facilities simultaneously." },
  { icon: <Users size={22} />, title: "Dedicated partner success manager", desc: "A named point of contact who owns your onboarding and ongoing growth." },
  { icon: <BarChart2 size={22} />, title: "Marketing co-op programs", desc: "Joint campaigns and physician referral outreach funded and managed by HomePlate." },
];

export default function Partners() {
  return (
    <section className="max-w-[1280px] mx-auto px-20 py-16 grid grid-cols-2 gap-16 items-start" id="partner">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-[clamp(24px,2.8vw,34px)] font-black tracking-[-0.04em] mb-3">
          Partner with HomePlate
        </h2>
        <p className="text-[15px] text-[#71717A] leading-[1.72] mb-6">
          Expand your facility's impact and revenue with HomePlate's proven medical meal program.
          We handle setup, menus, training, and marketing while you maintain relationships
          with your residents and community.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })}
          className="inline-flex items-center gap-2 bg-[#18181B] text-white px-5 py-2.5 rounded-xl text-[14px] font-semibold cursor-pointer border-none hover:opacity-85 transition-opacity"
        >
          Become a Partner <ArrowRight size={14} />
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {feats.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, boxShadow: "0 10px 32px rgba(0,0,0,0.08)" }}
            className="bg-white border border-[#E4E2DE] rounded-2xl p-6 cursor-default transition-shadow"
          >
            <div className="text-[#71717A] mb-4">{f.icon}</div>
            <h3 className="text-[15px] font-semibold text-[#18181B] mb-1 leading-[1.4]">{f.title}</h3>
            <p className="text-[13px] text-[#71717A] leading-[1.57]">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
