"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type LogoProps = {
  variant?: "light" | "dark";
  size?: number;
  showText?: boolean;
  href?: string;
};

/**
 * Shared Ansify logo. Uses /Ansify.png from public/ with a graceful
 * text fallback if the image is missing.
 */
export default function Logo({
  variant = "light",
  size = 32,
  showText = true,
  href = "/Ansify",
}: LogoProps) {
  const [imgOk, setImgOk] = useState(true);
  const textColor = variant === "light" ? "text-white" : "text-neutral-900";

  return (
    <Link href={href} className="flex items-center gap-2.5 shrink-0">
      {imgOk ? (
        <Image
          src="/Ansify.png"
          alt="Ansify AI logo"
          width={size}
          height={size}
          priority
          onError={() => setImgOk(false)}
          className="rounded-[9px] bg-white object-cover"
          style={{ width: size, height: size }}
        />
      ) : (
        <span
          className="logo-mark bg-white text-[#1c6fc9]"
          aria-hidden="true"
        >
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
      )}
      {showText && (
        <span className={`font-serif-display text-[1.2rem] ${textColor}`}>
          ansify<span className="italic opacity-70">.ai</span>
        </span>
      )}
    </Link>
  );
}
