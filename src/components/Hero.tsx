"use client";

import { motion } from "framer-motion";
import AskBox from "./Askbox";

export default function Hero() {
  return (
    <section
      className="
        relative z-[5]
        max-w-2xl
        mx-auto
        px-6
        pt-[16vh]
        text-center
      "
    >
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: 0.25,
          ease: "easeOut",
        }}
        className="
          font-serif-display
          text-white
          text-[clamp(2.8rem,6.4vw,4.9rem)]
          leading-[1.05]
          tracking-[-0.01em]
          mb-5
        "
      >
        Ansify AI
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.42,
          ease: "easeOut",
        }}
        className="
          text-white/90
          text-[1.05rem]
          leading-relaxed
          max-w-md
          mx-auto
          mb-10
        "
      >
        Ask what's on your mind, and we'll find the answer. From question to
        clarity in seconds.
      </motion.p>

      {/* Ask Box */}
      <AskBox />
    </section>
  );
}
