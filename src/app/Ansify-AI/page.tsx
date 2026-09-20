"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Search,
  PanelLeft,
  Plus,
  Monitor,
  Library,
  ChevronDown,
  Bell,
  Mic,
  ArrowRight,
  Menu, 
  LogIn,
} from "lucide-react";
import { authClient } from "../../../lib/auth-client";

type chatInputProps = {
  conversationId?: string | null;
  onMessageSent?: (message: {
    role: "user" | "assistant";
    content: string;
  }) => void;
  onConversationCreated?: (id: string) => void;
};

type UserType = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export default function AnsifyAIPage({
  conversationId,
  onMessageSent,
  onConversationCreated,
}: chatInputProps) {
  const [Query, setQuery] = useState("");

  const [Loading, setLoading] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const sendRef = useRef<HTMLInputElement>(null);

  const [Sessions, setSessions] = useState([])

  const handleSubmit = async () => {
    if (!Query.trim() || Loading) return;

    const userQuery = Query.trim();

    setQuery("");
    setLoading(true);

    try {
      let currentConversationId = conversationId;

      if (!currentConversationId) {
        const conversationResponse = await fetch("/api/Ansify", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            title: userQuery,
          }),
        });
        if (!conversationResponse.ok) {
          throw new Error("Failed to create conversation");
        }

        const conversation = await conversationResponse.json();

        if (conversation?.id) {
          currentConversationId = conversation.id;
          onConversationCreated?.(conversation.id);
        }
      }

      onMessageSent?.({
        role: "user",
        content: userQuery,
      });

      const formData = new FormData();

      formData.append("Query", userQuery);
      if (currentConversationId) {
        formData.append("conversationId", currentConversationId);
      }

      const response = await fetch("/api/ask", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();

      onMessageSent?.({
        role: "assistant",
        content: data.answer,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#f9f9f9] text-neutral-800 font-sans">
      <Sidebar user={session?.user} loading={isPending} />
      <MainContent
        query={Query}
        setQuery={setQuery}
        loading={Loading}
        onSubmit={handleSubmit}
        sendRef={sendRef}
      />
    </div>
  );
}

function Sidebar({
  user,
  loading,
}: {
  user?: UserType | null;
  loading: boolean;
}) {
  return (
    <aside className="w-[260px] flex-shrink-0 border-r border-neutral-200 bg-[#f4f4f4] flex-col hidden md:flex">
      {/* Top Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          {/* Logo Placeholder */}
          <a
            className="font-lastik text-[22px] leading-none tracking-[-0.02em] snip-4f4f-0 px-1"
            style={{
              color: "rgb(8, 8, 8)",
              outlineOffset: "2px",
              background:
                "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box",
              fontSize: "22px",
              fontWeight: 400,
              fontFamily:
                '"Lastik Regular", Caslon, "EB Garamond", "Times New Roman", Times, serif',
              lineHeight: "22px",
              letterSpacing: "-0.44px",
              textAlign: "start",
              border: "0px solid rgb(8, 8, 8)",
              borderTop: "0px solid rgb(8, 8, 8)",
              borderRight: "0px solid rgb(8, 8, 8)",
              borderBottom: "0px solid rgb(8, 8, 8)",
              borderLeft: "0px solid rgb(8, 8, 8)",
              borderColor: "rgb(8, 8, 8)",
              opacity: 1,
              zIndex: "auto",
            }}
            href=""
          >
            Ansify
          </a>
        </div>
        <div className="flex items-center gap-3 text-neutral-500">
          <button className="hover:text-neutral-800 transition-colors">
            <Search size={16} />
          </button>
          <button className="hover:text-neutral-800 transition-colors">
            <PanelLeft size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-6 scrollbar-hide">
        {/* Main Nav */}
        <div className="space-y-0.5">
          <button className="w-full flex items-center gap-3 px-2 py-2 text-sm text-neutral-600 hover:bg-neutral-200 rounded-lg transition-colors font-medium">
            <Plus size={16} />
            <span>New</span>
          </button>
        </div>

        {/* Sessions */}
        <div>
          <button className="w-full flex items-center justify-between px-2 py-1.5 text-xs text-neutral-500 font-medium hover:text-neutral-800 group transition-colors">
            <span>Sessions</span>
            <ChevronDown
              size={14}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </button>
          <div className="mt-1 space-y-0.5"></div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 mt-auto border-t border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-[11px] font-semibold text-white uppercase">
              {user?.name
                ? user.name.charAt(0)
                : user?.email
                  ? user.email.charAt(0)
                  : "G"}
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-semibold text-neutral-800 leading-tight">
                {user?.name || (loading ? "Loading..." : "Guest")}
              </span>
              <span className="text-[11px] font-medium text-neutral-500 leading-tight">
                {user?.email || (loading ? "" : "Not signed in")}
              </span>
            </div>
          </div>
          <button className="text-neutral-400 hover:text-neutral-800 transition-colors">
            <Bell size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}

function MainContent({
  query,
  setQuery,
  loading,
  onSubmit,
  sendRef,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  onSubmit: () => void;
  sendRef?: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden bg-white">
      {/* Top Bar */}
      <header className="flex items-center justify-between p-4">
        <div>{/* Upgrade section removed */}</div>
        <div className="flex items-center gap-3 text-neutral-500">
          <button className="hidden md:flex hover:text-neutral-800 p-1.5 rounded-md hover:bg-neutral-100 border border-transparent transition-colors items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
              <line x1="15" y1="3" x2="15" y2="21" />
            </svg>
          </button>
          <button className="md:hidden hover:text-neutral-800 p-1.5 rounded-md hover:bg-neutral-100 border border-transparent transition-colors">
            <Menu size={16} />
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center px-20 pb-10">
        <div className="w-full max-w-2xl flex flex-col items-center justify-center min-h-[50vh]">
          <div className="w-full mb-6 flex justify-center">
            <div className="h-10">
              <h1
                className="text-center text-[24px] leading-[1.05] snip-05c5-0 pb-8"
                style={{
                  color: "rgb(8, 8, 8)",
                  outlineOffset: "2px",
                  background:
                    "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box",
                  fontSize: "34px",
                  fontWeight: 400,
                  fontFamily:
                    '"Instrument Sans", "Instrument Sans Fallback", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  lineHeight: "35.7px",
                  letterSpacing: "normal",
                  textAlign: "center",
                  border: "0px solid rgb(8, 8, 8)",
                  borderTop: "0px solid rgb(8, 8, 8)",
                  borderRight: "0px solid rgb(8, 8, 8)",
                  borderBottom: "0px solid rgb(8, 8, 8)",
                  borderLeft: "0px solid rgb(8, 8, 8)",
                  borderColor: "rgb(8, 8, 8)",
                  opacity: 1,
                  zIndex: "auto",
                }}
              >
                What do you want to know?
              </h1>
            </div>
          </div>

          {/* Search Box */}
          <div className="w-full flex justify-center">
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
              className="ask-wrap w-full max-w-xl mx-auto"
            >
              {/* Animated gradient border */}

              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25 }}
                className="
          ask
          relative
          bg-white/95
          backdrop-blur-xl
          border border-white/70
          rounded-[15px]
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
                  ref={sendRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      onSubmit();
                    }
                  }}
                  disabled={loading}
                  placeholder={loading ? "Searching..." : "Ask anything…"}
                  className="
            font-serif-display
            w-full
            border-0
            bg-transparent
            text-[1.15rem]
            text-[#123055]
            outline-none
            disabled:opacity-50
          "
                />

                {/* Bottom controls */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    {/* General */}
                    <button className="quick-chip" type="button">
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
                  </div>

                  {/* Send */}
                  <motion.button
                    id="sendBtn"
                    type="button"
                    onClick={onSubmit}
                    disabled={loading || !query.trim()}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      scale: loading ? 1 : [1, 1.06, 1],
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
              disabled:opacity-50
              disabled:cursor-not-allowed
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
          </div>
        </div>
      </div>
    </main>
  );
}
