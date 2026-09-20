"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ImagePlusIcon } from "./Icons";

type AskBoxProps = {
  /** Controlled text value. If omitted, AskBox manages its own state (landing mode). */
  value?: string;
  onChange?: (v: string) => void;
  /** Called with (text, imageFile). If omitted in landing mode, navigates to /Ansify-AI. */
  onSubmit?: (text: string, image: File | null) => void;
  loading?: boolean;
  /** Controlled image. If omitted, managed internally. */
  imageFile?: File | null;
  imagePreview?: string | null;
  onImageSelect?: (file: File | null, preview: string | null) => void;
  compact?: boolean;
};

const ACCEPT = "image/jpeg,image/png,image/webp";
const MAX_SIZE = 5 * 1024 * 1024;

export default function AskBox(props: AskBoxProps) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  // Uncontrolled (landing) state
  const [innerText, setInnerText] = useState("");
  const [innerFile, setInnerFile] = useState<File | null>(null);
  const [innerPreview, setInnerPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const text = props.value ?? innerText;
  const setText = props.onChange ?? setInnerText;
  const file = props.imageFile !== undefined ? props.imageFile : innerFile;
  const preview =
    props.imagePreview !== undefined ? props.imagePreview : innerPreview;

  const setImage = (f: File | null, p: string | null) => {
    if (props.onImageSelect) props.onImageSelect(f, p);
    else {
      setInnerFile(f);
      setInnerPreview(p);
    }
  };

  const pickImage = (f: File | null) => {
    setError(null);
    if (!f) {
      setImage(null, null);
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(f.type)) {
      setError("Only JPG, PNG or WebP images are supported.");
      return;
    }
    if (f.size > MAX_SIZE) {
      setError("Image must be under 5MB.");
      return;
    }
    // Client-side preview — no upload yet
    const url = URL.createObjectURL(f);
    setImage(f, url);
  };

  const handleSubmit = () => {
    const t = text.trim();
    if (!t && !file) return;
    if (props.loading) return;

    if (props.onSubmit) {
      props.onSubmit(t, file);
      return;
    }

    // Landing mode: stash pending prompt client-side, then go to chat.
    try {
      sessionStorage.setItem("ansify:pendingQuery", t);
      // Note: File objects can't go in sessionStorage. The chat page lets
      // the user re-attach, but if the image is small we persist a dataURL.
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            sessionStorage.setItem(
              "ansify:pendingImage",
              String(reader.result ?? "")
            );
            sessionStorage.setItem("ansify:pendingImageName", file.name);
          } catch {
            /* quota exceeded — ignore, user can re-attach */
          } finally {
            router.push(
              `/Ansify-AI?q=${encodeURIComponent(t)}${file ? "&hasImage=1" : ""}`
            );
          }
        };
        reader.readAsDataURL(file);
        return;
      }
    } catch {
      /* sessionStorage unavailable */
    }
    router.push(`/Ansify-AI?q=${encodeURIComponent(t)}`);
  };

  const loading = !!props.loading;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
      className="ask-wrap w-full max-w-xl mx-auto"
    >
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.25 }}
        className="ask relative bg-white/95 backdrop-blur-xl border border-white/70 rounded-[15px] px-6 pt-5 pb-4 text-left shadow-[0_24px_55px_rgba(8,40,80,0.24)]"
      >
        {/* Image preview (client-side only) */}
        {preview && (
          <div className="mb-3 flex items-start gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Upload preview"
              className="h-16 w-16 rounded-xl object-cover border border-[#123055]/15"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-[#123055]">
                {file?.name ?? "Attached image"}
              </p>
              <p className="text-[11px] text-[#123055]/60">
                {file ? `${(file.size / 1024).toFixed(0)} KB` : ""} · will be
                sent with your question
              </p>
              <button
                type="button"
                onClick={() => {
                  setImage(null, null);
                  if (fileRef.current) fileRef.current.value = "";
                }}
                className="mt-1 text-[11px] font-semibold text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        {/* Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          disabled={loading}
          placeholder={loading ? "Thinking…" : "Ask anything…"}
          aria-label="Ask Ansify"
          className="font-serif-display w-full border-0 bg-transparent text-[1.15rem] text-[#123055] outline-none disabled:opacity-50"
        />

        {error && (
          <p className="mt-2 text-xs font-medium text-red-600">{error}</p>
        )}

        {/* Bottom controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <input
              ref={fileRef}
              type="file"
              accept={ACCEPT}
              className="hidden"
              onChange={(e) => pickImage(e.target.files?.[0] ?? null)}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="quick-chip"
              title="Upload an image with your question"
            >
              <ImagePlusIcon />
              {file ? "Change image" : "Image"}
            </button>
            <button
              type="button"
              className="quick-chip hidden sm:flex"
              onClick={() => setText(text ? "" : "Explain this image: ")}
              title="Voice coming soon"
            >
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
            type="button"
            onClick={handleSubmit}
            disabled={loading || (!text.trim() && !file)}
            whileTap={{ scale: 0.9 }}
            animate={{ scale: loading ? 1 : [1, 1.06, 1] }}
            transition={{
              duration: 1.8,
              delay: 1.4,
              repeat: loading ? 0 : Infinity,
              repeatDelay: 1.6,
              ease: "easeInOut",
            }}
            aria-label="Ask"
            className="w-10 h-10 rounded-full bg-[#123055] text-white flex items-center justify-center shadow-[0_6px_16px_rgba(28,111,201,0.4)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            ) : (
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
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
