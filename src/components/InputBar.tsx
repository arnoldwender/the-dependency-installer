import { ChevronRight } from "lucide-react";
import { SUGGESTIONS } from "../data/packages";
import type { Phase } from "../hooks/useInstaller";

interface InputBarProps {
  input: string;
  setInput: (value: string) => void;
  onInstall: () => void;
  phase: Phase;
}

export function InputBar({ input, setInput, onInstall, phase }: InputBarProps) {
  return (
    <div className="mb-6">
      <div className="text-[0.62rem] tracking-[3px] text-terminal/50 mb-2">
        WHAT DO YOU WANT TO INSTALL?
      </div>

      <div className="flex gap-2 flex-wrap mb-3">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setInput(s)}
            className="text-[0.6rem] border border-terminal/20 px-2 py-1 text-terminal/45 bg-transparent font-mono
                       transition-all duration-150 hover:bg-terminal/10 hover:text-terminal/70 hover:border-terminal/40
                       focus:outline-none focus:ring-1 focus:ring-terminal/30"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-terminal/40">
            <ChevronRight className="w-4 h-4" />
          </span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onInstall()}
            placeholder="npm install happiness"
            className="w-full bg-[#050a05] border border-terminal/25 text-terminal font-mono text-sm
                       py-3 px-3 pl-9 outline-none caret-terminal placeholder:text-terminal/20
                       focus:border-terminal/50 transition-colors duration-200"
          />
        </div>
        <button
          onClick={onInstall}
          disabled={phase === "installing"}
          className="bg-transparent border border-terminal text-terminal font-mono text-[0.8rem]
                     px-5 tracking-[2px] transition-all duration-200
                     hover:bg-terminal hover:text-black
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-terminal
                     focus:outline-none focus:ring-1 focus:ring-terminal/50"
        >
          {phase === "installing" ? "INSTALLING..." : "INSTALL"}
        </button>
      </div>
    </div>
  );
}
