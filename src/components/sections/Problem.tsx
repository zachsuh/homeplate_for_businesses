"use client";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";

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
  show: { opacity: 1, x: 0, transition: { duration: 0.55 } },
};

export default function Problem() {
  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-10 lg:px-20 py-12 sm:py-16 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <h2 className="text-[clamp(28px,3vw,44px)] font-normal tracking-[-0.02em] leading-[1.15] mb-4">
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
              <CheckCircle size={18} className="text-[#1A1A1A] shrink-0 mt-0.5" />
              {b}
            </motion.li>
          ))}
        </motion.ul>
        <div className="flex items-center gap-5">
          <motion.a
            href="#apply"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-[#183E34] text-white px-5 py-2.5 rounded-xl text-[14px] font-semibold no-underline hover:bg-[#122D26] transition-colors"
          >
            Get a Free Partnership Demo <ArrowRight size={14} />
          </motion.a>
          <button className="text-[14px] font-medium text-[#3F3F46] hover:text-[#1A1A1A] transition-colors flex items-center gap-1.5 bg-transparent border-none cursor-pointer">
            Learn more <ArrowRight size={14} />
          </button>
        </div>
      </motion.div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        className="flex items-center justify-center"
      >
        <Image
          src="/images/dashboard/customergraphic.png"
          alt="Customer order management"
          width={500}
          height={600}
          className="w-full h-auto rounded-[20px]"
        />
      </motion.div>
    </section>
  );
}
