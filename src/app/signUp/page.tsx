import { CreateAccountButton } from "@/components/button";
import Footer from "@/components/Footer";

export default function SignUp() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center justify-between px-8 py-6">
        <span className="font-serif text-xl text-neutral-900">Ansify</span>
        <a href="#" className="text-sm text-neutral-800 hover:text-neutral-950">
          Sign in
        </a>
      </header>

      <main className="flex-1 flex items-start justify-center pt-24">
        <div className="w-full max-w-[380px] px-4">
          <h1 className="text-4xl font-normal text-neutral-900 mb-8">Create your account</h1>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-neutral-200 rounded-lg py-3 text-sm text-neutral-800 hover:bg-neutral-50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.13-.85 2.09-1.8 2.73v2.27h2.92c1.71-1.57 2.68-3.88 2.68-6.64z" />
              <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.17l-2.92-2.27c-.81.54-1.85.86-3.04.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.34C2.44 15.98 5.48 18 9 18z" />
              <path fill="#FBBC05" d="M3.97 10.71A5.4 5.4 0 013.68 9c0-.59.1-1.17.29-1.71V4.95H.96A9 9 0 000 9c0 1.45.35 2.83.96 4.05l3.01-2.34z" />
              <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.59-2.59C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.95l3.01 2.34C4.68 5.16 6.66 3.58 9 3.58z" />
            </svg>
            Sign up with Google
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-neutral-200 rounded-lg py-3 text-sm text-neutral-800 hover:bg-neutral-50 transition-colors mt-3"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Sign up with X
          </button>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="text-sm text-neutral-400">or</span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          <input
            type="text"
            placeholder="Username"
            className="w-full border border-neutral-200 rounded-lg py-3 px-4 text-sm text-neutral-900 placeholder:text-neutral-400 mb-3 focus:outline-none focus:border-neutral-400"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-neutral-200 rounded-lg py-3 px-4 text-sm text-neutral-900 placeholder:text-neutral-400 mb-3 focus:outline-none focus:border-neutral-400"
          />

          <div className="relative mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-neutral-200 rounded-lg py-3 px-4 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>

          <p className="text-sm text-neutral-500 mb-6">
            By signing up you agree to our{" "}
            <a href="#" className="text-neutral-900 font-medium hover:underline">
              Terms of Service
            </a>  
            .
          </p>

          <CreateAccountButton />

          <p className="text-center text-sm text-neutral-500 mt-6">
            Already have an account?{" "}
            <a href="#" className="text-neutral-900 font-medium hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </main>

      <Footer />  
    </div>
  );
}