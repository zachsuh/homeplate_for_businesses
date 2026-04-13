"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Play, Pause, RotateCcw,
  CheckCircle, Clock, MapPin, Star, AlertCircle,
  Package, Truck, ChefHat, User, Phone, Mail,
  Heart, Leaf, ShieldCheck, Bell, X, ChevronRight,
  Home, Search, ShoppingBag, MessageCircle, Settings,
  Navigation, Zap, DollarSign, TrendingUp, Users,
  ClipboardList, BadgeCheck, Utensils, Camera,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ─────────── types ─────────── */
type Role = "customer" | "facility" | "delivery";

interface StepData {
  id: number;
  label: string;
  title: string;
  subtitle: string;
  screen: React.ReactNode;
  sideUpdates: SideUpdate[];
}

interface SideUpdate {
  icon: React.ReactNode;
  text: string;
  sub?: string;
  color: string;
  delay?: number;
}

/* ─────────── Phone Frame ─────────── */
function PhoneFrame({ children, bg = "bg-[#F5F3EF]" }: { children: React.ReactNode; bg?: string }) {
  return (
    <div className="relative w-[300px] h-[620px] rounded-[44px] border-[7px] border-[#1C1C1E] shadow-[0_40px_100px_rgba(0,0,0,0.30),inset_0_0_0_1px_rgba(255,255,255,0.08)] overflow-hidden flex-shrink-0 bg-white">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[110px] h-[28px] bg-[#1C1C1E] rounded-b-[18px] z-20 flex items-center justify-center gap-1.5">
        <div className="w-2 h-2 bg-[#333] rounded-full" />
        <div className="w-1 h-1 bg-[#444] rounded-full" />
      </div>
      {/* Status bar */}
      <div className="h-10 flex items-end justify-between px-5 pb-1 relative z-10">
        <span className="text-[10px] font-semibold text-[#1A1A1A]">9:41</span>
        <div className="flex items-center gap-1 opacity-70">
          <div className="flex gap-[2px] items-end h-3">
            {[2, 3, 4, 5].map(h => <div key={h} style={{ height: h * 2 + 2 }} className="w-1 bg-[#1A1A1A] rounded-[1px]" />)}
          </div>
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M7 2.5C8.5 2.5 9.8 3.1 10.8 4L12.1 2.7C10.7 1.4 8.95 0.6 7 0.6C5.05 0.6 3.3 1.4 1.9 2.7L3.2 4C4.2 3.1 5.5 2.5 7 2.5Z" fill="#1A1A1A"/><circle cx="7" cy="7.5" r="1.5" fill="#1A1A1A"/></svg>
          <div className="w-6 h-3 border border-[#1A1A1A] rounded-[3px] relative">
            <div className="absolute inset-[2px] right-[2px] bg-[#1A1A1A] rounded-[1px]" />
            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-1 h-1.5 bg-[#1A1A1A] rounded-r-[2px]" />
          </div>
        </div>
      </div>
      {/* Screen content */}
      <div className={cn("h-[calc(100%-40px)] overflow-hidden relative", bg)}>
        {children}
      </div>
    </div>
  );
}

/* ─────────── App Bottom Nav ─────────── */
function AppNav({ active }: { active: string }) {
  const items = [
    { icon: <Home size={18} />, label: "Home", id: "home" },
    { icon: <Search size={18} />, label: "Explore", id: "explore" },
    { icon: <ShoppingBag size={18} />, label: "Orders", id: "orders" },
    { icon: <MessageCircle size={18} />, label: "Chat", id: "chat" },
    { icon: <User size={18} />, label: "Profile", id: "profile" },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E4E2DE] flex">
      {items.map(item => (
        <div key={item.id} className={cn("flex-1 flex flex-col items-center py-2 gap-0.5 cursor-pointer", active === item.id ? "text-[#183E34]" : "text-[#A8A29E]")}>
          {item.icon}
          <span className="text-[8px] font-medium">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ─────────── App Header ─────────── */
function AppHeader({ title, showBack = false, rightAction }: { title: string; showBack?: boolean; rightAction?: React.ReactNode }) {
  return (
    <div className="bg-white border-b border-[#E4E2DE] px-4 py-3 flex items-center justify-between">
      {showBack ? <ArrowLeft size={18} className="text-[#1A1A1A]" /> : <div className="w-[18px]" />}
      <span className="text-[13px] font-semibold text-[#1A1A1A]">{title}</span>
      {rightAction ?? <div className="w-[18px]" />}
    </div>
  );
}

/* ─────────── Status Badge ─────────── */
function StatusBadge({ status, color }: { status: string; color: string }) {
  const colors: Record<string, string> = {
    green: "bg-[#D1FAE5] text-[#065F46]",
    yellow: "bg-[#FEF3C7] text-[#92400E]",
    blue: "bg-[#DBEAFE] text-[#1D4ED8]",
    red: "bg-[#FEE2E2] text-[#991B1B]",
    purple: "bg-[#EDE9FE] text-[#5B21B6]",
    teal: "bg-[#183E34]/10 text-[#183E34]",
  };
  return (
    <span className={cn("text-[9px] font-semibold px-2 py-0.5 rounded-full", colors[color])}>
      {status}
    </span>
  );
}

/* ─────────── Notification Toast ─────────── */
function NotifToast({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="absolute top-2 left-2 right-2 z-50 bg-[#1C1C1E]/90 backdrop-blur rounded-2xl p-3 flex items-center gap-2.5 shadow-xl">
      <div className="w-8 h-8 bg-[#183E34] rounded-xl flex items-center justify-center text-white shrink-0 text-xs">{icon}</div>
      <div className="min-w-0">
        <div className="text-[10px] font-semibold text-white truncate">{title}</div>
        <div className="text-[9px] text-white/70 truncate">{sub}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   CUSTOMER SCREENS
═══════════════════════════════════════ */
const CustomerScreens: React.FC[] = [
  /* 0 — Onboarding Welcome */
  () => (
    <div className="h-full flex flex-col items-center justify-center px-6 text-center bg-gradient-to-b from-[#183E34] to-[#0e2820]">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="mb-6">
        <div className="w-20 h-20 bg-white/10 rounded-[28px] flex items-center justify-center mx-auto mb-4 backdrop-blur">
          <Utensils size={36} className="text-white" />
        </div>
        <h2 className="text-[22px] font-bold text-white leading-tight">Welcome to<br />HomePlate</h2>
        <p className="text-[11px] text-white/70 mt-2 leading-relaxed">Medically-tailored meals<br />delivered to your door</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="w-full space-y-2">
        <button className="w-full bg-white text-[#183E34] text-[13px] font-semibold py-3 rounded-2xl">Create Account</button>
        <button className="w-full bg-white/10 text-white text-[13px] font-medium py-3 rounded-2xl">I already have an account</button>
      </motion.div>
    </div>
  ),
  /* 1 — Sign Up */
  () => (
    <div className="h-full flex flex-col bg-white">
      <AppHeader title="Create Account" showBack />
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <div>
          <label className="text-[9px] font-semibold text-[#71717A] uppercase tracking-wide mb-1 block">Full Name</label>
          <div className="border border-[#E4E2DE] rounded-xl px-3 py-2.5 text-[12px] text-[#1A1A1A] bg-[#FAFAF9] flex items-center gap-2">
            <User size={12} className="text-[#A8A29E]" />Margaret Chen
          </div>
        </div>
        <div>
          <label className="text-[9px] font-semibold text-[#71717A] uppercase tracking-wide mb-1 block">Email Address</label>
          <div className="border border-[#E4E2DE] rounded-xl px-3 py-2.5 text-[12px] text-[#1A1A1A] bg-[#FAFAF9] flex items-center gap-2">
            <Mail size={12} className="text-[#A8A29E]" />margaret@gmail.com
          </div>
        </div>
        <div>
          <label className="text-[9px] font-semibold text-[#71717A] uppercase tracking-wide mb-1 block">Phone Number</label>
          <div className="border border-[#183E34] rounded-xl px-3 py-2.5 text-[12px] text-[#1A1A1A] bg-white flex items-center gap-2 ring-2 ring-[#183E34]/10">
            <Phone size={12} className="text-[#183E34]" />(571) 443-2190
          </div>
        </div>
        <div>
          <label className="text-[9px] font-semibold text-[#71717A] uppercase tracking-wide mb-1 block">Home Address</label>
          <div className="border border-[#E4E2DE] rounded-xl px-3 py-2.5 text-[12px] text-[#1A1A1A] bg-[#FAFAF9] flex items-center gap-2">
            <MapPin size={12} className="text-[#A8A29E]" />4210 Maple Ave, Fairfax VA
          </div>
        </div>
        <div className="flex items-start gap-2 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-3">
          <CheckCircle size={12} className="text-[#16A34A] shrink-0 mt-0.5" />
          <p className="text-[9px] text-[#15803D]">Your data is secure and only used to connect you with local meal programs.</p>
        </div>
        <button className="w-full bg-[#183E34] text-white text-[12px] font-semibold py-3 rounded-2xl">Continue</button>
      </div>
    </div>
  ),
  /* 2 — Dietary Preferences */
  () => {
    const prefs = [
      { icon: "🫀", label: "Heart Healthy", active: true },
      { icon: "🩸", label: "Diabetic-Friendly", active: true },
      { icon: "🌿", label: "Low Sodium", active: false },
      { icon: "🥗", label: "Renal Diet", active: false },
      { icon: "🌾", label: "Gluten-Free", active: false },
      { icon: "🥛", label: "Dairy-Free", active: true },
    ];
    return (
      <div className="h-full flex flex-col bg-white">
        <AppHeader title="Dietary Needs" showBack />
        <div className="flex-1 px-4 py-3 overflow-y-auto">
          <p className="text-[10px] text-[#71717A] mb-3">Select all that apply. Our facility partners use this to prepare medically-appropriate meals.</p>
          <div className="grid grid-cols-2 gap-2">
            {prefs.map(p => (
              <div key={p.label} className={cn("border rounded-xl p-2.5 flex items-center gap-2 cursor-pointer", p.active ? "border-[#183E34] bg-[#183E34]/5" : "border-[#E4E2DE] bg-white")}>
                <span className="text-base">{p.icon}</span>
                <span className={cn("text-[10px] font-medium leading-tight", p.active ? "text-[#183E34]" : "text-[#3F3F46]")}>{p.label}</span>
                {p.active && <CheckCircle size={10} className="text-[#183E34] ml-auto shrink-0" />}
              </div>
            ))}
          </div>
          <div className="mt-4 bg-[#FEF3C7] border border-[#FDE68A] rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <AlertCircle size={11} className="text-[#D97706]" />
              <span className="text-[9px] font-semibold text-[#92400E]">Doctor's Note</span>
            </div>
            <p className="text-[9px] text-[#78350F]">Upload a physician's dietary order to ensure meals meet your clinical requirements.</p>
            <button className="mt-2 text-[9px] font-semibold text-[#92400E] flex items-center gap-1">
              <Camera size={9} />Upload Document
            </button>
          </div>
          <button className="w-full bg-[#183E34] text-white text-[12px] font-semibold py-3 rounded-2xl mt-4">Set Preferences</button>
        </div>
      </div>
    );
  },
  /* 3 — Browse & Order */
  () => {
    const meals = [
      { name: "Heart-Smart Salmon Bowl", cal: "420 kcal", price: "$14.50", tags: ["Heart Healthy", "Low Sodium"], time: "~35 min", rating: 4.9 },
      { name: "Diabetic Grilled Chicken", cal: "380 kcal", price: "$13.00", tags: ["Diabetic-Friendly"], time: "~30 min", rating: 4.8 },
    ];
    return (
      <div className="h-full flex flex-col bg-[#F5F3EF]">
        <div className="bg-white border-b border-[#E4E2DE] px-4 pt-2 pb-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-[9px] text-[#71717A]">Delivering to</p>
              <div className="flex items-center gap-1"><MapPin size={10} className="text-[#183E34]" /><span className="text-[11px] font-semibold">4210 Maple Ave</span></div>
            </div>
            <div className="w-7 h-7 bg-[#183E34] rounded-full flex items-center justify-center"><Bell size={12} className="text-white" /></div>
          </div>
          <div className="bg-[#F5F3EF] rounded-xl px-3 py-2 flex items-center gap-2">
            <Search size={12} className="text-[#A8A29E]" /><span className="text-[11px] text-[#A8A29E]">Search medical meals…</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-3 pb-16 space-y-3">
          {meals.map(m => (
            <div key={m.name} className="bg-white rounded-2xl p-3 border border-[#E4E2DE]">
              <div className="flex gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-[#183E34]/10 to-[#6CC827]/20 rounded-xl flex items-center justify-center shrink-0 text-2xl">🍽️</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-[#1A1A1A] leading-tight">{m.name}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {m.tags.map(t => <StatusBadge key={t} status={t} color="teal" />)}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[9px] text-[#71717A]">{m.cal}</span>
                    <span className="text-[9px] text-[#71717A]">•</span>
                    <Clock size={8} className="text-[#71717A]" /><span className="text-[9px] text-[#71717A]">{m.time}</span>
                    <span className="text-[9px] text-[#71717A]">•</span>
                    <Star size={8} className="text-amber-500 fill-amber-500" /><span className="text-[9px] text-[#71717A]">{m.rating}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between shrink-0">
                  <span className="text-[12px] font-bold text-[#183E34]">{m.price}</span>
                  <button className="w-6 h-6 bg-[#183E34] rounded-lg flex items-center justify-center"><span className="text-white text-[14px] leading-none font-bold">+</span></button>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-[#183E34] rounded-2xl p-3 flex items-center justify-between">
            <div><p className="text-[10px] text-white/70">2 items</p><p className="text-[12px] font-bold text-white">$27.50</p></div>
            <button className="bg-white text-[#183E34] text-[11px] font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1">View Cart <ArrowRight size={10} /></button>
          </div>
        </div>
        <AppNav active="home" />
      </div>
    );
  },
  /* 4 — Order Placed + Facility Matched */
  () => (
    <div className="h-full flex flex-col bg-white">
      <AppHeader title="Order Confirmed" rightAction={<Bell size={16} className="text-[#183E34]" />} />
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-16 space-y-3">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-4 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }} className="w-12 h-12 bg-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-2">
            <CheckCircle size={24} className="text-white" />
          </motion.div>
          <p className="text-[13px] font-bold text-[#1A1A1A]">Order Placed!</p>
          <p className="text-[10px] text-[#71717A] mt-0.5">Order #HP-2847</p>
        </motion.div>
        <div className="border border-[#E4E2DE] rounded-2xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-[#183E34]/10 rounded-xl flex items-center justify-center"><ChefHat size={14} className="text-[#183E34]" /></div>
            <div>
              <p className="text-[10px] font-semibold text-[#1A1A1A]">Facility Matched</p>
              <p className="text-[9px] text-[#71717A]">Sunrise Senior Center Kitchen</p>
            </div>
            <StatusBadge status="0.8 mi" color="green" />
          </div>
          <div className="bg-[#F5F3EF] rounded-xl p-2 flex items-center gap-3">
            <div className="flex-1">
              <div className="h-1 bg-[#E4E2DE] rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: "15%" }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-[#183E34] rounded-full" /></div>
              <div className="flex justify-between mt-1"><span className="text-[8px] text-[#71717A]">Order received</span><span className="text-[8px] text-[#71717A]">Delivered</span></div>
            </div>
          </div>
        </div>
        <div className="border border-[#E4E2DE] rounded-2xl p-3 space-y-2">
          <p className="text-[10px] font-semibold text-[#1A1A1A]">Your Order</p>
          {["Heart-Smart Salmon Bowl", "Diabetic Grilled Chicken"].map(item => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#F5F3EF] rounded-lg flex items-center justify-center text-sm">🍽️</div>
              <span className="text-[10px] text-[#3F3F46] flex-1">{item}</span>
              <CheckCircle size={10} className="text-[#22C55E]" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#F5F3EF] rounded-xl p-2.5 text-center">
            <Clock size={14} className="text-[#183E34] mx-auto mb-1" />
            <p className="text-[9px] text-[#71717A]">Estimated Prep</p>
            <p className="text-[12px] font-bold text-[#1A1A1A]">25–30 min</p>
          </div>
          <div className="bg-[#F5F3EF] rounded-xl p-2.5 text-center">
            <Truck size={14} className="text-[#183E34] mx-auto mb-1" />
            <p className="text-[9px] text-[#71717A]">Delivery Time</p>
            <p className="text-[12px] font-bold text-[#1A1A1A]">~45 min</p>
          </div>
        </div>
      </div>
      <AppNav active="orders" />
    </div>
  ),
  /* 5 — Prep Tracking */
  () => {
    const steps = [
      { label: "Order Received", done: true },
      { label: "Prep Started", done: true, active: true },
      { label: "Quality Check", done: false },
      { label: "Ready for Pickup", done: false },
      { label: "Out for Delivery", done: false },
      { label: "Delivered", done: false },
    ];
    return (
      <div className="h-full flex flex-col bg-white">
        <AppHeader title="Live Tracking" showBack rightAction={<Phone size={15} className="text-[#183E34]" />} />
        <div className="flex-1 overflow-y-auto px-4 py-3 pb-16">
          <div className="bg-[#183E34] rounded-2xl p-3 mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-semibold text-white">Sunrise Senior Center Kitchen</span>
              <StatusBadge status="Preparing" color="yellow" />
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              <span className="text-[10px] text-white/80">Chef is preparing your meals…</span>
            </div>
            <div className="mt-2 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <motion.div initial={{ width: "30%" }} animate={{ width: "45%" }} transition={{ duration: 3, ease: "easeInOut" }} className="h-full bg-white rounded-full" />
            </div>
          </div>
          <div className="space-y-0.5">
            {steps.map((s, i) => (
              <div key={s.label} className="flex gap-3 items-start">
                <div className="flex flex-col items-center">
                  <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 z-10", s.done ? "bg-[#183E34]" : "bg-[#E4E2DE]")}>
                    {s.done ? <CheckCircle size={10} className="text-white" /> : <div className="w-2 h-2 bg-[#C4C2BD] rounded-full" />}
                  </div>
                  {i < steps.length - 1 && <div className={cn("w-[2px] h-5", s.done ? "bg-[#183E34]" : "bg-[#E4E2DE]")} />}
                </div>
                <div className="pb-3">
                  <p className={cn("text-[11px] font-medium", s.done ? "text-[#1A1A1A]" : "text-[#A8A29E]")}>{s.label}</p>
                  {s.active && <p className="text-[9px] text-[#183E34]">In progress</p>}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 border border-[#E4E2DE] rounded-xl p-3 flex items-center gap-2">
            <div className="w-8 h-8 bg-[#F5F3EF] rounded-xl flex items-center justify-center"><ChefHat size={14} className="text-[#183E34]" /></div>
            <div>
              <p className="text-[10px] font-semibold text-[#1A1A1A]">Chef Maria</p>
              <p className="text-[9px] text-[#71717A]">Preparing your meals with care</p>
            </div>
          </div>
        </div>
        <AppNav active="orders" />
      </div>
    );
  },
  /* 6 — Delivery Partner Matched */
  () => (
    <div className="h-full flex flex-col bg-white">
      <NotifToast icon={<Truck size={12} />} title="Delivery Partner Assigned!" sub="James is heading to pick up your order" />
      <AppHeader title="Delivery Tracking" showBack />
      <div className="flex-1 overflow-y-auto px-4 py-3 pb-16 space-y-3">
        <div className="border border-[#183E34]/20 bg-[#183E34]/5 rounded-2xl p-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#183E34] rounded-full flex items-center justify-center text-white font-bold text-[13px]">JD</div>
            <div className="flex-1">
              <p className="text-[11px] font-semibold text-[#1A1A1A]">James D.</p>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s => <Star key={s} size={8} className="text-amber-500 fill-amber-500" />)}
                <span className="text-[9px] text-[#71717A]">4.97 · 342 deliveries</span>
              </div>
            </div>
            <div className="flex gap-1.5">
              <div className="w-7 h-7 border border-[#E4E2DE] rounded-xl flex items-center justify-center"><Phone size={12} className="text-[#183E34]" /></div>
              <div className="w-7 h-7 border border-[#E4E2DE] rounded-xl flex items-center justify-center"><MessageCircle size={12} className="text-[#183E34]" /></div>
            </div>
          </div>
        </div>
        {/* Stylized Map */}
        <div className="rounded-2xl overflow-hidden h-[140px] bg-[#E8F0E9] relative border border-[#E4E2DE]">
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-5 opacity-30">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="border border-[#183E34]/20" />
            ))}
          </div>
          {/* Road lines */}
          <div className="absolute top-1/3 left-0 right-0 h-[3px] bg-white/80" />
          <div className="absolute left-1/3 top-0 bottom-0 w-[3px] bg-white/80" />
          <div className="absolute top-2/3 left-0 right-0 h-[2px] bg-white/60" />
          {/* Facility marker */}
          <div className="absolute top-[30%] left-[28%] w-6 h-6 bg-[#183E34] rounded-full flex items-center justify-center shadow-lg">
            <ChefHat size={10} className="text-white" />
          </div>
          {/* Delivery person */}
          <motion.div animate={{ x: [0, 15, 30], y: [0, -5, -15] }} transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }} className="absolute top-[45%] left-[38%] w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <Truck size={10} className="text-white" />
          </motion.div>
          {/* Destination */}
          <div className="absolute top-[60%] right-[22%] w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
            <Home size={10} className="text-white" />
          </div>
          <div className="absolute bottom-2 left-2 bg-white/90 rounded-lg px-2 py-1">
            <span className="text-[8px] font-semibold text-[#183E34]">ETA: 12 min</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Distance", val: "1.2 mi", icon: <Navigation size={11} className="text-[#183E34]" /> },
            { label: "ETA", val: "12 min", icon: <Clock size={11} className="text-[#183E34]" /> },
            { label: "Stops", val: "Direct", icon: <Zap size={11} className="text-[#183E34]" /> },
          ].map(item => (
            <div key={item.label} className="bg-[#F5F3EF] rounded-xl p-2.5 text-center">
              <div className="flex justify-center mb-1">{item.icon}</div>
              <p className="text-[9px] text-[#71717A]">{item.label}</p>
              <p className="text-[11px] font-bold text-[#1A1A1A]">{item.val}</p>
            </div>
          ))}
        </div>
      </div>
      <AppNav active="orders" />
    </div>
  ),
  /* 7 — Delivered! */
  () => (
    <div className="h-full flex flex-col bg-white">
      <AppHeader title="Order Delivered" />
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-16 space-y-3">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-4">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
            <div className="w-16 h-16 bg-[#D1FAE5] rounded-full flex items-center justify-center mx-auto mb-3">
              <Package size={28} className="text-[#16A34A]" />
            </div>
          </motion.div>
          <h3 className="text-[16px] font-bold text-[#1A1A1A]">Delivered!</h3>
          <p className="text-[10px] text-[#71717A] mt-1">Your medically-tailored meal has arrived</p>
        </motion.div>
        <div className="border border-[#E4E2DE] rounded-2xl p-3 space-y-2">
          <p className="text-[10px] font-semibold text-[#1A1A1A]">Delivery Summary</p>
          <div className="flex justify-between text-[10px]"><span className="text-[#71717A]">Order</span><span className="font-medium">#HP-2847</span></div>
          <div className="flex justify-between text-[10px]"><span className="text-[#71717A]">Delivered by</span><span className="font-medium">James D.</span></div>
          <div className="flex justify-between text-[10px]"><span className="text-[#71717A]">Total time</span><span className="font-medium">42 minutes</span></div>
          <div className="flex justify-between text-[10px]"><span className="text-[#71717A]">Total paid</span><span className="font-bold text-[#183E34]">$27.50</span></div>
        </div>
        <div className="border border-[#E4E2DE] rounded-2xl p-3">
          <p className="text-[10px] font-semibold text-[#1A1A1A] mb-2">Rate your experience</p>
          <div className="flex gap-2 justify-center mb-3">
            {[1,2,3,4,5].map(s => (
              <motion.div key={s} whileTap={{ scale: 1.3 }} className="w-8 h-8 flex items-center justify-center">
                <Star size={20} className={s <= 5 ? "text-amber-400 fill-amber-400" : "text-[#E4E2DE]"} />
              </motion.div>
            ))}
          </div>
          <textarea className="w-full border border-[#E4E2DE] rounded-xl p-2 text-[10px] text-[#3F3F46] bg-[#FAFAF9] resize-none h-[50px] outline-none focus:border-[#183E34]" defaultValue="Excellent quality! The salmon was perfectly seasoned for my dietary needs." />
          <button className="w-full bg-[#183E34] text-white text-[11px] font-semibold py-2.5 rounded-xl mt-2">Submit Review</button>
        </div>
        <button className="w-full border border-[#E4E2DE] text-[#71717A] text-[11px] font-medium py-2.5 rounded-xl flex items-center justify-center gap-2">
          <AlertCircle size={12} />Report an Issue
        </button>
      </div>
      <AppNav active="orders" />
    </div>
  ),
];

/* ═══════════════════════════════════════
   FACILITY SCREENS
═══════════════════════════════════════ */
const FacilityScreens: React.FC[] = [
  /* 0 — Welcome */
  () => (
    <div className="h-full flex flex-col items-center justify-center px-6 text-center bg-gradient-to-b from-[#0f2d24] to-[#183E34]">
      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="w-20 h-20 bg-white/10 rounded-[28px] flex items-center justify-center mx-auto mb-4">
          <ChefHat size={36} className="text-white" />
        </div>
        <h2 className="text-[20px] font-bold text-white">HomePlate for Facilities</h2>
        <p className="text-[10px] text-white/70 mt-2 leading-relaxed">Turn your idle kitchen into a<br />medical meal revenue stream</p>
        <div className="mt-4 space-y-1.5 text-left">
          {["Menus & recipes provided", "Software + training included", "Certified partner network"].map(f => (
            <div key={f} className="flex items-center gap-2"><CheckCircle size={10} className="text-[#6CC827]" /><span className="text-[10px] text-white/80">{f}</span></div>
          ))}
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="w-full mt-6 space-y-2">
        <button className="w-full bg-white text-[#183E34] text-[13px] font-semibold py-3 rounded-2xl">Register Your Kitchen</button>
        <button className="w-full bg-white/10 text-white text-[12px] font-medium py-3 rounded-2xl">Sign In</button>
      </motion.div>
    </div>
  ),
  /* 1 — Facility Info */
  () => (
    <div className="h-full flex flex-col bg-white">
      <AppHeader title="Facility Details" showBack />
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        <div>
          <label className="text-[9px] font-semibold text-[#71717A] uppercase tracking-wide mb-1 block">Facility Name</label>
          <div className="border border-[#183E34] rounded-xl px-3 py-2.5 text-[12px] bg-white flex items-center gap-2 ring-2 ring-[#183E34]/10">
            <Home size={12} className="text-[#183E34]" />Sunrise Senior Center
          </div>
        </div>
        <div>
          <label className="text-[9px] font-semibold text-[#71717A] uppercase tracking-wide mb-1 block">Address</label>
          <div className="border border-[#E4E2DE] rounded-xl px-3 py-2.5 text-[12px] bg-[#FAFAF9] flex items-center gap-2">
            <MapPin size={12} className="text-[#A8A29E]" />123 Oak Street, Fairfax VA
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[9px] font-semibold text-[#71717A] uppercase tracking-wide mb-1 block">Kitchen Capacity</label>
            <div className="border border-[#E4E2DE] rounded-xl px-3 py-2.5 text-[12px] bg-[#FAFAF9]">100 meals/day</div>
          </div>
          <div>
            <label className="text-[9px] font-semibold text-[#71717A] uppercase tracking-wide mb-1 block">License #</label>
            <div className="border border-[#E4E2DE] rounded-xl px-3 py-2.5 text-[12px] bg-[#FAFAF9]">VA-34291-K</div>
          </div>
        </div>
        <div className="bg-[#F5F3EF] rounded-xl p-3">
          <p className="text-[9px] font-semibold text-[#3F3F46] mb-2">Certifications</p>
          {[
            { label: "ServSafe Food Handler", status: "Verified", color: "green" },
            { label: "State Health Dept License", status: "Pending", color: "yellow" },
          ].map(c => (
            <div key={c.label} className="flex items-center justify-between py-1.5 border-b border-[#E4E2DE] last:border-0">
              <span className="text-[10px] text-[#3F3F46]">{c.label}</span>
              <StatusBadge status={c.status} color={c.color} />
            </div>
          ))}
        </div>
        <button className="w-full bg-[#183E34] text-white text-[12px] font-semibold py-3 rounded-2xl">Save & Continue</button>
      </div>
    </div>
  ),
  /* 2 — New Order Incoming */
  () => (
    <div className="h-full flex flex-col bg-[#F5F3EF]">
      <NotifToast icon={<Bell size={12} />} title="New Order Received!" sub="#HP-2847 · Margaret C. · 2 meals" />
      <div className="bg-white border-b border-[#E4E2DE] px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-[#71717A]">Good morning</p>
          <p className="text-[13px] font-bold text-[#1A1A1A]">Kitchen Dashboard</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-[#22C55E] rounded-full blink-dot" />
          <span className="text-[9px] font-medium text-[#22C55E]">Live</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-3 pb-16 space-y-3">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Today", val: "12", sub: "orders" },
            { label: "Prep Queue", val: "3", sub: "active" },
            { label: "Revenue", val: "$186", sub: "today" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-2.5 text-center border border-[#E4E2DE]">
              <p className="text-[14px] font-bold text-[#183E34]">{s.val}</p>
              <p className="text-[8px] text-[#71717A]">{s.label}</p>
            </div>
          ))}
        </div>
        {/* New order card */}
        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl border-2 border-[#183E34] p-3 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-[#F59E0B] rounded-full animate-pulse" /><span className="text-[10px] font-semibold text-[#1A1A1A]">NEW ORDER</span></div>
            <StatusBadge status="#HP-2847" color="teal" />
          </div>
          <div className="space-y-1 mb-2">
            <div className="flex items-center gap-1.5"><User size={10} className="text-[#71717A]" /><span className="text-[10px] text-[#3F3F46]">Margaret Chen</span></div>
            <div className="flex items-center gap-1.5"><Heart size={10} className="text-[#EF4444]" /><span className="text-[10px] text-[#3F3F46]">Heart Healthy + Diabetic-Friendly</span></div>
          </div>
          <div className="bg-[#F5F3EF] rounded-xl p-2 mb-2 space-y-1">
            <div className="flex items-center gap-2"><span className="text-[9px] text-[#71717A]">→</span><span className="text-[10px]">Heart-Smart Salmon Bowl</span></div>
            <div className="flex items-center gap-2"><span className="text-[9px] text-[#71717A]">→</span><span className="text-[10px]">Diabetic Grilled Chicken</span></div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="border border-[#E4E2DE] text-[#71717A] text-[10px] font-medium py-2 rounded-xl">Decline</button>
            <button className="bg-[#183E34] text-white text-[10px] font-semibold py-2 rounded-xl">Accept Order</button>
          </div>
        </motion.div>
      </div>
    </div>
  ),
  /* 3 — Prep In Progress */
  () => {
    const items = [
      { name: "Heart-Smart Salmon Bowl", steps: ["Season salmon", "Steam vegetables", "Plate & portion"], current: 1 },
      { name: "Diabetic Grilled Chicken", steps: ["Marinate chicken", "Grill to temp", "Add sides"], current: 0 },
    ];
    return (
      <div className="h-full flex flex-col bg-white">
        <AppHeader title="Prep Station" rightAction={<ClipboardList size={15} className="text-[#183E34]" />} />
        <div className="flex-1 overflow-y-auto px-4 py-3 pb-16 space-y-3">
          <div className="bg-[#183E34] rounded-2xl p-3 flex items-center justify-between">
            <div>
              <p className="text-[9px] text-white/70">Order #HP-2847</p>
              <p className="text-[11px] font-semibold text-white">Prep in progress</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-white/70">Target ready</p>
              <p className="text-[12px] font-bold text-[#6CC827]">2:45 PM</p>
            </div>
          </div>
          {items.map(item => (
            <div key={item.name} className="border border-[#E4E2DE] rounded-2xl p-3">
              <p className="text-[10px] font-semibold text-[#1A1A1A] mb-2">{item.name}</p>
              <div className="space-y-1.5">
                {item.steps.map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <div className={cn("w-4 h-4 rounded-full flex items-center justify-center shrink-0", i < item.current ? "bg-[#183E34]" : i === item.current ? "border-2 border-[#183E34]" : "border-2 border-[#E4E2DE]")}>
                      {i < item.current && <CheckCircle size={8} className="text-white" />}
                      {i === item.current && <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-[#183E34] rounded-full" />}
                    </div>
                    <span className={cn("text-[10px]", i <= item.current ? "text-[#1A1A1A] font-medium" : "text-[#A8A29E]")}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button className="w-full bg-[#6CC827] text-white text-[12px] font-semibold py-3 rounded-2xl flex items-center justify-center gap-2">
            <CheckCircle size={14} />Mark as Ready for Pickup
          </button>
        </div>
      </div>
    );
  },
  /* 4 — Delivery Partner Matched + Handoff */
  () => (
    <div className="h-full flex flex-col bg-white">
      <AppHeader title="Ready for Handoff" />
      <div className="flex-1 overflow-y-auto px-4 py-3 pb-16 space-y-3">
        <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-3 text-center">
          <div className="w-10 h-10 bg-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-2">
            <Package size={18} className="text-white" />
          </div>
          <p className="text-[12px] font-bold text-[#1A1A1A]">All 2 meals prepared!</p>
          <p className="text-[9px] text-[#71717A]">Quality checked · Packaged · Labeled</p>
        </div>
        <div className="border border-[#E4E2DE] rounded-2xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-[#22C55E] rounded-full blink-dot" />
            <span className="text-[10px] font-semibold text-[#1A1A1A]">Delivery Partner En Route</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#183E34] rounded-full flex items-center justify-center text-white font-bold text-[12px]">JD</div>
            <div className="flex-1">
              <p className="text-[11px] font-semibold">James D.</p>
              <p className="text-[9px] text-[#71717A]">Arriving in ~4 minutes</p>
            </div>
            <StatusBadge status="Nearby" color="green" />
          </div>
        </div>
        <div className="border border-[#E4E2DE] rounded-2xl p-3 space-y-1.5">
          <p className="text-[10px] font-semibold text-[#1A1A1A] mb-2">Handoff Checklist</p>
          {["2 meal boxes sealed & labeled", "Allergen card included", "Temperature log signed", "ID verified: James D."].map(item => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle size={10} className="text-[#22C55E] shrink-0" />
              <span className="text-[10px] text-[#3F3F46]">{item}</span>
            </div>
          ))}
        </div>
        <button className="w-full bg-[#183E34] text-white text-[12px] font-semibold py-3 rounded-2xl flex items-center justify-center gap-2">
          <BadgeCheck size={14} />Confirm Handoff
        </button>
        <div className="bg-[#F5F3EF] rounded-xl p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-semibold text-[#3F3F46]">Order Earnings</span>
            <span className="text-[12px] font-bold text-[#183E34]">+$18.40</span>
          </div>
          <div className="h-1 bg-[#E4E2DE] rounded-full overflow-hidden"><div className="h-full w-[80%] bg-[#183E34] rounded-full" /></div>
          <p className="text-[8px] text-[#71717A] mt-1">80% of order value · Paid within 24h</p>
        </div>
      </div>
    </div>
  ),
];

/* ═══════════════════════════════════════
   DELIVERY SCREENS
═══════════════════════════════════════ */
const DeliveryScreens: React.FC[] = [
  /* 0 — Welcome */
  () => (
    <div className="h-full flex flex-col items-center justify-center px-6 text-center bg-gradient-to-b from-[#1d4ed8] to-[#1e3a8a]">
      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="w-20 h-20 bg-white/10 rounded-[28px] flex items-center justify-center mx-auto mb-4">
          <Truck size={36} className="text-white" />
        </div>
        <h2 className="text-[20px] font-bold text-white">Deliver with HomePlate</h2>
        <p className="text-[10px] text-white/70 mt-2 leading-relaxed">Earn flexible income delivering<br />medically-important meals</p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[
            { label: "Avg/hr", val: "$22" },
            { label: "Flexibility", val: "100%" },
            { label: "Purpose", val: "High" },
          ].map(s => (
            <div key={s.label} className="bg-white/10 rounded-xl p-2">
              <p className="text-[14px] font-bold text-white">{s.val}</p>
              <p className="text-[8px] text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="w-full mt-6 space-y-2">
        <button className="w-full bg-white text-blue-700 text-[13px] font-semibold py-3 rounded-2xl">Apply to Drive</button>
        <button className="w-full bg-white/10 text-white text-[12px] font-medium py-3 rounded-2xl">Already have an account</button>
      </motion.div>
    </div>
  ),
  /* 1 — Driver Sign Up */
  () => (
    <div className="h-full flex flex-col bg-white">
      <AppHeader title="Driver Application" showBack />
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        <div>
          <label className="text-[9px] font-semibold text-[#71717A] uppercase tracking-wide mb-1 block">Full Name</label>
          <div className="border border-[#183E34] rounded-xl px-3 py-2.5 text-[12px] bg-white flex items-center gap-2 ring-2 ring-[#183E34]/10">
            <User size={12} className="text-[#183E34]" />James D.
          </div>
        </div>
        <div>
          <label className="text-[9px] font-semibold text-[#71717A] uppercase tracking-wide mb-1 block">Vehicle Type</label>
          <div className="grid grid-cols-3 gap-1.5">
            {["Car 🚗", "Bike 🚲", "Scooter 🛵"].map((v, i) => (
              <div key={v} className={cn("border rounded-xl py-2 text-center text-[10px] font-medium", i === 0 ? "border-[#183E34] bg-[#183E34]/5 text-[#183E34]" : "border-[#E4E2DE] text-[#71717A]")}>{v}</div>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[9px] font-semibold text-[#71717A] uppercase tracking-wide mb-1 block">Driver&apos;s License</label>
          <div className="border border-dashed border-[#E4E2DE] rounded-xl p-3 flex flex-col items-center gap-1.5 text-center">
            <Camera size={16} className="text-[#A8A29E]" />
            <span className="text-[9px] text-[#71717A]">Upload front & back</span>
          </div>
        </div>
        <div className="bg-[#F5F3EF] rounded-xl p-3">
          <p className="text-[9px] font-semibold text-[#3F3F46] mb-2">Background Check</p>
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-[#183E34]" />
            <div className="flex-1"><p className="text-[9px] text-[#3F3F46]">Powered by Checkr · Results in 24–48h</p></div>
          </div>
        </div>
        <button className="w-full bg-[#183E34] text-white text-[12px] font-semibold py-3 rounded-2xl">Submit Application</button>
      </div>
    </div>
  ),
  /* 2 — Order Assigned */
  () => (
    <div className="h-full flex flex-col bg-[#F5F3EF]">
      <NotifToast icon={<Package size={12} />} title="New Delivery Request!" sub="0.3 mi away · $8.40 · 2 items" />
      <div className="bg-white border-b border-[#E4E2DE] px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-[#71717A]">You&apos;re online</p>
          <p className="text-[13px] font-bold text-[#1A1A1A]">Driver Dashboard</p>
        </div>
        <div className="flex items-center gap-1.5 bg-[#D1FAE5] px-2.5 py-1 rounded-full">
          <div className="w-2 h-2 bg-[#22C55E] rounded-full blink-dot" />
          <span className="text-[9px] font-semibold text-[#065F46]">Available</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-3 pb-16 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Today's Earnings", val: "$54.20", icon: <DollarSign size={12} className="text-[#183E34]" /> },
            { label: "Deliveries", val: "6", icon: <Package size={12} className="text-[#183E34]" /> },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-3 border border-[#E4E2DE]">
              {s.icon}
              <p className="text-[14px] font-bold text-[#1A1A1A] mt-1">{s.val}</p>
              <p className="text-[8px] text-[#71717A]">{s.label}</p>
            </div>
          ))}
        </div>
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl border-2 border-blue-500 p-3 shadow-sm">
          <div className="flex items-center gap-1.5 mb-2"><div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" /><span className="text-[10px] font-semibold text-blue-700">DELIVERY REQUEST</span></div>
          <div className="space-y-1.5 mb-3">
            <div className="flex items-center gap-2"><Package size={10} className="text-[#71717A]" /><span className="text-[10px]">2 meal boxes · HomePlate #HP-2847</span></div>
            <div className="flex items-center gap-2"><MapPin size={10} className="text-[#71717A]" /><span className="text-[10px]">Pickup: Sunrise Senior Center (0.3 mi)</span></div>
            <div className="flex items-center gap-2"><Home size={10} className="text-[#71717A]" /><span className="text-[10px]">Drop-off: 4210 Maple Ave (1.2 mi)</span></div>
            <div className="flex items-center gap-2"><DollarSign size={10} className="text-[#22C55E]" /><span className="text-[10px] font-semibold text-[#22C55E]">$8.40 payout</span></div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="border border-[#E4E2DE] text-[#71717A] text-[10px] font-medium py-2 rounded-xl">Decline</button>
            <button className="bg-blue-600 text-white text-[10px] font-semibold py-2 rounded-xl">Accept</button>
          </div>
        </motion.div>
      </div>
    </div>
  ),
  /* 3 — Pickup + Delivery */
  () => (
    <div className="h-full flex flex-col bg-white">
      <AppHeader title="Active Delivery" />
      <div className="flex-1 overflow-y-auto px-4 py-3 pb-16 space-y-3">
        {/* Map */}
        <div className="rounded-2xl overflow-hidden h-[130px] bg-[#E8F0E9] relative border border-[#E4E2DE]">
          <div className="absolute inset-0 grid grid-cols-5 grid-rows-4 opacity-20">
            {Array.from({ length: 20 }).map((_, i) => <div key={i} className="border border-[#183E34]/20" />)}
          </div>
          <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-white/80" />
          <div className="absolute left-1/4 top-0 bottom-0 w-[2px] bg-white/60" />
          <div className="absolute top-[38%] left-[22%] w-5 h-5 bg-[#183E34] rounded-full flex items-center justify-center shadow-md">
            <ChefHat size={9} className="text-white" />
          </div>
          <motion.div animate={{ x: [0, 20, 50] }} transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }} className="absolute top-[48%] left-[30%] w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
            <Truck size={9} className="text-white" />
          </motion.div>
          <div className="absolute top-[55%] right-[18%] w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-md">
            <Home size={9} className="text-white" />
          </div>
          <div className="absolute top-2 right-2 bg-white/90 rounded-lg px-2 py-0.5">
            <span className="text-[8px] font-semibold text-[#183E34]">ETA: 8 min</span>
          </div>
        </div>
        {/* Steps */}
        <div className="space-y-2">
          {[
            { label: "Pick up from Sunrise Senior Center", done: true, active: false, address: "123 Oak Street" },
            { label: "Deliver to Margaret Chen", done: false, active: true, address: "4210 Maple Ave" },
          ].map(s => (
            <div key={s.label} className={cn("rounded-xl p-3 border", s.active ? "border-blue-500 bg-blue-50" : "border-[#E4E2DE] bg-[#F5F3EF]")}>
              <div className="flex items-center gap-2">
                <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0", s.done ? "bg-[#22C55E]" : s.active ? "bg-blue-600 animate-pulse" : "bg-[#E4E2DE]")}>
                  {s.done ? <CheckCircle size={9} className="text-white" /> : <Navigation size={9} className="text-white" />}
                </div>
                <div>
                  <p className={cn("text-[10px] font-semibold", s.active ? "text-blue-700" : "text-[#1A1A1A]")}>{s.label}</p>
                  <p className="text-[9px] text-[#71717A]">{s.address}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border border-[#E4E2DE] rounded-xl p-3 flex items-center gap-2">
          <User size={14} className="text-[#183E34]" />
          <div className="flex-1"><p className="text-[10px] font-semibold">Margaret Chen</p><p className="text-[9px] text-[#71717A]">(571) 443-2190</p></div>
          <div className="flex gap-1"><div className="w-7 h-7 border border-[#E4E2DE] rounded-xl flex items-center justify-center"><Phone size={11} className="text-[#183E34]" /></div></div>
        </div>
        <button className="w-full bg-[#22C55E] text-white text-[12px] font-semibold py-3 rounded-2xl flex items-center justify-center gap-2">
          <CheckCircle size={14} />Confirm Delivery
        </button>
      </div>
    </div>
  ),
];

/* ─────────── Step definitions ─────────── */
const CUSTOMER_STEPS: Omit<StepData, "screen">[] = [
  { id: 0, label: "Welcome", title: "Customer Onboarding", subtitle: "Margaret downloads the HomePlate app and is greeted with a clean, welcoming onboarding flow.", sideUpdates: [
    { icon: <User size={14} />, text: "New user journey starts", sub: "First-time app open", color: "bg-[#DBEAFE] text-[#1D4ED8]" },
    { icon: <Zap size={14} />, text: "App loads in <1s", sub: "Optimized for all devices", color: "bg-[#D1FAE5] text-[#065F46]" },
  ]},
  { id: 1, label: "Sign Up", title: "Account Creation", subtitle: "Margaret fills in her details — name, email, phone, and address. Her data is securely stored and only used to match her with nearby facilities.", sideUpdates: [
    { icon: <ShieldCheck size={14} />, text: "HIPAA-compliant data storage", sub: "AES-256 encryption", color: "bg-[#D1FAE5] text-[#065F46]" },
    { icon: <MapPin size={14} />, text: "Address geocoded", sub: "Fairfax, VA 22030", color: "bg-[#EDE9FE] text-[#5B21B6]" },
  ]},
  { id: 2, label: "Preferences", title: "Dietary Preferences", subtitle: "Margaret selects her clinically-required dietary needs. These preferences are stored and communicated to facility kitchens with every order.", sideUpdates: [
    { icon: <Heart size={14} />, text: "Dietary profile saved", sub: "Heart Healthy + Diabetic + Dairy-Free", color: "bg-[#FEE2E2] text-[#991B1B]" },
    { icon: <Leaf size={14} />, text: "Matched to certified kitchens", sub: "3 facilities in your area", color: "bg-[#D1FAE5] text-[#065F46]" },
  ]},
  { id: 3, label: "Order", title: "Browse & Place Order", subtitle: "Margaret browses medically-tailored meals filtered to her dietary needs. She adds 2 items to her cart and proceeds to checkout.", sideUpdates: [
    { icon: <Search size={14} />, text: "Meals filtered by dietary needs", sub: "Showing 12 eligible meals", color: "bg-[#EDE9FE] text-[#5B21B6]" },
    { icon: <ShoppingBag size={14} />, text: "Cart updated", sub: "2 items · $27.50", color: "bg-[#FEF3C7] text-[#92400E]" },
  ]},
  { id: 4, label: "Matched", title: "Order Placed & Facility Matched", subtitle: "Order #HP-2847 is instantly matched to Sunrise Senior Center Kitchen — just 0.8 miles away. Estimated prep: 25–30 min.", sideUpdates: [
    { icon: <Zap size={14} />, text: "Order routed in <2 seconds", sub: "AI-powered proximity matching", color: "bg-[#D1FAE5] text-[#065F46]" },
    { icon: <ChefHat size={14} />, text: "Sunrise Senior Center assigned", sub: "0.8 mi · Capacity: Available", color: "bg-[#DBEAFE] text-[#1D4ED8]" },
    { icon: <Bell size={14} />, text: "Facility notified", sub: "Order acceptance pending", color: "bg-[#FEF3C7] text-[#92400E]" },
  ]},
  { id: 5, label: "Tracking", title: "Real-Time Prep Tracking", subtitle: "Margaret watches her order progress in real-time. The app shows each kitchen step — from prep to quality check to packaging.", sideUpdates: [
    { icon: <ChefHat size={14} />, text: "Chef Maria started prep", sub: "2:15 PM — Salmon + Chicken", color: "bg-[#FEF3C7] text-[#92400E]" },
    { icon: <Clock size={14} />, text: "Live ETA updated", sub: "Ready in ~18 minutes", color: "bg-[#DBEAFE] text-[#1D4ED8]" },
  ]},
  { id: 6, label: "Delivery", title: "Delivery Partner Matched", subtitle: "James D., a top-rated nearby driver, is automatically matched and dispatched to the facility. Margaret gets his info and live location.", sideUpdates: [
    { icon: <Truck size={14} />, text: "James D. assigned", sub: "4.97★ · 342 deliveries · 0.4 mi away", color: "bg-[#D1FAE5] text-[#065F46]" },
    { icon: <Navigation size={14} />, text: "Route calculated", sub: "Facility → Customer: 1.2 mi · 12 min", color: "bg-[#EDE9FE] text-[#5B21B6]" },
  ]},
  { id: 7, label: "Complete", title: "Delivered & Feedback", subtitle: "Margaret's meals arrive in 42 minutes. She rates her experience 5 stars and submits a review. The entire loop closes seamlessly.", sideUpdates: [
    { icon: <CheckCircle size={14} />, text: "Order delivered!", sub: "Total time: 42 minutes", color: "bg-[#D1FAE5] text-[#065F46]" },
    { icon: <Star size={14} />, text: "5★ review submitted", sub: "Positive feedback loop", color: "bg-[#FEF3C7] text-[#92400E]" },
    { icon: <DollarSign size={14} />, text: "Payment processed", sub: "$27.50 · Facility gets $22.00", color: "bg-[#DBEAFE] text-[#1D4ED8]" },
  ]},
];

const FACILITY_STEPS: Omit<StepData, "screen">[] = [
  { id: 0, label: "Welcome", title: "Facility Onboarding", subtitle: "Sunrise Senior Center opens the HomePlate Facility app. They discover how to turn their idle kitchen into a certified medical meal operation.", sideUpdates: [
    { icon: <TrendingUp size={14} />, text: "Revenue opportunity unlocked", sub: "Average $4,200/mo added revenue", color: "bg-[#D1FAE5] text-[#065F46]" },
    { icon: <Users size={14} />, text: "Join 200+ partner facilities", sub: "Across 12 metro areas", color: "bg-[#DBEAFE] text-[#1D4ED8]" },
  ]},
  { id: 1, label: "Setup", title: "Facility Registration", subtitle: "The kitchen manager fills in facility details, uploads certifications, and sets their daily capacity. HomePlate verifies everything within 48h.", sideUpdates: [
    { icon: <BadgeCheck size={14} />, text: "ServSafe certification verified", sub: "License #VA-34291-K approved", color: "bg-[#D1FAE5] text-[#065F46]" },
    { icon: <ClipboardList size={14} />, text: "Capacity set: 100 meals/day", sub: "Revenue potential: ~$1,450/day", color: "bg-[#FEF3C7] text-[#92400E]" },
  ]},
  { id: 2, label: "New Order", title: "Order Received", subtitle: "A new order from Margaret Chen arrives. The kitchen sees full dietary details, allergen flags, and a one-tap accept/decline flow.", sideUpdates: [
    { icon: <Bell size={14} />, text: "Order #HP-2847 received", sub: "2 meals · Heart Healthy + Diabetic", color: "bg-[#FEF3C7] text-[#92400E]" },
    { icon: <Heart size={14} />, text: "Allergen flags auto-highlighted", sub: "No dairy · Low sodium required", color: "bg-[#FEE2E2] text-[#991B1B]" },
    { icon: <DollarSign size={14} />, text: "Payout calculated", sub: "$18.40 on acceptance", color: "bg-[#D1FAE5] text-[#065F46]" },
  ]},
  { id: 3, label: "Prep", title: "Kitchen Prep Station", subtitle: "Chef Maria follows the step-by-step prep guide in the app. Each dish step is checked off as it's completed, ensuring quality.", sideUpdates: [
    { icon: <ChefHat size={14} />, text: "Prep started: 2:15 PM", sub: "Chef Maria · Station 2", color: "bg-[#FEF3C7] text-[#92400E]" },
    { icon: <Clock size={14} />, text: "Customer notified: Prep started", sub: "ETA updated to 2:45 PM", color: "bg-[#DBEAFE] text-[#1D4ED8]" },
  ]},
  { id: 4, label: "Handoff", title: "Delivery Partner Handoff", subtitle: "Both meals are prepared, quality-checked, and packaged. James D. arrives on time for a smooth, verified handoff.", sideUpdates: [
    { icon: <Package size={14} />, text: "2 meals packaged & labeled", sub: "Temp check: 165°F ✓", color: "bg-[#D1FAE5] text-[#065F46]" },
    { icon: <Truck size={14} />, text: "James D. arrived for pickup", sub: "Identity verified · 2:47 PM", color: "bg-[#DBEAFE] text-[#1D4ED8]" },
    { icon: <DollarSign size={14} />, text: "$18.40 credited", sub: "Paid within 24h to bank account", color: "bg-[#D1FAE5] text-[#065F46]" },
  ]},
];

const DELIVERY_STEPS: Omit<StepData, "screen">[] = [
  { id: 0, label: "Welcome", title: "Driver Onboarding", subtitle: "James opens the HomePlate Driver app. He learns he can earn flexible income while serving his community through medically-important deliveries.", sideUpdates: [
    { icon: <DollarSign size={14} />, text: "Average $22/hour earnings", sub: "Top drivers earn $38/hr", color: "bg-[#D1FAE5] text-[#065F46]" },
    { icon: <Clock size={14} />, text: "Fully flexible schedule", sub: "Set your own availability", color: "bg-[#DBEAFE] text-[#1D4ED8]" },
  ]},
  { id: 1, label: "Apply", title: "Driver Application", subtitle: "James submits his license, vehicle info, and consent for a background check. Approval typically takes 24–48 hours.", sideUpdates: [
    { icon: <ShieldCheck size={14} />, text: "Background check initiated", sub: "Powered by Checkr · 24–48h", color: "bg-[#EDE9FE] text-[#5B21B6]" },
    { icon: <BadgeCheck size={14} />, text: "Vehicle verified: Honda Civic 2021", sub: "Insurance on file", color: "bg-[#D1FAE5] text-[#065F46]" },
  ]},
  { id: 2, label: "Order", title: "Order Assigned", subtitle: "James is online and receives a delivery request: pick up 2 meal boxes from Sunrise Senior Center and deliver to Margaret — $8.40 payout.", sideUpdates: [
    { icon: <Package size={14} />, text: "Order #HP-2847 assigned", sub: "2 meals · $8.40 payout", color: "bg-[#FEF3C7] text-[#92400E]" },
    { icon: <Navigation size={14} />, text: "Route optimized", sub: "0.3 mi to pickup · 1.2 mi to drop", color: "bg-[#DBEAFE] text-[#1D4ED8]" },
  ]},
  { id: 3, label: "Deliver", title: "Pickup & Delivery", subtitle: "James drives to the facility, does the verified handoff, then navigates to Margaret's home for the final delivery.", sideUpdates: [
    { icon: <CheckCircle size={14} />, text: "Pickup confirmed at facility", sub: "2:51 PM · Temp verified", color: "bg-[#D1FAE5] text-[#065F46]" },
    { icon: <Truck size={14} />, text: "En route to customer", sub: "ETA: 8 min · 1.2 mi", color: "bg-[#DBEAFE] text-[#1D4ED8]" },
    { icon: <Star size={14} />, text: "Delivery completed!", sub: "$8.40 earned · 5★ from Margaret", color: "bg-[#FEF3C7] text-[#92400E]" },
  ]},
];

/* ─────────── Side Update Card ─────────── */
function UpdateCard({ update, delay = 0 }: { update: SideUpdate; delay?: number }) {
  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="flex items-start gap-3 bg-white border border-[#E4E2DE] rounded-xl p-3"
    >
      <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center shrink-0", update.color)}>
        {update.icon}
      </div>
      <div className="min-w-0">
        <p className="text-[12px] font-semibold text-[#1A1A1A]">{update.text}</p>
        {update.sub && <p className="text-[10px] text-[#71717A] mt-0.5">{update.sub}</p>}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   MAIN DEMO PAGE
═══════════════════════════════════════ */
export default function DemoPage() {
  const [role, setRole] = useState<Role>("customer");
  const [step, setStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [dir, setDir] = useState(1);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const roleScreens = {
    customer: CustomerScreens,
    facility: FacilityScreens,
    delivery: DeliveryScreens,
  };

  const roleSteps = {
    customer: CUSTOMER_STEPS,
    facility: FACILITY_STEPS,
    delivery: DELIVERY_STEPS,
  };

  const screens = roleScreens[role];
  const steps = roleSteps[role];
  const maxStep = screens.length - 1;
  const currentStep = steps[step];
  const Screen = screens[step];

  const advance = useCallback(() => {
    if (step < maxStep) {
      setDir(1);
      setStep(s => s + 1);
    } else {
      setAutoPlay(false);
    }
  }, [step, maxStep]);

  const back = () => {
    if (step > 0) {
      setDir(-1);
      setStep(s => s - 1);
    }
  };

  const switchRole = (r: Role) => {
    setAutoPlay(false);
    setRole(r);
    setStep(0);
    setDir(1);
  };

  const reset = () => {
    setDir(-1);
    setStep(0);
    setAutoPlay(false);
  };

  useEffect(() => {
    if (autoPlay) {
      autoRef.current = setTimeout(advance, 2800);
    }
    return () => { if (autoRef.current) clearTimeout(autoRef.current); };
  }, [autoPlay, step, advance]);

  const roleConfig = {
    customer: { label: "Customer", icon: <User size={15} />, color: "#183E34", bg: "bg-[#183E34]", light: "bg-[#183E34]/10 text-[#183E34]" },
    facility: { label: "Facility", icon: <ChefHat size={15} />, color: "#065F46", bg: "bg-[#065F46]", light: "bg-[#065F46]/10 text-[#065F46]" },
    delivery: { label: "Driver", icon: <Truck size={15} />, color: "#1D4ED8", bg: "bg-blue-600", light: "bg-blue-100 text-blue-700" },
  };

  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      {/* ── Top Nav ── */}
      <nav className="sticky top-0 z-50 bg-[rgba(245,243,239,0.97)] backdrop-blur-xl border-b border-[#E4E2DE]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center no-underline">
              <Image src="/images/homeplate-logo.png" alt="HomePlate" width={130} height={32} style={{ height: 28, width: "auto" }} priority />
            </Link>
            <div className="hidden sm:flex items-center gap-1.5 bg-[#183E34]/10 px-3 py-1 rounded-full">
              <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full blink-dot" />
              <span className="text-[11px] font-semibold text-[#183E34]">Interactive Demo</span>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 bg-[#183E34] text-white px-4 py-2 rounded-xl text-[13px] font-semibold no-underline hover:bg-[#122D26] transition-colors"
          >
            Get Full Demo <ArrowRight size={13} />
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 pt-10 pb-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 bg-[#183E34]/10 text-[#183E34] px-3 py-1 rounded-full text-[11px] font-semibold mb-3">
            <Zap size={11} />Platform Walkthrough
          </div>
          <h1 className="text-[clamp(26px,4vw,48px)] font-bold text-[#1A1A1A] leading-tight">
            See HomePlate in Action
          </h1>
          <p className="text-[clamp(13px,1.5vw,16px)] text-[#71717A] mt-2 max-w-[560px]">
            An interactive step-by-step demo of the full platform — from onboarding through delivery — across all three personas.
          </p>
        </motion.div>
      </div>

      {/* ── Role Selector ── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 pb-6">
        <div className="flex gap-2 flex-wrap">
          {(["customer", "facility", "delivery"] as Role[]).map(r => {
            const cfg = roleConfig[r];
            const stepCount = roleScreens[r].length;
            return (
              <motion.button
                key={r}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => switchRole(r)}
                className={cn(
                  "flex items-center gap-2.5 px-4 py-3 rounded-2xl border transition-all text-left",
                  role === r
                    ? `${cfg.bg} text-white border-transparent shadow-md`
                    : "bg-white border-[#E4E2DE] text-[#3F3F46] hover:border-[#183E34]/30"
                )}
              >
                {cfg.icon}
                <div>
                  <p className={cn("text-[13px] font-semibold", role === r ? "text-white" : "text-[#1A1A1A]")}>{cfg.label}</p>
                  <p className={cn("text-[10px]", role === r ? "text-white/70" : "text-[#71717A]")}>{stepCount} steps</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ── Main Demo Area ── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 pb-16">
        <div className="grid lg:grid-cols-[auto_1fr] gap-8 items-start">

          {/* Phone Column */}
          <div className="flex flex-col items-center gap-4">
            {/* Step progress */}
            <div className="flex gap-1.5">
              {steps.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => { setDir(i > step ? 1 : -1); setStep(i); setAutoPlay(false); }}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    i === step ? "w-6 h-2 bg-[#183E34]" : i < step ? "w-2 h-2 bg-[#183E34]/40" : "w-2 h-2 bg-[#E4E2DE]"
                  )}
                />
              ))}
            </div>

            {/* Phone */}
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={`${role}-${step}`}
                custom={dir}
                initial={{ x: dir * 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: dir * -60, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <PhoneFrame>
                  <Screen />
                </PhoneFrame>
              </motion.div>
            </AnimatePresence>

            {/* Step label */}
            <div className="text-center">
              <p className="text-[11px] font-semibold text-[#183E34] uppercase tracking-wide">{currentStep.label}</p>
              <p className="text-[10px] text-[#A8A29E]">Step {step + 1} of {steps.length}</p>
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-5">
            {/* Step description */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`info-${role}-${step}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="bg-white border border-[#E4E2DE] rounded-2xl p-6"
              >
                <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold mb-3", roleConfig[role].light)}>
                  {roleConfig[role].icon}{roleConfig[role].label} View
                </div>
                <h2 className="text-[22px] font-bold text-[#1A1A1A] leading-tight mb-2">{currentStep.title}</h2>
                <p className="text-[14px] text-[#71717A] leading-relaxed">{currentStep.subtitle}</p>
              </motion.div>
            </AnimatePresence>

            {/* System Updates */}
            <div>
              <p className="text-[11px] font-semibold text-[#71717A] uppercase tracking-wide mb-2.5">System Updates</p>
              <AnimatePresence mode="wait">
                <motion.div key={`updates-${role}-${step}`} className="space-y-2">
                  {currentStep.sideUpdates.map((u, i) => (
                    <UpdateCard key={i} update={u} delay={i * 0.12} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="bg-white border border-[#E4E2DE] rounded-2xl p-4 flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={back}
                disabled={step === 0}
                className="flex items-center gap-2 px-4 py-2.5 border border-[#E4E2DE] rounded-xl text-[13px] font-medium text-[#3F3F46] disabled:opacity-30 hover:bg-[#F5F3EF] transition-colors"
              >
                <ArrowLeft size={14} />Back
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setAutoPlay(a => !a)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-colors",
                  autoPlay ? "bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]" : "bg-[#F5F3EF] text-[#3F3F46] border border-[#E4E2DE]"
                )}
              >
                {autoPlay ? <Pause size={14} /> : <Play size={14} />}
                {autoPlay ? "Pause" : "Auto-play"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={advance}
                disabled={step === maxStep}
                className="flex-1 flex items-center justify-center gap-2 bg-[#183E34] text-white px-4 py-2.5 rounded-xl text-[13px] font-semibold disabled:opacity-40 hover:bg-[#122D26] transition-colors"
              >
                {step === maxStep ? "Done" : "Next Step"}
                <ArrowRight size={14} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={reset}
                className="p-2.5 border border-[#E4E2DE] rounded-xl text-[#71717A] hover:bg-[#F5F3EF] transition-colors"
                title="Restart"
              >
                <RotateCcw size={14} />
              </motion.button>
            </div>

            {/* All steps overview */}
            <div className="bg-white border border-[#E4E2DE] rounded-2xl p-4">
              <p className="text-[11px] font-semibold text-[#71717A] uppercase tracking-wide mb-3">All Steps</p>
              <div className="space-y-1">
                {steps.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => { setDir(i > step ? 1 : -1); setStep(i); setAutoPlay(false); }}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors",
                      i === step ? "bg-[#183E34]/8 text-[#183E34]" : i < step ? "text-[#71717A] hover:bg-[#F5F3EF]" : "text-[#A8A29E] hover:bg-[#F5F3EF]"
                    )}
                  >
                    <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[9px] font-bold", i === step ? "bg-[#183E34] text-white" : i < step ? "bg-[#22C55E] text-white" : "bg-[#E4E2DE] text-[#71717A]")}>
                      {i < step ? <CheckCircle size={10} /> : i + 1}
                    </div>
                    <span className={cn("text-[12px] font-medium", i === step ? "text-[#183E34] font-semibold" : "")}>{s.label}</span>
                    {i === step && <ChevronRight size={12} className="ml-auto text-[#183E34]" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="bg-[#183E34] py-14 px-4">
        <div className="max-w-[720px] mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-[clamp(22px,3vw,36px)] font-bold text-white mb-3">Ready to launch your meal program?</h2>
            <p className="text-[14px] text-white/70 mb-6">Join our network of facilities, customers, and drivers already using HomePlate.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/#apply" className="bg-white text-[#183E34] px-6 py-3 rounded-xl text-[14px] font-semibold no-underline hover:bg-[#F5F3EF] transition-colors flex items-center gap-2">
                Get Started Free <ArrowRight size={14} />
              </Link>
              <Link href="/" className="border border-white/30 text-white px-6 py-3 rounded-xl text-[14px] font-medium no-underline hover:bg-white/10 transition-colors">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
