"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Bell } from "lucide-react";

export default function ROISection() {
  const [meals, setMeals] = useState(150);
  const [price, setPrice] = useState(14);

  const gross = Math.round(meals * price * 4.33);

  return (
    <section className="max-w-[1280px] mx-auto px-20 py-20 grid grid-cols-2 gap-20 items-center" id="roi">
      {/* Left */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        {/* Calculator */}
        <div className="bg-white border border-[#E4E2DE] rounded-2xl p-6">
          <div className="flex items-center gap-2 text-[13px] font-semibold text-[#3F3F46] mb-5">
            <FileText size={15} className="text-[#1A1A1A]" />
            ROI Calculator
          </div>

          <div className="mb-5">
            <div className="flex justify-between text-[13px] font-medium text-[#1A1A1A] mb-2">
              <span>Meals per week</span>
              <span className="text-[#1A1A1A] font-bold">{meals}</span>
            </div>
            <input
              type="range" min={50} max={500} value={meals}
              onChange={(e) => setMeals(Number(e.target.value))}
            />
          </div>

          <div className="mb-5">
            <div className="flex justify-between text-[13px] font-medium text-[#1A1A1A] mb-2">
              <span>Average meal price</span>
              <span className="text-[#1A1A1A] font-bold">${price}</span>
            </div>
            <input
              type="range" min={10} max={22} value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>

          <motion.div
            key={gross}
            initial={{ opacity: 0.6, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#EDF4F0] rounded-xl px-4 py-3.5"
          >
            <div className="text-[23px] font-black text-[#1A1A1A]">
              ${gross.toLocaleString()}
            </div>
            <div className="text-[13px] text-[#71717A]">Monthly gross revenue</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        className="bg-[#183E34] rounded-[20px] overflow-hidden p-7 flex flex-col gap-3 min-h-[460px]"
      >
        <div className="bg-white rounded-full px-4 py-2 inline-flex items-center gap-2 text-[13px] font-semibold text-[#1A1A1A] self-start mb-2">
          <span className="w-2 h-2 rounded-full bg-green-500 blink-dot" />
          Active Subscriptions
        </div>

        <div className="grid grid-cols-2 gap-3 flex-1">
          {[
            { num: "14", name: "Margaret Chen", diet: "Diabetic Protocol", tag: "Active", tagStyle: "bg-[#EDF4F0] text-orange-600", freq: "Weekly", delivery: "Mon & Thu", ins: "MA Plan A" },
            { num: "15", name: "Jack Williams", diet: "Renal Protocol", tag: "Active", tagStyle: "bg-[#EDF4F0] text-orange-600", freq: "Daily", delivery: "7 meals/wk", ins: "Self-pay" },
            { num: "16", name: "Eleanor Brooks", diet: "Heart-Healthy", tag: "Pending", tagStyle: "bg-red-50 text-red-500", freq: "Bi-weekly", delivery: "Tue & Fri", ins: "Verifying" },
            { num: "17", name: "Robert Davis", diet: "Dysphagia", tag: "Active", tagStyle: "bg-[#EDF4F0] text-orange-600", freq: "Daily", delivery: "$98/wk", ins: "MA Plan B" },
          ].map((sub) => (
            <motion.div
              key={sub.num}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-4"
            >
              <div className="flex justify-between items-start mb-2.5">
                <span className="text-[11px] font-semibold text-[#71717A]">Sub #{sub.num}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${sub.tagStyle}`}>{sub.tag}</span>
              </div>
              <div className="text-[14px] font-bold text-[#1A1A1A] mb-0.5">{sub.name}</div>
              <div className="text-[11px] text-[#71717A] mb-3">{sub.diet}</div>
              <div className="space-y-1">
                {[["Meals", sub.freq], ["Delivery", sub.delivery], ["Insurance", sub.ins]].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-[11px]">
                    <span className="text-[#71717A]">{k}:</span>
                    <span className="text-[#1A1A1A] font-medium">{v}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 py-1.5 bg-[#EDEBE6] border border-[#E4E2DE] rounded-lg text-[11px] font-medium text-[#3F3F46] flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#E4E2DE] transition-colors">
                <Bell size={11} /> Send reminder
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
