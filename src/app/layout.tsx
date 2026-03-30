import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

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
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${poppins.variable}`}>
      <body className="font-[var(--font-poppins)] antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
