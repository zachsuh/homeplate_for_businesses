import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HomePlate — Turn Your Idle Kitchen Into a Medical Meal Program",
  description:
    "HomePlate Medical Meals turns your senior center's idle kitchen into a fully operational medically-tailored meal program — with the menus, software, training, and marketing already handled.",
  openGraph: {
    title: "HomePlate — Medical Meals for Senior Centers",
    description:
      "Turn idle kitchen capacity into a new revenue line serving seniors in your community.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-[var(--font-geist)] antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
