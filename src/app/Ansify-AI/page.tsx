"use client";

import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  PanelLeft,
  Plus,
  ChevronDown,
  Bell,
  Menu,
  X,
  Globe,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { authClient } from "../../../lib/auth-client";
import Logo from "@/components/Logo";
import AskBox from "@/components/Askbox";
import { BrainIcon } from "@/components/Icons";

type Source = { title: string; url: string; content?: string; score?: number };
type ChatMsg = {
  id: string;
  role: "user" | "assistant";
  content: string;
  imagePreview?: string | null;
  sources?: Source[];
  followUps?: string[];
  thinking?: string[];
  error?: boolean;
};
type Session = { id: string; title: string; createdAt: number };

type ThinkStep = { key: string; label: string };

const THINK_STEPS: ThinkStep[] = [
  { key: "understand", label: "Understanding your question" },
  { key: "image", label: "Analyzing attached image" },
  { key: "search", label: "Searching the web for sources" },
  { key: "reason", label: "Reasoning with AI model" },
  { key: "format", label: "Formatting answer + follow-ups" },
];

const uid = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

function loadSessions(): Session[] {
  try {
    return JSON.parse(localStorage.getItem("ansify:sessions") ?? "[]");
  } catch {
    return [];
  }
}

/* ---------------------------------- page ---------------------------------- */

export default function AnsifyAIPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-white text-sm text-neutral-500">
          Loading Ansify AI…
        </div>
      }
    >
      <ChatShell />
    </Suspense>
  );
}

function ChatShell() {
  const searchParams = useSearchParams();
  const { data: session, isPending } = authClient.useSession();

  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [query, setQuery] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [doneSteps, setDoneSteps] = useState<string[]>([]);
  const [thinkingOpen, setThinkingOpen] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const autoSentRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* load sessions (client-side only) */
  useEffect(() => {
    setSessions(loadSessions());
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, activeStep]);

  const persistSessions = (next: Session[]) => {
    setSessions(next);
    try {
      localStorage.setItem("ansify:sessions", JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const ensureSession = useCallback(
    (title: string) => {
      if (activeSessionId) return activeSessionId;
      const s: Session = {
        id: uid(),
        title: title.slice(0, 48) || "New chat",
        createdAt: Date.now(),
      };
      persistSessions([s, ...loadSessions()]);
      setActiveSessionId(s.id);
      return s.id;
    },
    [activeSessionId]
  );

  /* ---- client-side thinking simulation: advances while request is live ---- */
  const startThinking = (hasImage: boolean) => {
    setActiveStep(0);
    setDoneSteps([]);
    setThinkingOpen(true);
    let i = 0;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      i += 1;
      // Skip the image step when there is no image
      if (!hasImage && THINK_STEPS[i]?.key === "image") i += 1;
      if (i >= THINK_STEPS.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        return;
      }
      setDoneSteps((d) => [...d, THINK_STEPS[i - 1]?.key].filter(Boolean));
      setActiveStep(i);
    }, 1400);
  };

  const stopThinking = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setDoneSteps(THINK_STEPS.map((s) => s.key));
    setActiveStep(THINK_STEPS.length);
  };

  useEffect(
    () => () => {
      if (timerRef.current) clearInterval(timerRef.current);
    },
    []
  );

  /* ------------------------------- send logic ------------------------------ */
  const send = useCallback(
    async (text: string, img: File | null, imgPreview: string | null) => {
      const q = text.trim();
      if ((!q && !img) || loading) return;
      setError(null);
      ensureSession(q || "Image question");

      const userMsg: ChatMsg = {
        id: uid(),
        role: "user",
        content: q || "(sent an image)",
        imagePreview: imgPreview,
      };
      setMessages((m) => [...m, userMsg]);
      setQuery("");
      setImageFile(null);
      setImagePreview(null);

      setLoading(true);
      startThinking(!!img);

      // Snapshot the thinking trail for this answer (client-side)
      const thinkingTrail = THINK_STEPS.filter(
        (s) => img || s.key !== "image"
      ).map((s) => s.label);

      try {
        const form = new FormData();
        form.append("Query", q || "Describe what you see in this image.");
        if (img) form.append("Image", img);

        const res = await fetch("/api/Ansify", {
          method: "POST",
          body: form,
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || "Request failed");

        stopThinking();
        const assistant: ChatMsg = {
          id: uid(),
          role: "assistant",
          content: data.answer || "No answer returned.",
          sources: data.sources ?? [],
          followUps: (data.followUps ?? []).slice(0, 4),
          thinking: thinkingTrail,
        };
        setMessages((m) => [...m, assistant]);
      } catch (e: any) {
        stopThinking();
        setError(e?.message || "Something went wrong.");
        setMessages((m) => [
          ...m,
          {
            id: uid(),
            role: "assistant",
            content:
              e?.message ||
              "Something went wrong. Please check your connection and try again.",
            thinking: thinkingTrail,
            error: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading, ensureSession]
  );

  const handleAskBoxSubmit = (text: string, img: File | null) =>
    send(text, img, img ? imagePreview : null);

  const handleImageSelect = (f: File | null, p: string | null) => {
    setImageFile(f);
    setImagePreview(p);
  };

  /* -------- landing handoff: ?q= + sessionStorage pending image (client) ------- */
  useEffect(() => {
    if (autoSentRef.current) return;
    const qParam = searchParams.get("q") ?? "";
    let pendingQ = "";
    let pendingImg: string | null = null;
    try {
      pendingQ = sessionStorage.getItem("ansify:pendingQuery") ?? "";
      pendingImg = sessionStorage.getItem("ansify:pendingImage");
    } catch {
      /* ignore */
    }
    const initial = (qParam || pendingQ).trim();
    if (!initial && !pendingImg) return;
    autoSentRef.current = true;

    const submitPending = async () => {
      let file: File | null = null;
      if (pendingImg) {
        try {
          const res = await fetch(pendingImg);
          const blob = await res.blob();
          file = new File([blob], "upload.png", {
            type: blob.type || "image/png",
          });
        } catch {
          file = null;
        }
      }
      try {
        sessionStorage.removeItem("ansify:pendingQuery");
        sessionStorage.removeItem("ansify:pendingImage");
        sessionStorage.removeItem("ansify:pendingImageName");
      } catch {
        /* ignore */
      }
      if (file) {
        const url = URL.createObjectURL(file);
        setImagePreview(url);
      }
      send(initial, file, file ? pendingImg : null);
    };
    submitPending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newChat = () => {
    setMessages([]);
    setQuery("");
    setImageFile(null);
    setImagePreview(null);
    setError(null);
    setActiveSessionId(null);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen w-full bg-[#f9f9f9] text-neutral-800 font-sans overflow-hidden">
      <Sidebar
        user={session?.user}
        loading={isPending}
        sessions={sessions}
        activeId={activeSessionId}
        onNew={newChat}
        onSelect={(id) => {
          setActiveSessionId(id);
          setSidebarOpen(false);
        }}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-white min-w-0">
        {/* Top bar with working logo */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-lg hover:bg-neutral-100"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={18} />
            </button>
            <Logo variant="dark" size={28} href="/Ansify" />
          </div>
          <div className="flex items-center gap-2 text-neutral-500 text-xs">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Model online
            </span>
          </div>
        </header>

        {/* Messages / empty state */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 pb-6">
          {messages.length === 0 && !loading ? (
            <EmptyState
              query={query}
              setQuery={setQuery}
              loading={loading}
              onSubmit={handleAskBoxSubmit}
              imageFile={imageFile}
              imagePreview={imagePreview}
              onImageSelect={handleImageSelect}
            />
          ) : (
            <div className="w-full max-w-2xl mx-auto pt-6 space-y-6">
              {messages.map((m) =>
                m.role === "user" ? (
                  <UserBubble key={m.id} msg={m} />
                ) : (
                  <AssistantBubble
                    key={m.id}
                    msg={m}
                    onFollowUp={(q) => send(q, null, null)}
                  />
                )
              )}

              {/* Thinking process (client-side, live) */}
              {loading && (
                <ThinkingPanel
                  activeStep={activeStep}
                  doneSteps={doneSteps}
                  open={thinkingOpen}
                  onToggle={() => setThinkingOpen((v) => !v)}
                  hasImage={!!imageFile}
                />
              )}

              {error && !loading && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                  {error}
                </p>
              )}
              <div ref={bottomRef} />

              {/* Composer when conversation started */}
              <div className="pt-2">
                <AskBox
                  value={query}
                  onChange={setQuery}
                  onSubmit={handleAskBoxSubmit}
                  loading={loading}
                  imageFile={imageFile}
                  imagePreview={imagePreview}
                  onImageSelect={handleImageSelect}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

/* --------------------------------- sidebar -------------------------------- */

function Sidebar({
  user,
  loading,
  sessions,
  activeId,
  onNew,
  onSelect,
  open,
  onClose,
}: {
  user?: { name?: string | null; email?: string | null; image?: string | null } | null;
  loading: boolean;
  sessions: Session[];
  activeId: string | null;
  onNew: () => void;
  onSelect: (id: string) => void;
  open: boolean;
  onClose: () => void;
}) {
  const body = (
    <div className="w-[260px] h-full flex-shrink-0 border-r border-neutral-200 bg-[#f4f4f4] flex-col flex">
      <div className="flex items-center justify-between p-4">
        <Logo variant="dark" size={26} href="/Ansify" />
        <div className="flex items-center gap-3 text-neutral-500">
          <button className="hover:text-neutral-800 transition-colors" aria-label="Search sessions">
            <Search size={16} />
          </button>
          <button
            className="hover:text-neutral-800 transition-colors md:hidden"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
          <button
            className="hover:text-neutral-800 transition-colors hidden md:block"
            aria-label="Collapse"
          >
            <PanelLeft size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-6">
        <button
          onClick={onNew}
          className="w-full flex items-center gap-3 px-2 py-2 text-sm text-neutral-600 hover:bg-neutral-200 rounded-lg transition-colors font-medium"
        >
          <Plus size={16} />
          <span>New chat</span>
        </button>

        <div>
          <button className="w-full flex items-center justify-between px-2 py-1.5 text-xs text-neutral-500 font-medium hover:text-neutral-800 group transition-colors">
            <span>Sessions · {sessions.length}</span>
            <ChevronDown
              size={14}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </button>
          <div className="mt-1 space-y-0.5">
            {sessions.length === 0 && (
              <p className="px-2 py-1.5 text-xs text-neutral-400">
                No chats yet — ask something to start.
              </p>
            )}
            {sessions.map((s) => (
              <button
                key={s.id}
                onClick={() => onSelect(s.id)}
                className={`w-full text-left px-2 py-1.5 text-[13px] rounded-lg truncate transition-colors ${
                  s.id === activeId
                    ? "bg-neutral-800 text-white font-medium"
                    : "text-neutral-600 hover:bg-neutral-200"
                }`}
                title={s.title}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 mt-auto border-t border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            {user?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-[11px] font-semibold text-white uppercase shrink-0">
                {user?.name
                  ? user.name.charAt(0)
                  : user?.email
                    ? user.email.charAt(0)
                    : "G"}
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="text-[12px] font-semibold text-neutral-800 leading-tight truncate">
                {user?.name || (loading ? "Loading..." : "Guest")}
              </span>
              <span className="text-[11px] font-medium text-neutral-500 leading-tight truncate">
                {user?.email || (loading ? "" : "Not signed in")}
              </span>
            </div>
          </div>
          <button className="text-neutral-400 hover:text-neutral-800 transition-colors" aria-label="Notifications">
            <Bell size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* desktop */}
      <aside className="hidden md:flex h-full">{body}</aside>
      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/30 z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "tween", duration: 0.22 }}
              className="fixed left-0 top-0 bottom-0 z-50 md:hidden"
            >
              {body}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* -------------------------------- empty state ------------------------------ */

function EmptyState(props: {
  query: string;
  setQuery: (v: string) => void;
  loading: boolean;
  onSubmit: (text: string, img: File | null) => void;
  imageFile: File | null;
  imagePreview: string | null;
  onImageSelect: (f: File | null, p: string | null) => void;
}) {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-[34px] leading-[1.05] font-normal text-neutral-900 pb-8">
        What do you want to know?
      </h1>
      <div className="w-full flex justify-center">
        <AskBox
          value={props.query}
          onChange={props.setQuery}
          onSubmit={props.onSubmit}
          loading={props.loading}
          imageFile={props.imageFile}
          imagePreview={props.imagePreview}
          onImageSelect={props.onImageSelect}
        />
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {[
          "Explain quantum computing simply",
          "Analyze an image for me",
          "Latest in AI this week",
        ].map((s) => (
          <button
            key={s}
            onClick={() => props.onSubmit(s, null)}
            className="text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-full px-3.5 py-1.5 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------- chat bubbles ------------------------------ */

function UserBubble({ msg }: { msg: ChatMsg }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-end"
    >
      <div className="max-w-[85%] rounded-2xl rounded-br-md bg-neutral-900 text-white px-4 py-3">
        {msg.imagePreview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={msg.imagePreview}
            alt="User upload"
            className="mb-2 max-h-48 rounded-xl object-cover"
          />
        )}
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
      </div>
    </motion.div>
  );
}

function AssistantBubble({
  msg,
  onFollowUp,
}: {
  msg: ChatMsg;
  onFollowUp: (q: string) => void;
}) {
  const [showThinking, setShowThinking] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl rounded-bl-md border px-4 py-3 max-w-[95%] ${
        msg.error
          ? "bg-red-50/60 border-red-100"
          : "bg-neutral-50 border-neutral-200"
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
          <Sparkles size={12} /> Ansify AI
        </span>
        {msg.thinking && msg.thinking.length > 0 && (
          <button
            onClick={() => setShowThinking((v) => !v)}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-800"
          >
            <BrainIcon size={12} />
            {showThinking ? "Hide thinking" : "Show thinking"}
            <ChevronRight
              size={12}
              className={`transition-transform ${showThinking ? "rotate-90" : ""}`}
            />
          </button>
        )}
      </div>

      {showThinking && msg.thinking && (
        <ul className="mb-2 rounded-xl bg-white border border-neutral-200 px-3 py-2 space-y-1">
          {msg.thinking.map((t, i) => (
            <li key={i} className="text-[11px] text-neutral-500 flex gap-2">
              <span className="text-emerald-600">✓</span> {t}
            </li>
          ))}
        </ul>
      )}

      <p className="text-sm leading-relaxed whitespace-pre-wrap text-neutral-800">
        {msg.content}
      </p>

      {msg.sources && msg.sources.length > 0 && (
        <div className="mt-3 pt-3 border-t border-neutral-200">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400 mb-2 flex items-center gap-1">
            <Globe size={11} /> Sources
          </p>
          <div className="space-y-1.5">
            {msg.sources.slice(0, 5).map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="block text-xs text-neutral-600 hover:text-neutral-900 truncate underline-offset-2 hover:underline"
              >
                {i + 1}. {s.title || s.url}
              </a>
            ))}
          </div>
        </div>
      )}

      {msg.followUps && msg.followUps.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {msg.followUps.map((f, i) => (
            <button
              key={i}
              onClick={() => onFollowUp(f)}
              className="text-xs text-neutral-700 bg-white border border-neutral-200 hover:border-neutral-400 rounded-full px-3 py-1.5 transition-colors text-left"
            >
              {f}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ------------------------------ thinking panel ----------------------------- */

function ThinkingPanel({
  activeStep,
  doneSteps,
  open,
  onToggle,
  hasImage,
}: {
  activeStep: number;
  doneSteps: string[];
  open: boolean;
  onToggle: () => void;
  hasImage: boolean;
}) {
  const steps = THINK_STEPS.filter((s) => hasImage || s.key !== "image");
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-[#123055]/15 bg-[#f4f8fd] px-4 py-3"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#123055]">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#123055]/20 border-t-[#123055]" />
          Thinking…
        </span>
        <ChevronDown
          size={15}
          className={`text-[#123055]/60 transition-transform ${open ? "" : "-rotate-90"}`}
        />
      </button>
      {open && (
        <ul className="mt-2.5 space-y-1.5">
          {steps.map((s, i) => {
            const done = doneSteps.includes(s.key);
            const active = i === activeStep;
            return (
              <li
                key={s.key}
                className={`flex items-center gap-2 text-xs ${
                  done
                    ? "text-emerald-700"
                    : active
                      ? "text-[#123055] font-semibold"
                      : "text-neutral-400"
                }`}
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${
                    done
                      ? "bg-emerald-100 text-emerald-700"
                      : active
                        ? "bg-[#123055] text-white animate-pulse"
                        : "bg-neutral-200 text-neutral-400"
                  }`}
                >
                  {done ? "✓" : i + 1}
                </span>
                {s.label}
                {active && !done && (
                  <span className="ml-1 inline-flex gap-0.5">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1 w-1 rounded-full bg-[#123055]/60 animate-bounce"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </motion.div>
  );
}
