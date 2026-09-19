"use client";

import { SignInButton } from "@/components/button";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/Ansify-AI");
      }

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-14 py-6">
          <a
            className="font-lastik text-[22px] leading-none tracking-[-0.02em] snip-4f4f-0"
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
          <a
            className="text-sm text-neutral-950 tracking-tight hover:text-neutral-900 snip-d66e-0"
            style={{
              outlineOffset: "2px",
              background:
                "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box",
              color: "lab(7.78201 -0.0000149012 0)",
              fontSize: "14px",
              fontWeight: 400,
              fontFamily: "Inter, sans-serif",
              lineHeight: "20px",
              letterSpacing: "-0.35px",
              textAlign: "start",
              border: "0px solid lab(7.78201 -0.0000149012 0)",
              borderTop: "0px solid lab(7.78201 -0.0000149012 0)",
              borderRight: "0px solid lab(7.78201 -0.0000149012 0)",
              borderBottom: "0px solid lab(7.78201 -0.0000149012 0)",
              borderLeft: "0px solid lab(7.78201 -0.0000149012 0)",
              borderColor: "lab(7.78201 -0.0000149012 0)",
              opacity: 1,
              zIndex: "auto",
            }}
            href="http://localhost:3000/signIn#"
          >
            Sign up
          </a>
        </header>

        <main className="flex-1 flex items-start justify-center pt-40">
          <div className="w-full max-w-[420px] px-4">
            <h1
              className="text-[34px] leading-[1.05] snip-05c5-0 pb-8"
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
            >
              Welcome back
            </h1>

            <a
              className="font-instrument-sans flex h-[52px] w-full cursor-pointer items-center justify-center gap-2.5 bg-white text-[15.5px] font-medium text-[#111111] transition-colors duration-100 ease-out hover:bg-[#fafafae3] no-underline snip-12e4-0"
              style={{
                border: "1px solid rgba(15, 17, 21, 0.14)",
                borderRadius: "10px",
                outlineOffset: "2px",
                transform: "scale(0.990305)",
                background:
                  "rgba(250, 250, 250, 0.89) none repeat scroll 0% 0% / auto padding-box border-box",
                backgroundColor: "rgba(250, 250, 250, 0.89)",
                color: "rgb(17, 17, 17)",
                fontSize: "15.5px",
                fontWeight: 500,
                fontFamily:
                  '"Instrument Sans", "Instrument Sans Fallback", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                lineHeight: "23.25px",
                letterSpacing: "normal",
                textAlign: "start",
                borderTop: "1px solid rgba(15, 17, 21, 0.14)",
                borderRight: "1px solid rgba(15, 17, 21, 0.14)",
                borderBottom: "1px solid rgba(15, 17, 21, 0.14)",
                borderLeft: "1px solid rgba(15, 17, 21, 0.14)",
                borderColor: "rgba(15, 17, 21, 0.14)",
                borderWidth: "1px",
                opacity: 1,
                zIndex: "auto",
              }}
              href=""
              tabIndex={0}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  fill="#FFC107"
                  d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                ></path>
              </svg>
              Sign in with Google
            </a>

            <a
              className="font-instrument-sans flex h-[52px] w-full cursor-pointer items-center justify-center gap-2.5 bg-white text-[15.5px] font-medium text-[#111111] transition-colors duration-100 ease-out hover:bg-[#fafafae3] no-underline snip-d105-0 mt-2"
              style={{
                border: "1px solid rgba(15, 17, 21, 0.14)",
                borderRadius: "10px",
                outlineOffset: "2px",
                transform: "scale(0.99122)",
                background:
                  "rgba(250, 250, 250, 0.89) none repeat scroll 0% 0% / auto padding-box border-box",
                backgroundColor: "rgba(250, 250, 250, 0.89)",
                color: "rgb(17, 17, 17)",
                fontSize: "15.5px",
                fontWeight: 500,
                fontFamily:
                  '"Instrument Sans", "Instrument Sans Fallback", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                lineHeight: "23.25px",
                letterSpacing: "normal",
                textAlign: "start",
                borderTop: "1px solid rgba(15, 17, 21, 0.14)",
                borderRight: "1px solid rgba(15, 17, 21, 0.14)",
                borderBottom: "1px solid rgba(15, 17, 21, 0.14)",
                borderLeft: "1px solid rgba(15, 17, 21, 0.14)",
                borderColor: "rgba(15, 17, 21, 0.14)",
                borderWidth: "1px",
                opacity: 1,
                zIndex: "auto",
              }}
              tabIndex={0}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="#080808"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
              Sign in with X
            </a>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-neutral-200" />
              <span className="text-sm text-neutral-400">or</span>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>

            <input
              value={form.email}
              onChange={(e) => setform({ ...form, email: e.target.value })}
              type="email"
              placeholder="Email"
              className="w-full border border-neutral-200 rounded-lg py-3 px-4 text-sm text-neutral-900 placeholder:text-neutral-400 mb-3 focus:outline-none focus:border-neutral-400"
            />

            <div className="relative mb-4">
              <input
                value={form.password}
                onChange={(e) => setform({ ...form, password: e.target.value })}
                type="password"
                placeholder="Password"
                className="w-full border border-neutral-200 rounded-lg py-3 px-4 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <span
                  className="flex h-[16px] w-[16px] items-center justify-center rounded-[4px] border snip-c8ed-0"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0)",
                    borderColor: "rgba(15, 17, 21, 0.28)",
                    outlineOffset: "2px",
                    background:
                      "rgba(255, 255, 255, 0) none repeat scroll 0% 0% / auto padding-box border-box",
                    color: "rgb(237, 237, 237)",
                    fontSize: "16px",
                    fontWeight: 400,
                    fontFamily:
                      '"Instrument Sans", "Instrument Sans Fallback", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    lineHeight: "24px",
                    letterSpacing: "normal",
                    textAlign: "center",
                    border: "1px solid rgba(15, 17, 21, 0.28)",
                    borderTop: "1px solid rgba(15, 17, 21, 0.28)",
                    borderRight: "1px solid rgba(15, 17, 21, 0.28)",
                    borderBottom: "1px solid rgba(15, 17, 21, 0.28)",
                    borderLeft: "1px solid rgba(15, 17, 21, 0.28)",
                    borderWidth: "1px",
                    borderRadius: "4px",
                    opacity: 1,
                    zIndex: "auto",
                  }}
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 12 12"
                    fill="none"
                    style={{
                      opacity: 0,
                      transform: "scale(0.5)",
                      outlineOffset: "2px",
                    }}
                  >
                    <path
                      d="M2 6.2L4.7 9 10 3"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      pathLength="1"
                      strokeDashoffset="0"
                      strokeDasharray="0 1"
                    ></path>
                  </svg>
                </span>
                <span
                  className="font-instrument-sans text-[13px] snip-c36c-0"
                  style={{
                    color: "rgb(80, 80, 80)",
                    outlineOffset: "2px",
                    background:
                      "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box",
                    fontSize: "13px",
                    fontWeight: 400,
                    fontFamily:
                      '"Instrument Sans", "Instrument Sans Fallback", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    lineHeight: "19.5px",
                    letterSpacing: "normal",
                    textAlign: "center",
                    border: "0px solid rgb(80, 80, 80)",
                    borderTop: "0px solid rgb(80, 80, 80)",
                    borderRight: "0px solid rgb(80, 80, 80)",
                    borderBottom: "0px solid rgb(80, 80, 80)",
                    borderLeft: "0px solid rgb(80, 80, 80)",
                    borderColor: "rgb(80, 80, 80)",
                    opacity: 1,
                    zIndex: "auto",
                  }}
                >
                  Remember me
                </span>
              </label>
              <button
                className="font-instrument-sans cursor-pointer text-[13px] font-normal underline-offset-2 hover:underline snip-cb0f-0"
                style={{
                  color: "rgb(8, 8, 8)",
                  outlineOffset: "2px",
                  background:
                    "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box",
                  fontSize: "13px",
                  fontWeight: 400,
                  fontFamily:
                    '"Instrument Sans", "Instrument Sans Fallback", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  lineHeight: "19.5px",
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
                type="button"
              >
                Forgot password?
              </button>
            </div>
            <div onClick={handleSubmit}>
              <SignInButton />
            </div>
            <p
              className="font-instrument-sans mt-6 text-center text-[13.5px] font-normal snip-c6f1-0"
              style={{
                outlineOffset: "2px",
                background:
                  "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box",
                color: "rgb(80, 80, 80)",
                fontSize: "13.5px",
                fontWeight: 400,
                fontFamily:
                  '"Instrument Sans", "Instrument Sans Fallback", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                lineHeight: "20.25px",
                letterSpacing: "normal",
                textAlign: "center",
                border: "0px solid rgb(80, 80, 80)",
                borderTop: "0px solid rgb(80, 80, 80)",
                borderRight: "0px solid rgb(80, 80, 80)",
                borderBottom: "0px solid rgb(80, 80, 80)",
                borderLeft: "0px solid rgb(80, 80, 80)",
                borderColor: "rgb(80, 80, 80)",
                opacity: 1,
                zIndex: "auto",
              }}
            >
              New to Ansify?{" "}
              <button
                className="cursor-pointer font-medium hover:underline snip-c6f1-1"
                style={{
                  background:
                    "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box",
                  color: "rgb(8, 8, 8)",
                  fontSize: "13.5px",
                  fontWeight: 500,
                  fontFamily:
                    '"Instrument Sans", "Instrument Sans Fallback", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  lineHeight: "20.25px",
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
                type="button"
              >
                Create an account
              </button>
            </p>
          </div>
        </main>
        <div className="px-10 py-5">
          <Footer />
        </div>
      </div>

      <div className="hidden lg:block w-[55%] p-4 lg:p-4">
        <div className="relative w-full h-full rounded-[1rem] overflow-hidden bg-neutral-100">
          <img
            src="/signIn.png"
            alt="Sign in background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
