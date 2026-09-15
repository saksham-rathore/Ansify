export default function BotInterface() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 font-sans bg-white">
      <div className="w-full max-w-2xl text-center">
        <h1 className="mb-8 text-4xl font-medium tracking-tight text-white md:text-5xl">
          <span className="bg-clip-text text-white">
            Ask
          </span>{' '}
          anything you want
        </h1>

        <div className="flex flex-col rounded-xl bg-[#f2f6fa] p-2 shadow-2xl shadow-blue-900/20">
          <textarea
            placeholder="Ask anything..."
            className="h-28 w-full resize-none bg-transparent p-4 text-lg text-slate-700 placeholder-slate-400 outline-none"
            readOnly
          />

          <div className="flex items-center justify-between px-2 pb-2">
            <button className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-200/50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="14" x="2" y="3" rx="2" />
                <line x1="8" x2="16" y1="21" y2="21" />
                <line x1="12" x2="12" y1="17" y2="21" />
              </svg>
              Image
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-0.5 opacity-70"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <button className="flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-blue-400 text-blue-500 transition-colors hover:bg-blue-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m5 12 7-7 7 7" />
                <path d="M12 19V5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
