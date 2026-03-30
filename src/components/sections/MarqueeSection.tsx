"use client";
import { motion } from "framer-motion";
import Image from "next/image";

// Each integration partner logo — drop new files into /public/images/logosintegration/
// and add an entry here to include them in the carousel.
const logos = [
  { src: "/images/logosintegration/pointclickcare.svg", alt: "PointClickCare", width: 220, height: 48 },
  { src: "/images/logosintegration/stripe.svg",         alt: "Stripe",          width: 80,  height: 48 },
  { src: "/images/logosintegration/doordash.svg",       alt: "DoorDash Drive",  width: 170, height: 48 },
  { src: "/images/logosintegration/uberdirect.svg",     alt: "Uber Direct",     width: 130, height: 48 },
  { src: "/images/logosintegration/hhaexchange.svg",    alt: "HHAeXchange",     width: 175, height: 48 },
  { src: "/images/logosintegration/quickbooks.svg",     alt: "QuickBooks",      width: 160, height: 48 },
  { src: "/images/logosintegration/Toast_logo.svg.png", alt: "Toast",           width: 130, height: 48 },
  { src: "/images/logosintegration/USDA_logo.png",      alt: "USDA",            width: 110, height: 48 },
];

// We duplicate the list so the CSS marquee loops seamlessly — the animation
// scrolls left by exactly 50% of the total width, then resets invisibly.
const doubled = [...logos, ...logos];

export default function MarqueeSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="marquee-section mt-6 border-t border-b border-[#E4E2DE] bg-[#F7F5F2] py-6"
    >
      {/* Headline */}
      <p className="text-center text-[12px] font-semibold tracking-[0.12em] uppercase text-[#71717A] mb-4 select-none">
        Integrates with
      </p>

      {/* Scrolling strip — overflow hidden so logos clip at the edges */}
      <div
        className="overflow-hidden relative"
        style={{
          // Gradient mask fades logos in/out on both sides, creating the
          // "appearing from nowhere" infinite-feel effect.
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        {/* marquee-track and marquee-wrap classes come from globals.css */}
        <div className="flex items-center gap-16 marquee-track w-max">
          {doubled.map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center shrink-0 opacity-55 hover:opacity-90 transition-opacity duration-300 select-none"
              style={{ height: 40 }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                // Keep actual rendered height consistent; width scales proportionally
                style={{ height: 32, width: "auto", objectFit: "contain" }}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
