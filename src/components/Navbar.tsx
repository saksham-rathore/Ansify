"use client";

import { motion } from "framer-motion";

export default function Navbar() {
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
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <span className="logo-mark bg-white text-[#1c6fc9]">
          <svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3v3" />
            <path d="M12 18v3" />
            <path d="M4.2 4.2l2.1 2.1" />
            <path d="M17.7 17.7l2.1 2.1" />
            <path d="M3 12h3" />
            <path d="M18 12h3" />
            <path d="M4.2 19.8l2.1-2.1" />
            <path d="M17.7 6.3l2.1-2.1" />
          </svg>
        </span>

        <span className="font-serif-display text-white text-[1.2rem]">
          ansify
          <span className="italic text-white/70">.ai</span>
        </span>

        <span
          className="
          ml-1
          text-[0.65rem]
          font-semibold
          tracking-wide
          text-[#14559e]
          bg-white/80
          px-2 py-0.5
          rounded-full
        "
        >
          BETA
        </span>
      </div>

      {/* Links */}
      <ul className="nav-links hidden md:flex items-center gap-8 list-none m-0 p-0">
        <li>
          <a href="#" className="nav-link">
            How it works
          </a>
        </li>

        <li>
          <a href="#" className="nav-link">
            Showcases
          </a>
        </li>

        <li>
          <a href="#" className="nav-link">
            Pricing
          </a>
        </li>

        <li>
          <a href="#" className="nav-link">
            Login
          </a>
        </li>
      </ul>

      {/* Dashboard */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="
          bg-white
          text-[#123055]
          text-sm
          font-semibold
          px-5 py-2.5
          rounded-full
          shadow-sm
        "
      >
        Dashboard
      </motion.button>
    </motion.nav>
  );
}
