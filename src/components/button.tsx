import { ArrowRight } from "lucide-react";

export function SignInButton() {
  return (
    <button
      className="group font-instrument-sans relative flex h-[50px] w-full cursor-pointer items-center justify-center text-[15px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_2px_rgba(17,17,20,0.06)] transition-[filter] duration-150 ease-out hover:brightness-[1.1] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100 mt-7 snip-bbc4-0"
      style={{
        backgroundImage:
          "linear-gradient(rgb(80, 81, 85) 0%, rgb(62, 63, 68) 52%, rgb(51, 52, 56) 100%)",
        borderRadius: "10px",
        filter: "blur(0px)",
        transform: "none",
        transformOrigin: "50% 50% 0px",
        outlineOffset: "2px",
        background:
          "rgba(0, 0, 0, 0) linear-gradient(rgb(80, 81, 85) 0%, rgb(62, 63, 68) 52%, rgb(51, 52, 56) 100%) repeat scroll 0% 0% / auto padding-box border-box",
        color: "rgb(255, 255, 255)",
        fontSize: "15px",
        fontWeight: 500,
        fontFamily:
          '"Instrument Sans", "Instrument Sans Fallback", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        lineHeight: "22.5px",
        letterSpacing: "normal",
        textAlign: "center",
        border: "0px solid rgb(255, 255, 255)",
        borderTop: "0px solid rgb(255, 255, 255)",
        borderRight: "0px solid rgb(255, 255, 255)",
        borderBottom: "0px solid rgb(255, 255, 255)",
        borderLeft: "0px solid rgb(255, 255, 255)",
        borderColor: "rgb(255, 255, 255)",
        boxShadow:
          "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(255, 255, 255, 0.12) 0px 1px 0px 0px inset, rgba(17, 17, 20, 0.06) 0px 1px 2px 0px",
        opacity: 1,
        zIndex: "auto",
      }}
      type="submit"
    >
      <span
        className="flex items-center justify-center gap-2 snip-bbc4-1"
        style={{
          outlineOffset: "2px",
          background:
            "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box",
          color: "rgb(255, 255, 255)",
          fontSize: "15px",
          fontWeight: 500,
          fontFamily:
            '"Instrument Sans", "Instrument Sans Fallback", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          lineHeight: "22.5px",
          letterSpacing: "normal",
          textAlign: "center",
          border: "0px solid rgb(255, 255, 255)",
          borderTop: "0px solid rgb(255, 255, 255)",
          borderRight: "0px solid rgb(255, 255, 255)",
          borderBottom: "0px solid rgb(255, 255, 255)",
          borderLeft: "0px solid rgb(255, 255, 255)",
          borderColor: "rgb(255, 255, 255)",
          opacity: 1,
          zIndex: "auto",
        }}
        tabIndex={0}
      >
        Sign in
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-right transition-transform duration-200 ease-out group-hover:translate-x-0.5"
          aria-hidden="true"
          style={{ outlineOffset: "2px" }}
        >
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </span>
    </button>
  );
}

export function CreateAccountButton() {
  return (
    <button
      className="group font-instrument-sans relative flex h-[50px] w-full cursor-pointer items-center justify-center text-[15px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_2px_rgba(17,17,20,0.06)] transition-[filter] duration-150 ease-out hover:brightness-[1.1] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100 mt-7 snip-bbc4-0"
      style={{
        backgroundImage:
          "linear-gradient(rgb(80, 81, 85) 0%, rgb(62, 63, 68) 52%, rgb(51, 52, 56) 100%)",
        borderRadius: "10px",
        filter: "blur(0px)",
        transform: "none",
        transformOrigin: "50% 50% 0px",
        outlineOffset: "2px",
        background:
          "rgba(0, 0, 0, 0) linear-gradient(rgb(80, 81, 85) 0%, rgb(62, 63, 68) 52%, rgb(51, 52, 56) 100%) repeat scroll 0% 0% / auto padding-box border-box",
        color: "rgb(255, 255, 255)",
        fontSize: "15px",
        fontWeight: 500,
        fontFamily:
          '"Instrument Sans", "Instrument Sans Fallback", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        lineHeight: "22.5px",
        letterSpacing: "normal",
        textAlign: "center",
        border: "0px solid rgb(255, 255, 255)",
        borderTop: "0px solid rgb(255, 255, 255)",
        borderRight: "0px solid rgb(255, 255, 255)",
        borderBottom: "0px solid rgb(255, 255, 255)",
        borderLeft: "0px solid rgb(255, 255, 255)",
        borderColor: "rgb(255, 255, 255)",
        boxShadow:
          "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(255, 255, 255, 0.12) 0px 1px 0px 0px inset, rgba(17, 17, 20, 0.06) 0px 1px 2px 0px",
        opacity: 1,
        zIndex: "auto",
      }}
      type="submit"
    >
      <span
        className="flex items-center justify-center gap-2 snip-bbc4-1"
        style={{
          outlineOffset: "2px",
          background:
            "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box",
          color: "rgb(255, 255, 255)",
          fontSize: "15px",
          fontWeight: 500,
          fontFamily:
            '"Instrument Sans", "Instrument Sans Fallback", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          lineHeight: "22.5px",
          letterSpacing: "normal",
          textAlign: "center",
          border: "0px solid rgb(255, 255, 255)",
          borderTop: "0px solid rgb(255, 255, 255)",
          borderRight: "0px solid rgb(255, 255, 255)",
          borderBottom: "0px solid rgb(255, 255, 255)",
          borderLeft: "0px solid rgb(255, 255, 255)",
          borderColor: "rgb(255, 255, 255)",
          opacity: 1,
          zIndex: "auto",
        }}
        tabIndex={0}
      >
        Create Account
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-right transition-transform duration-200 ease-out group-hover:translate-x-0.5"
          aria-hidden="true"
          style={{ outlineOffset: "2px" }}
        >
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </span>
    </button>
  );
}