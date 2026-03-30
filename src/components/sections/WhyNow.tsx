"use client";
import { motion } from "framer-motion";
import { Layers, Clock, ArrowRight } from "lucide-react";

const feats = [
  {
    icon: <Layers size={18} />,
    title: "Medicare Advantage Coverage",
    desc: "MA plans are adding medically tailored meal benefits. Partner kitchens in our network are positioned for those reimbursement flows.",
  },
  {
    icon: <Clock size={18} />,
    title: "Food-as-Medicine Is Now Clinical",
    desc: "Health systems are building referral networks for medically tailored meals. The window to become a preferred partner is now.",
  },
  {
    icon: <ArrowRight size={18} />,
    title: "First-Mover Advantage",
    desc: "Senior centers that build this capacity now will be the preferred partners when physician referral networks open at scale.",
  },
];

export default function WhyNow() {
  return (
    <section className="px-10 py-10" id="why">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-[#183E34] rounded-[20px] p-14"
      >
        <h2 className="text-[clamp(22px,2.8vw,34px)] font-black text-white tracking-[-0.04em] mb-4">
          The Timing Has Never Been Better
        </h2>
        <p className="text-[15px] text-white/55 leading-[1.78] max-w-[680px] mb-10">
          Chronic disease management through nutrition is moving from a wellness trend to a clinical
          standard. Medicare Advantage plans are adding medically tailored meal benefits. Health
          systems are building food-as-medicine referral networks. Senior centers that build this
          capacity now will be the preferred partners when those referral flows open up.
        </p>

        <div className="grid grid-cols-3 gap-4">
          {feats.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="bg-white/[0.05] border border-white/[0.08] rounded-2xl p-6"
            >
              <div className="w-9 h-9 bg-[#EDF4F0]0/20 rounded-xl flex items-center justify-center text-[#1A1A1A] mb-5">
                {f.icon}
              </div>
              <h3 className="text-[15px] font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-[13px] text-white/45 leading-[1.62]">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
