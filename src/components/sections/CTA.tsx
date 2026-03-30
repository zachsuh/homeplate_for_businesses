"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const WORD = "HOMEPLATEMEALS";
const LETTERS = Array.from({ length: 380 }, (_, i) => WORD[i % WORD.length]);

export default function CTA() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", center: "", city: "", email: "", phone: "", capacity: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "f448bf69-0c43-4630-895d-40dffc7c1f46",
          subject: "New Partnership Demo Request — HomePlate",
          name: form.name,
          email: form.email,
          message: `Senior Center: ${form.center}\nCity: ${form.city}\nPhone: ${form.phone}\nPosition: ${form.capacity}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-10 pb-0" id="apply">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-[#183E34] rounded-[20px] overflow-hidden relative min-h-[440px] flex flex-col items-center justify-center text-center px-10 py-20 noise"
      >
        {/* Letter bg */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ display: "grid", gridTemplateColumns: "repeat(22, 1fr)", gap: "5px", padding: "14px", alignContent: "start" }}
        >
          {LETTERS.map((l, i) => (
            <span key={i} className="text-[10px] font-semibold text-white/10 select-none leading-[1.5]">
              {l}
            </span>
          ))}
        </div>

        {/* Food illustration left */}
        <svg className="absolute bottom-0 left-4 pointer-events-none opacity-90 hidden lg:block" width="160" height="150" viewBox="0 0 170 160" fill="none">
          <ellipse cx="85" cy="112" rx="62" ry="13" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
          <ellipse cx="85" cy="80" rx="57" ry="46" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="rgba(255,255,255,0.04)"/>
          <ellipse cx="85" cy="80" rx="38" ry="30" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 3"/>
          <circle cx="70" cy="72" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="rgba(255,255,255,0.05)"/>
          <circle cx="100" cy="82" r="7" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="rgba(255,255,255,0.05)"/>
          <circle cx="85" cy="112" r="4" fill="rgba(255,255,255,0.5)"/>
          <circle cx="28" cy="80" r="4" fill="rgba(255,255,255,0.5)"/>
          <circle cx="142" cy="80" r="4" fill="rgba(255,255,255,0.5)"/>
          <path d="M40 32 L85 12 L130 32" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
          <circle cx="85" cy="12" r="3.5" fill="rgba(255,255,255,0.4)"/>
        </svg>

        {/* Food illustration right */}
        <svg className="absolute bottom-0 right-4 pointer-events-none hidden lg:block" width="150" height="150" viewBox="0 0 160 160" fill="none">
          <rect x="30" y="122" width="100" height="18" rx="4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="rgba(255,255,255,0.04)"/>
          <rect x="25" y="97" width="110" height="28" rx="6" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="rgba(255,255,255,0.05)"/>
          <rect x="28" y="70" width="104" height="30" rx="6" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="rgba(255,255,255,0.04)"/>
          <rect x="35" y="48" width="90" height="24" rx="5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="rgba(255,255,255,0.03)"/>
          <path d="M50 48 Q80 32 110 48" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none"/>
          <circle cx="80" cy="28" r="12" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="rgba(255,255,255,0.04)"/>
          <circle cx="30" cy="97" r="4" fill="rgba(255,255,255,0.5)"/>
          <circle cx="130" cy="97" r="4" fill="rgba(255,255,255,0.5)"/>
          <circle cx="80" cy="140" r="4" fill="rgba(255,255,255,0.5)"/>
        </svg>

        {/* Content */}
        <div className="relative z-10 max-w-[620px]">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
              className="text-white"
            >
              <div className="text-[52px] mb-4">✓</div>
              <h2 className="text-[clamp(26px,4vw,44px)] font-black tracking-[-0.045em] leading-[1.12] mb-3">
                You're in the queue.
              </h2>
              <p className="text-[15px] text-white/75 leading-[1.65]">
                We'll reach out within one business day to schedule your free kitchen assessment.
              </p>
            </motion.div>
          ) : (
            <>
              <h2 className="text-[clamp(26px,4vw,48px)] font-black text-white tracking-[-0.045em] leading-[1.12] mb-3">
                Let's Find Out If Your<br />Kitchen Qualifies
              </h2>
              <p className="text-[15px] text-white/75 leading-[1.65] mb-8 max-w-[440px] mx-auto">
                The assessment is free, takes under an hour, and you'll leave with a custom
                revenue projection for your location.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                <div className="flex flex-wrap gap-2.5 justify-center">
                  {[
                    { key: "center", placeholder: "Senior center name", required: true },
                    { key: "city", placeholder: "City, State", required: false },
                    { key: "name", placeholder: "Your name", required: true },
                    { key: "email", placeholder: "Work email", required: true, type: "email" },
                    { key: "phone", placeholder: "Phone number", required: false, type: "tel" },
                    { key: "capacity", placeholder: "Your position / title", required: false },
                  ].map((f) => (
                    <input
                      key={f.key}
                      type={f.type || "text"}
                      placeholder={f.placeholder}
                      required={f.required}
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="border-none rounded-xl px-4 py-3 text-[14px] font-[inherit] outline-none w-[200px] bg-white/95 text-[#1A1A1A] placeholder:text-[#aaa] focus:ring-2 focus:ring-white/40"
                    />
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 bg-white text-[#1A1A1A] rounded-xl px-7 py-3.5 text-[15px] font-bold cursor-pointer border-none hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {loading ? "Sending…" : <> Apply for a Partnership Demo <ArrowRight size={15} /></>}
                </motion.button>

                <p className="text-[12.5px] text-white/60">
                  No commitment required. We'll tell you honestly if it's a fit.
                </p>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}
