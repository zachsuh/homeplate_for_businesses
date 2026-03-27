"use client";
import { motion } from "framer-motion";

const logos = [
  "Sunrise Senior Living", "Brookdale Community", "Elder Care Partners",
  "Heritage House", "Harmony Senior Center", "Golden Years Village",
  "Caring Hands Senior", "Meadowbrook Senior", "Valley View Care",
  "Sunrise Senior Living", "Brookdale Community", "Elder Care Partners",
  "Heritage House", "Harmony Senior Center", "Golden Years Village",
  "Caring Hands Senior", "Meadowbrook Senior", "Valley View Care",
];

export default function MarqueeSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="overflow-hidden py-8 border-t border-b border-[#E4E2DE] bg-[#EDEBE6] marquee-wrap mt-20"
    >
      <div className="flex gap-14 items-center marquee-track w-max">
        {logos.map((name, i) => (
          <span
            key={i}
            className="text-[17px] font-bold text-[#71717A] opacity-40 whitespace-nowrap tracking-[-0.02em] hover:opacity-70 transition-opacity cursor-default select-none"
          >
            {name}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
