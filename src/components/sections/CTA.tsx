"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fields = [
  { key: "center", placeholder: "Senior center name", required: true, span: true },
  { key: "name", placeholder: "Your name", required: true },
  { key: "email", placeholder: "Work email", required: true, type: "email" },
];

export default function CTA() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", center: "", email: "" });

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
          message: `Senior Center: ${form.center}`,
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
    <section className="px-4 sm:px-10 pb-0" id="apply">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-[#183E34] rounded-[20px] overflow-hidden relative"
      >

        {/* Headline */}
        <div className="relative z-10 text-center px-8 pt-14 pb-8">
          <h2 className="text-[clamp(28px,3vw,44px)] font-normal text-white tracking-[-0.02em] leading-[1.15] mb-3">
            Let's Find Out If Your Kitchen Qualifies
          </h2>
          <p className="text-[15px] text-white/70 leading-[1.65] max-w-[440px] mx-auto">
            The assessment is free, takes under an hour, and you'll leave with a custom
            revenue projection for your location.
          </p>
        </div>

        {/* Form card */}
        <div className="relative z-10 mx-4 sm:mx-10 lg:mx-20 mb-10">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
              className="bg-white/10 border border-white/20 rounded-2xl px-8 py-12 text-center text-white"
            >
              <div className="text-[52px] mb-4">✓</div>
              <h3 className="text-[28px] font-black tracking-[-0.04em] mb-2">You're in the queue.</h3>
              <p className="text-[15px] text-white/75 leading-[1.65]">
                We'll reach out within one business day to schedule your free kitchen assessment.
              </p>
            </motion.div>
          ) : (
            <div className="bg-white rounded-2xl px-6 sm:px-8 py-8 shadow-lg">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {fields.map((f) => (
                    <input
                      key={f.key}
                      type={f.type || "text"}
                      placeholder={f.placeholder}
                      required={f.required}
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className={`border border-[#E4E2DE] rounded-xl px-4 py-3 text-[14px] font-[inherit] outline-none bg-[#FAFAF9] text-[#1A1A1A] placeholder:text-[#aaa] focus:border-[#183E34] focus:ring-2 focus:ring-[#183E34]/10 transition-all${f.span ? " sm:col-span-2" : ""}`}
                    />
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 bg-[#183E34] text-white rounded-xl px-7 py-3.5 text-[15px] font-bold cursor-pointer border-none hover:bg-[#1f4e42] transition-colors disabled:opacity-60 w-full sm:w-auto justify-center"
                  >
                    {loading ? "Sending…" : <> Apply for a Partnership Demo <ArrowRight size={15} /></>}
                  </motion.button>
                  <p className="text-[12.5px] text-[#999] text-center sm:text-left">
                    No commitment required. We'll tell you honestly if it's a fit.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
