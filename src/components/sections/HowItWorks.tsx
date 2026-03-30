"use client";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";

const TOTAL = 4;

const cards = [
  {
    n: "01",
    label: "Onboard",
    title: "We Set Up\nEverything.",
    desc: "We assess your kitchen, confirm compliance, and configure your HomePlate ordering portal. Most partners are ready within two weeks.",
    image: "/images/how%20it%20works/A%20backend%20that%20builds%20with%20you%20-%20Desktop.avif",
  },
  {
    n: "02",
    label: "Train",
    title: "Your Team Learns.\nNo Dietitian\nRequired.",
    desc: "Our team trains your kitchen staff on medical dietary protocols — diabetes, heart disease, renal, and dysphagia-specific menus.",
    image: "/images/how%20it%20works/Create%20at%20the%20speed%20of%20thought%20-%20Desktop.avif",
  },
  {
    n: "03",
    label: "Launch",
    title: "We Market.\nOrders Come\nTo You.",
    desc: "We run your local marketing — digital ads, physician referrals, and community outreach — to drive orders directly to your location.",
    image: "/images/how%20it%20works/One%20platform_%20Any%20agent%20-%20Desktop.avif",
  },
  {
    n: "04",
    label: "Earn",
    title: "Revenue From\nCapacity You\nAlready Have.",
    desc: "You keep a cut of every meal sold. The more your community orders, the more you make — with no per-meal fees to HomePlate.",
    image: "/images/how%20it%20works/Ready%20to%20use%2C%20instantly%20-%20Desktop.avif",
  },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const ease = (t: number) => 1 - Math.pow(1 - t, 3);
  const y1 = useTransform(scrollYProgress, [0.18, 0.36], ["100%", "0%"], { ease });
  const y2 = useTransform(scrollYProgress, [0.42, 0.60], ["100%", "0%"], { ease });
  const y3 = useTransform(scrollYProgress, [0.66, 0.84], ["100%", "0%"], { ease });
  const ys = [undefined, y1, y2, y3];

  return (
    <section
      ref={containerRef}
      style={{ height: "500vh" }}
      className="relative"
      id="how"
    >
      <div className="sticky top-0 h-screen overflow-hidden"
        style={{ background: "linear-gradient(to bottom, #f4faf7 0%, #ffffff 40%)" }}
      >

        {/* Bottom green glow — radial, soft fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[320px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 100% at 50% 100%, rgba(24,62,52,0.10) 0%, rgba(24,62,52,0.03) 60%, transparent 100%)",
          }}
        />

        {/* Section label */}
        <div className="absolute top-7 left-1/2 -translate-x-1/2 z-50 text-[11px] font-semibold tracking-[0.14em] uppercase text-[#71717A] select-none">
          How It Works
        </div>

        {cards.map((card, i) => (
          <motion.div
            key={card.n}
            style={{
              y: ys[i],
              zIndex: i + 1,
              position: "absolute",
              inset: 0,
            }}
          >
            <div
              className="absolute rounded-[22px] overflow-hidden shadow-[0_12px_56px_rgba(0,0,0,0.13)] grid grid-cols-2 bg-white"
              style={{
                top: "47%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "min(920px, calc(100vw - 80px))",
                aspectRatio: "4 / 2.25",
              }}
            >
              {/* Left: text panel */}
              <div className="flex flex-col justify-between px-11 py-10">

                {/* Step counter + label */}
                <div className="flex items-center gap-1.5 text-sm font-normal" style={{ fontFamily: "var(--font-poppins)" }}>
                  <span className="text-[#1A1A1A]">{card.n}</span>
                  <span className="text-[#BBBBBB]">/ 0{TOTAL}</span>
                  <span className="text-[#1A1A1A] ml-1">{card.label}</span>
                </div>

                {/* Large headline */}
                <h2
                  className="text-[#1A1A1A] leading-[1.08] tracking-[-0.03em]"
                  style={{
                    fontFamily: "var(--font-poppins)",
                    fontSize: "clamp(22px, 2.6vw, 38px)",
                    whiteSpace: "pre-line",
                    fontWeight: 400,
                  }}
                >
                  {card.title}
                </h2>

                {/* Black pill button */}
                <button
                  className="self-start bg-[#1A1A1A] text-white text-sm px-5 py-2.5 cursor-pointer border-none transition-opacity hover:opacity-80"
                  style={{
                    fontFamily: "var(--font-poppins)",
                    fontWeight: 600,
                    borderRadius: 9999,
                  }}
                >
                  Learn more
                </button>
              </div>

              {/* Right: image — full bleed */}
              <div className="relative">
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  className="object-cover"
                  sizes="40vw"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
