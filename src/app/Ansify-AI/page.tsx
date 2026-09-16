import React from "react";
import {
  Search,
  PanelLeft,
  Plus,
  Monitor,
  Library,
  ChevronDown,
  User,
  Bell,
  Mic,
  ArrowRight,
  Menu,
} from "lucide-react";
import AskBox from "@/components/Askbox";

export default function AnsifyAIPage() {
  return (
    <div className="flex h-screen w-full bg-[#f9f9f9] text-neutral-800 font-sans">
      <Sidebar />
      <MainContent />
    </div>
  );
}

function Sidebar() {
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
          <button className="w-full flex items-center gap-3 px-2 py-2 text-sm text-neutral-600 hover:bg-neutral-200 rounded-lg transition-colors font-medium">
            <Monitor size={16} />
            <span>Computer</span>
          </button>
          <button className="w-full flex items-center gap-3 px-2 py-2 text-sm text-neutral-600 hover:bg-neutral-200 rounded-lg transition-colors font-medium">
            <Library size={16} />
            <span>Artifacts</span>
          </button>
        </div>

        {/* Projects */}
        <div>
          <button className="w-full flex items-center justify-between px-2 py-1.5 text-xs text-neutral-500 font-medium hover:text-neutral-800 group transition-colors">
            <span>Projects</span>
            <ChevronDown
              size={14}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </button>
          <div className="mt-1 px-2">
            <div className="bg-white border border-neutral-200 rounded-lg p-3 shadow-sm">
              <h4 className="text-xs font-semibold text-neutral-800 mb-1">
                Organize and share your work
              </h4>
              <p className="text-[10px] text-neutral-500 mb-3 leading-tight">
                Keep files, memory, and context together across sessions.
              </p>
              <button className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs py-1.5 rounded-md transition-colors font-medium border border-neutral-200">
                Create project
              </button>
            </div>
          </div>
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
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-[11px] font-semibold text-white">
              S
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-semibold text-neutral-800 leading-tight">
                samrathore51623
              </span>
              <span className="text-[11px] font-medium text-neutral-500 leading-tight">
                Free plan
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

function MainContent() {
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
            <AskBox />
          </div>
        </div>
      </div>
    </main>
  );
}
