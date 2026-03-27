"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Users, BookOpen, Mic, Layers, Compass, Building2, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const dropdowns: Record<string, { icon: React.ReactNode; label: string; href: string }[]> = {
  Program: [
    { icon: <Layers size={15} />, label: "How It Works", href: "#how" },
    { icon: <BookOpen size={15} />, label: "What's Included", href: "#provide" },
    { icon: <Compass size={15} />, label: "Revenue Streams", href: "#streams" },
  ],
  Resources: [
    { icon: <Users size={15} />, label: "Pilot Stories", href: "#pilot" },
    { icon: <Mic size={15} />, label: "FAQ", href: "#faq" },
  ],
  Company: [
    { icon: <Building2 size={15} />, label: "About Us", href: "#" },
    { icon: <Users size={15} />, label: "Careers", href: "#" },
  ],
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
      className={cn(
        "sticky top-0 z-[100] transition-all duration-300",
        scrolled
          ? "bg-[rgba(245,243,239,0.97)] backdrop-blur-xl shadow-[0_1px_0_0_#E4E2DE]"
          : "bg-[rgba(245,243,239,0.85)] backdrop-blur-md border-b border-[#E4E2DE]"
      )}
    >
      <div className="max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2.5 font-black text-[19px] tracking-[-0.04em] text-[#E8470A] no-underline">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <path d="M4 8L28 8L28 22L16 30L4 22Z" fill="#E8470A" />
              <path d="M8 10L24 10L24 21L16 27L8 21Z" fill="white" fillOpacity="0.25" />
              <rect x="13" y="13" width="6" height="5" rx="1" fill="white" fillOpacity="0.65" />
            </svg>
            HomePlate
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {Object.keys(dropdowns).map((key) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => setOpen(key)}
                onMouseLeave={() => setOpen(null)}
              >
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[14px] font-medium text-[#3F3F46] hover:bg-black/5 transition-colors">
                  {key}
                  <motion.span animate={{ rotate: open === key ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={13} className="opacity-40" />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {open === key && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute top-[calc(100%+8px)] left-0 bg-white border border-[#E4E2DE] rounded-2xl p-2 min-w-[210px] shadow-[0_8px_40px_rgba(0,0,0,0.10)] z-50"
                    >
                      {dropdowns[key].map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] text-[#18181B] hover:bg-[#EDEBE6] transition-colors no-underline"
                        >
                          <div className="w-8 h-8 bg-[#EDEBE6] rounded-lg flex items-center justify-center shrink-0 text-[#E8470A]">
                            {item.icon}
                          </div>
                          {item.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            {["Pricing", "Partners"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-3 py-1.5 rounded-lg text-[14px] font-medium text-[#3F3F46] hover:bg-black/5 transition-colors no-underline"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="hidden sm:block text-[14px] font-medium text-[#3F3F46] hover:bg-black/5 px-3 py-1.5 rounded-lg transition-colors">
            Login
          </button>
          <motion.a
            href="#apply"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 bg-[#E8470A] text-white px-4 py-2 rounded-xl text-[14px] font-semibold no-underline transition-colors hover:bg-[#C73D08]"
          >
            Get Free Demo
            <ArrowRight size={14} />
          </motion.a>
          <button
            className="lg:hidden p-1.5 rounded-lg hover:bg-black/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-[#E4E2DE] bg-[#F5F3EF] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {[...Object.keys(dropdowns).flatMap((k) => dropdowns[k]),
                { label: "Pricing", href: "#roi" },
                { label: "Partners", href: "#partner" }
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 text-[15px] font-medium text-[#3F3F46] no-underline border-b border-[#E4E2DE] last:border-0"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
