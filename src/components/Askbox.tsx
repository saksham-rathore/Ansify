"use client";

import { motion } from "framer-motion";

export default function AskBox() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 16,
        scale: 0.97,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.6,
        delay: 0.55,
        ease: "easeOut",
      }}
      className="ask-wrap max-w-xl mx-auto"
    >
      {/* Animated gradient border */}
      <div className="ask-glow" />

      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.25 }}
        className="
          ask
          relative
          bg-white/95
          backdrop-blur-xl
          border border-white/70
          rounded-[26px]
          px-6
          pt-5
          pb-4
          text-left
          shadow-[0_24px_55px_rgba(8,40,80,0.24)]
        "
      >
        {/* Input */}
        <input
          type="text"
          placeholder="Ask anything…"
          className="
            font-serif-display
            w-full
            border-0
            bg-transparent
            text-[1.15rem]
            text-[#123055]
            outline-none
          "
        />

        {/* Bottom controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            {/* General */}
            <button className="quick-chip">
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>

              General
            </button>

            {/* Voice */}
            <button className="quick-chip hidden sm:flex">
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M12 1a4 4 0 0 0-4 4v6a4 4 0 0 0 8 0V5a4 4 0 0 0-4-4z" />
                <path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4" />
              </svg>

              Voice
            </button>
          </div>

          {/* Send */}
          <motion.button
            id="sendBtn"
            whileTap={{ scale: 0.9 }}
            animate={{
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 1.8,
              delay: 1.4,
              repeat: Infinity,
              repeatDelay: 1.6,
              ease: "easeInOut",
            }}
            aria-label="Ask"
            className="
              w-10
              h-10
              rounded-full
              bg-[#123055]
              text-white
              flex
              items-center
              justify-center
              shadow-[0_6px_16px_rgba(28,111,201,0.4)]
            "
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5" />
              <path d="M5 12l7-7 7 7" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}