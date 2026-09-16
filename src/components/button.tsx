import { ArrowRight } from "lucide-react";

export function CreateAccountButton() {
  return (
    <button
      type="submit"
      className="group w-full flex items-center justify-center gap-2 py-3
                 rounded-lg text-white font-semibold text-[15px]
                 bg-[#424245] hover:bg-[#333336]
                 active:scale-[0.98]
                 transition-all duration-200 ease-out"
    >
      Create account
      <ArrowRight
        size={18}
        className="transition-transform duration-300 ease-out group-hover:translate-x-1"
      />
    </button>
  );
}

export function SignInButton() {
  return (
    <button
      type="submit"
      className="group w-full flex items-center justify-center gap-2 py-3
                 rounded-lg text-white font-semibold text-[15px]
                 bg-[#424245] hover:bg-[#333336]
                 active:scale-[0.98]
                 transition-all duration-200 ease-out"
    >
      Sign in
      <ArrowRight
        size={18}
        className="transition-transform duration-300 ease-out group-hover:translate-x-1"
      />
    </button>
  );
}
