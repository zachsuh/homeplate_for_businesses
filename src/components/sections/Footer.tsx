"use client";
import { motion } from "framer-motion";
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
          <div className="flex items-center gap-2.5 font-black text-[18px] text-[#1A1A1A] tracking-[-0.04em] mb-2.5">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <path d="M4 8L28 8L28 22L16 30L4 22Z" fill="#183E34"/>
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
              className="border border-[#E4E2DE] rounded-lg px-3.5 py-2 text-[13px] font-[inherit] outline-none w-[190px] bg-[#EDEBE6] text-[#1A1A1A] placeholder:text-[#71717A] focus:border-[#183E34] transition-colors"
            />
            <button className="bg-[#183E34] text-white border-none rounded-lg px-4 py-2 text-[13px] font-semibold cursor-pointer hover:bg-[#122D26] transition-colors">
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
                className="block text-[14px] text-[#3F3F46] no-underline mb-2.5 hover:text-[#1A1A1A] transition-colors"
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
          <strong className="font-semibold text-[#1A1A1A]">Help Center</strong><br />
          +1 (800) 555-HOME<br />
          hello@homeplate.com
        </div>
        <div className="flex gap-2.5">
          {[
            { label: "LinkedIn", svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
            { label: "Instagram", svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg> },
            { label: "Facebook", svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
            { label: "X", svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
          ].map(({ label, svg }) => (
            <motion.a
              key={label}
              href="#"
              whileHover={{ scale: 1.1, borderColor: "#183E34", color: "#183E34" }}
              aria-label={label}
              className="w-[34px] h-[34px] rounded-lg border border-[#E4E2DE] flex items-center justify-center text-[#71717A] no-underline transition-colors"
            >
              {svg}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}
