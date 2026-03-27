"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ArrowRight } from "lucide-react";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{ overflow: "hidden" }}
        >
          <div className="bg-[#E8470A] text-white text-center px-5 py-2.5 text-[13.5px] font-medium flex items-center justify-center gap-2 relative">
            <span>
              🏥 HomePlate is now accepting senior center kitchen partners — limited spots available
            </span>
            <a
              href="#apply"
              className="inline-flex items-center gap-1 font-bold underline underline-offset-2 hover:no-underline transition-all"
            >
              Apply now <ArrowRight size={12} />
            </a>
            <button
              onClick={() => setVisible(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity p-1 rounded"
              aria-label="Close"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
