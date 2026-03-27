"use client";
import { motion } from "framer-motion";
import { Linkedin, Instagram, Facebook, Twitter } from "lucide-react";
import { useState } from "react";

const cols = [
  {
    head: "Company",
    links: [["Home", "#"], ["About", "#"], ["Careers", "#"], ["Pilot Stories", "#pilot"], ["Partners", "#partner"]],
  },
  {
    head: "Resources",
    links: [["Blog", "#"], ["Docs", "#"], ["Pricing", "#roi"], ["Program", "#provide"], ["FAQ", "#faq"]],
  },
  {
    head: "Legal",
    links: [["Terms", "#"], ["Privacy Policy", "#"], ["HIPAA Compliance", "#"], ["Brand Guidelines", "#"]],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white border-t border-[#E4E2DE] px-20 pt-14 pb-10 mt-0"
    >
      <div className="grid grid-cols-[1fr_repeat(3,auto)] gap-14 mb-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 font-black text-[18px] text-[#E8470A] tracking-[-0.04em] mb-2.5">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <path d="M4 8L28 8L28 22L16 30L4 22Z" fill="#E8470A"/>
              <path d="M8 10L24 10L24 21L16 27L8 21Z" fill="white" fillOpacity="0.25"/>
              <rect x="13" y="13" width="6" height="5" rx="1" fill="white" fillOpacity="0.65"/>
            </svg>
            HomePlate
          </div>
          <p className="text-[12.5px] text-[#71717A] leading-[1.75] mb-5">
            © 2025 HomePlate Medical Meals, Inc.<br />All Rights Reserved.
          </p>
          <p className="text-[12px] text-[#71717A] font-medium mb-2">Sign up for updates</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#E4E2DE] rounded-lg px-3.5 py-2 text-[13px] font-[inherit] outline-none w-[190px] bg-[#EDEBE6] text-[#18181B] placeholder:text-[#71717A] focus:border-[#E8470A] transition-colors"
            />
            <button className="bg-[#E8470A] text-white border-none rounded-lg px-4 py-2 text-[13px] font-semibold cursor-pointer hover:bg-[#C73D08] transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Columns */}
        {cols.map((col) => (
          <div key={col.head}>
            <h4 className="text-[10.5px] font-bold tracking-[0.08em] text-[#71717A] uppercase mb-3.5">
              {col.head}
            </h4>
            {col.links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="block text-[14px] text-[#3F3F46] no-underline mb-2.5 hover:text-[#E8470A] transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="flex items-end justify-between pt-6 border-t border-[#E4E2DE]">
        <div className="text-[13px] text-[#71717A] leading-[1.9]">
          <strong className="font-semibold text-[#18181B]">Help Center</strong><br />
          +1 (800) 555-HOME<br />
          hello@homeplate.com
        </div>
        <div className="flex gap-2.5">
          {[
            { Icon: Linkedin, label: "LinkedIn" },
            { Icon: Instagram, label: "Instagram" },
            { Icon: Facebook, label: "Facebook" },
            { Icon: Twitter, label: "Twitter" },
          ].map(({ Icon, label }) => (
            <motion.a
              key={label}
              href="#"
              whileHover={{ scale: 1.1, borderColor: "#E8470A", color: "#E8470A" }}
              aria-label={label}
              className="w-[34px] h-[34px] rounded-lg border border-[#E4E2DE] flex items-center justify-center text-[#71717A] no-underline transition-colors"
            >
              <Icon size={15} />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}
