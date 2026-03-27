"use client";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";

const bullets = [
  "Commercial kitchen certified & staffed, running at 40% capacity",
  "Thousands of local seniors managing chronic disease without proper nutrition",
  "Medicare Advantage plans now covering medically tailored meals",
  "The gap between unused capacity and unmet need is where HomePlate lives",
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export default function Problem() {
  return (
    <section className="max-w-[1280px] mx-auto px-20 py-28 grid grid-cols-2 gap-20 items-center">
      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-[clamp(28px,3vw,44px)] font-black tracking-[-0.045em] leading-[1.15] mb-4">
          Senior Center Kitchens Are the Most Underused Asset in Senior Care
        </h2>
        <p className="text-[16px] text-[#71717A] leading-[1.72] mb-7">
          Every day, your commercial kitchen sits idle between meal services. Your staff is trained,
          your equipment is certified, your health permits are paid for — and none of it is generating
          a return for hours at a time.
        </p>
        <motion.ul variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="space-y-3 mb-9">
          {bullets.map((b) => (
            <motion.li key={b} variants={item} className="flex items-start gap-3 text-[15px] text-[#3F3F46]">
              <CheckCircle size={18} className="text-[#E8470A] shrink-0 mt-0.5" />
              {b}
            </motion.li>
          ))}
        </motion.ul>
        <div className="flex items-center gap-5">
          <motion.a
            href="#apply"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-[#E8470A] text-white px-5 py-2.5 rounded-xl text-[14px] font-semibold no-underline hover:bg-[#C73D08] transition-colors"
          >
            Get a Free Partnership Demo <ArrowRight size={14} />
          </motion.a>
          <button className="text-[14px] font-medium text-[#3F3F46] hover:text-[#E8470A] transition-colors flex items-center gap-1.5 bg-transparent border-none cursor-pointer">
            Learn more <ArrowRight size={14} />
          </button>
        </div>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#E8470A] rounded-[20px] overflow-hidden p-7 flex flex-col gap-3 min-h-[400px]"
      >
        <div className="bg-white/20 rounded-xl px-4 py-2.5 flex items-center gap-2 text-[13px] font-semibold text-white">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M7 2v3M13 2v3M3 9h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
          Kitchen Capacity Dashboard
        </div>
        {[
          { name: "Diabetic-Friendly Plate", num: "HP-001", tag: "New Order", tagColor: "orange", protocol: "Type 2 Diabetes", cal: "480 kcal", patient: "Margaret Chen", time: "Today 12:00 PM" },
          { name: "Renal-Safe Meal", num: "HP-002", tag: "In Prep", tagColor: "green", protocol: "Chronic Kidney", cal: "< 800mg Na", patient: "Robert Davis", time: "Today 12:30 PM" },
          { name: "Heart-Healthy Entrée", num: "HP-003", tag: "Scheduled", tagColor: "amber", protocol: "Heart Disease", cal: "3 meals", patient: "Revenue:", time: "$42.00" },
        ].map((card) => (
          <motion.div
            key={card.num}
            whileHover={{ scale: 1.01 }}
            className="bg-white rounded-2xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-[14px] font-bold text-[#18181B]">{card.name}</div>
                <div className="text-[12px] text-[#71717A]">Menu #{card.num}</div>
              </div>
              <span className={`text-[10.5px] font-bold px-2.5 py-1 rounded-full ${
                card.tagColor === "orange" ? "bg-orange-50 text-orange-600" :
                card.tagColor === "green" ? "bg-green-50 text-green-600" :
                "bg-amber-50 text-amber-600"
              }`}>
                {card.tag}
              </span>
            </div>
            <div className="space-y-1">
              {[["Dietary Protocol", card.protocol], ["Details", card.cal], [card.patient.startsWith("Revenue") ? "Revenue" : "Patient", card.patient.startsWith("Revenue") ? card.time : card.patient], ["Delivery", card.patient.startsWith("Revenue") ? "" : card.time]].filter(r => r[1]).map(([k, v]) => (
                <div key={k} className="flex justify-between text-[12.5px]">
                  <span className="text-[#71717A]">{k}:</span>
                  <span className="text-[#18181B] font-medium">{v}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
