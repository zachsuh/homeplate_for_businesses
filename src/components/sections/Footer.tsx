"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const links = [
  ["How It Works", "#how"],
  ["What We Provide", "#provide"],
  ["Revenue Streams", "#streams"],
  ["FAQ", "#faq"],
  ["Apply", "#apply"],
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: "d276b296-e551-41ca-b94b-cea724a4501e",
        subject: "Newsletter Signup — HomePlate",
        email,
      }),
    });
    setEmailSent(true);
    setEmail("");
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white border-t border-[#E4E2DE] px-20 pt-14 pb-10"
    >
      <div className="flex flex-col gap-10">

        {/* Top row */}
        <div className="flex items-start justify-between gap-16">

          {/* Logo + tagline */}
          <div className="flex flex-col gap-4 max-w-[260px]">
            <Image
              src="/images/homeplate-icon.png"
              alt="HomePlate"
              width={48}
              height={48}
              style={{ width: 48, height: 48, objectFit: "contain" }}
            />
            <p className="text-[13px] text-[#71717A] leading-[1.7]">
              Medically tailored meal programs for senior centers.
            </p>

            {/* Email signup */}
            <div>
              <p className="text-[12px] text-[#71717A] font-medium mb-2">Stay updated</p>
              {emailSent ? (
                <p className="text-[13px] text-[#183E34] font-medium">You&apos;re subscribed!</p>
              ) : (
                <form onSubmit={handleEmailSubmit} className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border border-[#E4E2DE] rounded-lg px-3.5 py-2 text-[13px] font-[inherit] outline-none w-[170px] bg-[#F7F5F2] text-[#1A1A1A] placeholder:text-[#71717A] focus:border-[#183E34] transition-colors"
                  />
                  <button type="submit" className="bg-[#183E34] text-white border-none rounded-lg px-4 py-2 text-[13px] font-semibold cursor-pointer hover:bg-[#122D26] transition-colors">
                    Go
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-2.5 pt-1">
            <p className="text-[10.5px] font-bold tracking-[0.08em] text-[#71717A] uppercase mb-1">Menu</p>
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-[14px] text-[#3F3F46] no-underline hover:text-[#1A1A1A] transition-colors"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2.5 pt-1">
            <p className="text-[10.5px] font-bold tracking-[0.08em] text-[#71717A] uppercase mb-1">Contact</p>
            <a href="tel:7032231821" className="text-[14px] text-[#3F3F46] no-underline hover:text-[#1A1A1A] transition-colors">
              (703) 223-1821
            </a>
            <a href="mailto:zach@shophomeplate.com" className="text-[14px] text-[#3F3F46] no-underline hover:text-[#1A1A1A] transition-colors">
              zach@shophomeplate.com
            </a>
            <a
              href="https://www.linkedin.com/company/homeplatemeals/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[14px] text-[#3F3F46] no-underline hover:text-[#1A1A1A] transition-colors mt-1"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#E4E2DE]">
          <p className="text-[12.5px] text-[#71717A]">
            © 2025 Hearthwise LLC. All Rights Reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
