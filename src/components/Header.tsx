import { useState, useEffect } from "react";
import { Terminal } from "lucide-react";
import { glitchText } from "../utils/glitch";

const BASE_TITLE = "NPM INSTALL LIFE";

export function Header() {
  const [title, setTitle] = useState(BASE_TITLE);

  useEffect(() => {
    const iv = setInterval(() => {
      setTitle(glitchText(BASE_TITLE, 0.12));
      const timeout = setTimeout(() => setTitle(BASE_TITLE), 120);
      return () => clearTimeout(timeout);
    }, 3500);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="text-center mb-8 border-b border-terminal/20 pb-6">
      <div className="text-[0.65rem] tracking-[6px] text-terminal/30 mb-2">
        WENDER MEDIA EXISTENTIAL PACKAGE MANAGER
      </div>

      <h1 className="flex items-center justify-center gap-3 text-terminal font-normal m-0 mb-1 tracking-[4px] title-glow text-2xl sm:text-3xl md:text-4xl">
        <Terminal className="w-6 h-6 sm:w-8 sm:h-8 opacity-60" />
        {title}
      </h1>

      <div className="text-[0.7rem] text-terminal/50 tracking-[2px]">
        v6.6.6 -- INSTALL ANYTHING. REGRET EVERYTHING.
      </div>

      <div className="mt-3 flex justify-center gap-6 text-[0.6rem] text-terminal/25 flex-wrap">
        <span>NODE v&#x221E;</span>
        <span>NPM v6.6.6</span>
        <span>9,847 PACKAGES</span>
        <span>418 VULNS</span>
      </div>
    </div>
  );
}
