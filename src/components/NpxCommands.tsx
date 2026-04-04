/* NPX quick-run command buttons with animated output */
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Terminal } from "lucide-react";
import { NPX_COMMANDS, type NpxCommand } from "../data/packages";
import { playTypeSound } from "../utils/sounds";

interface NpxCommandsProps {
  onRun?: () => void;
  soundEnabled?: boolean;
}

export function NpxCommands({ onRun, soundEnabled = true }: NpxCommandsProps) {
  const [activeCommand, setActiveCommand] = useState<NpxCommand | null>(null);
  const [outputLines, setOutputLines] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  function runCommand(cmd: NpxCommand) {
    if (isRunning) return;

    setActiveCommand(cmd);
    setOutputLines([]);
    setIsRunning(true);
    if (onRun) onRun();

    let i = 0;
    intervalRef.current = window.setInterval(() => {
      if (i < cmd.output.length) {
        setOutputLines((prev) => [...prev, cmd.output[i]]);
        if (soundEnabled) playTypeSound();
        i++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsRunning(false);
      }
    }, 300);
  }

  function closeOutput() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActiveCommand(null);
    setOutputLines([]);
    setIsRunning(false);
  }

  return (
    <div className="mb-6">
      <div className="text-[0.62rem] tracking-[3px] text-terminal/45 mb-3 flex items-center gap-2">
        <Terminal className="w-3 h-3" />
        QUICK NPX COMMANDS
      </div>

      {/* Command buttons grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
        {NPX_COMMANDS.map((cmd) => (
          <motion.button
            key={cmd.command}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => runCommand(cmd)}
            disabled={isRunning}
            className="text-left border border-terminal/15 bg-terminal/[0.02] p-2
                       hover:border-terminal/30 hover:bg-terminal/[0.05] transition-all
                       disabled:opacity-40 disabled:cursor-not-allowed group"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Play className="w-2.5 h-2.5 text-terminal/40 group-hover:text-terminal/70" />
              <span className="text-[0.55rem] text-terminal/70 truncate">
                {cmd.command}
              </span>
            </div>
            <div className="text-[0.5rem] text-terminal/30 truncate">
              {cmd.description}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Command output panel */}
      <AnimatePresence>
        {activeCommand && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border border-terminal/15 bg-[#010a01]">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-terminal/10">
                <span className="text-[0.55rem] text-terminal/50">
                  $ {activeCommand.command}
                </span>
                <button
                  onClick={closeOutput}
                  className="text-[0.55rem] text-terminal/30 hover:text-terminal/60 transition-colors"
                >
                  [CLOSE]
                </button>
              </div>
              <div className="p-3 max-h-[200px] overflow-y-auto">
                {outputLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`text-[0.62rem] leading-[1.8] ${
                      !line
                        ? "text-terminal/50"
                        : line.startsWith("npm ERR!") || line.startsWith("ERR!")
                        ? "text-red-500"
                        : line.startsWith("npm WARN") || line.startsWith("warning:")
                        ? "text-amber-500"
                        : line.startsWith("critical:") || line.startsWith("high:")
                        ? "text-red-400"
                        : "text-terminal/50"
                    }`}
                  >
                    {line}
                  </motion.div>
                ))}
                {isRunning && (
                  <span className="animate-blink text-terminal text-[0.62rem]">&#x258A;</span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
