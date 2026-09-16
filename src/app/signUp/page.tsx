import { CreateAccountButton } from "@/components/button";
import Footer from "@/components/Footer";

export default function SignUp() {
  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-8 py-6">
          <span className="font-playfair tracking-tight text-2xl text-neutral-900 font-semibold">Ansify</span>
          <a href="#" className="text-sm text-neutral-800 hover:text-neutral-950">
            Sign in
          </a>
        </header>

        <main className="flex-1 flex items-start justify-center pt-24">
          <div className="w-full max-w-[420px] px-4">
            <h1 className="text-[2rem] leading-tight font-normal text-neutral-900 mb-8">Create your account</h1>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-neutral-200 rounded-xl py-3.5 text-base text-neutral-800 hover:bg-neutral-50 transition-colors"
            >
              <img src="/google.svg" alt="google" height={18} width={18}/>
              Sign up with Google
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-neutral-200 rounded-xl py-3.5 text-base text-neutral-800 hover:bg-neutral-50 transition-colors mt-3"
            >
               <img src="/x.svg" alt="google" height={15} width={15}/>
              Sign up with X
            </button>

            <div className="flex items-center gap-3 my-7">
              <div className="flex-1 h-px bg-neutral-200" />
              <span className="text-[15px] text-neutral-400">or</span>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>

            <input
              type="text"
              placeholder="Username"
              className="w-full border border-neutral-200 rounded-xl py-3.5 px-4 text-base text-neutral-900 placeholder:text-neutral-400 mb-4 focus:outline-none focus:border-neutral-400"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border border-neutral-200 rounded-xl py-3.5 px-4 text-base text-neutral-900 placeholder:text-neutral-400 mb-4 focus:outline-none focus:border-neutral-400"
            />

            <div className="relative mb-5">
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-neutral-200 rounded-xl py-3.5 px-4 pr-10 text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>

            <p className="text-[15px] text-neutral-500 mb-8">
              By signing up you agree to our{" "}
              <a href="#" className="text-neutral-900 font-medium hover:underline">
                Terms of Service
              </a>  
              .
            </p>

            <CreateAccountButton />

            <p className="text-center text-[15px] text-neutral-500 mt-8">
              Already have an account?{" "}
              <a href="#" className="text-neutral-900 font-medium hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </main>

        <Footer />  
      </div>

      <div className="hidden lg:block w-[60%] p-4 lg:p-4">
        <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-neutral-100">
          <img 
            src="/signup.png" 
            alt="Sign up background" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}