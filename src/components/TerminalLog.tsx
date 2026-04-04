import { useEffect, useRef } from "react";
import type { Phase } from "../hooks/useInstaller";

interface TerminalLogProps {
  logs: string[];
  progress: number;
  phase: Phase;
}

function getLogColor(log: string): string {
  if (log.startsWith("npm ERR!")) return "text-red-500";
  if (log.startsWith("npm WARN") || log.startsWith("warning:")) return "text-amber-500";
  if (log.startsWith(">")) return "text-terminal";
  if (log.startsWith("found")) return "text-red-400";
  if (log.startsWith("Run")) return "text-terminal/60";
  if (log.startsWith("added")) return "text-terminal/80";
  return "text-terminal/50";
}

export function TerminalLog({ logs, progress, phase }: TerminalLogProps) {
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  if (logs.length === 0) return null;

  return (
    <div className="mb-6">
      {phase === "installing" && (
        <div className="mb-3">
          <div className="text-[0.6rem] tracking-[3px] text-terminal/45 mb-1.5 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-terminal animate-pulse" />
            INSTALLING: {progress}%
          </div>
          <div className="h-[3px] bg-terminal/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-terminal rounded-full transition-all duration-300 ease-out progress-glow"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div
        ref={logRef}
        className="bg-[#010a01] border border-terminal/10 p-3 h-[220px] overflow-y-auto
                   text-[0.68rem] leading-[1.9] scrollbar-thin"
      >
        {logs.map((log, i) => (
          <div key={i} className={`${getLogColor(log)} log-glow`}>
            {log}
          </div>
        ))}
        {phase === "installing" && (
          <span className="animate-blink text-terminal">&#x258A;</span>
        )}
      </div>
    </div>
  );
}
