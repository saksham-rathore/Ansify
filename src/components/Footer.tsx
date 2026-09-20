import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between px-8 py-6 text-sm">
      <span className="text-[12.5px] text-neutral-500">
        © 2026 Ansify AI
      </span>
      <div className="flex items-center gap-5">
        <Link
          href="/Ansify#privacy"
          className="text-[12.5px] text-neutral-500 underline-offset-2 transition-opacity hover:underline"
        >
          Privacy
        </Link>
        <Link
          href="/Ansify#terms"
          className="text-[12.5px] text-neutral-500 underline-offset-2 transition-opacity hover:underline"
        >
          Terms
        </Link>
      </div>
    </footer>
  );
}
