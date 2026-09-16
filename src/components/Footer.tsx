import React from "react";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between px-8 py-6 text-sm text-neutral-400">
      <span>© 2026 Ansify AI</span>
      <div className="flex gap-6">
        <a href="#" className="hover:text-neutral-600">
          Privacy
        </a>
        <a href="#" className="hover:text-neutral-600">
          Terms
        </a>
      </div>
    </footer>
  );
};

export default Footer;
