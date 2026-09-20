"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const LINKS = [
  { label: "How it works", href: "/Ansify#how-it-works" },
  { label: "Showcases", href: "/Ansify#showcases" },
  { label: "Pricing", href: "/Ansify#pricing" },
  { label: "Login", href: "/signIn" },
];

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="
        relative z-10
        max-w-3xl mx-auto
        mt-9 px-3 py-2.5 pl-4
        flex items-center justify-between
        rounded-full
        bg-white/25
        border border-white/50
        backdrop-blur-xl
        shadow-[0_10px_30px_rgba(10,40,80,0.16)]
      "
    >
      <div className="flex items-center gap-2.5">
        <Logo variant="light" size={30} />
        <span className="ml-1 text-[0.65rem] font-semibold tracking-wide text-[#14559e] bg-white/80 px-2 py-0.5 rounded-full">
          BETA
        </span>
      </div>

      {/* Desktop links */}
      <ul className="nav-links hidden md:flex items-center gap-8 list-none m-0 p-0">
        {LINKS.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="nav-link">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/Ansify-AI")}
          className="bg-white text-[#123055] text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm cursor-pointer"
        >
          Dashboard
        </motion.button>
        <button
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute top-full mt-2 left-0 right-0 md:hidden rounded-2xl bg-white/95 backdrop-blur-xl border border-white/60 shadow-xl p-3">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-[#123055] hover:bg-[#123055]/5"
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              router.push("/Ansify-AI");
            }}
            className="mt-1 w-full px-4 py-2.5 rounded-xl text-sm font-semibold bg-[#123055] text-white"
          >
            Open Ansify AI
          </button>
        </div>
      )}
    </motion.nav>
  );
}
