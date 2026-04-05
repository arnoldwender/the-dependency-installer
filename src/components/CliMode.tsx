/* CLI Mode — pure terminal view that looks exactly like a real terminal */
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalSquare, X } from "lucide-react";
import { LIFE_PACKAGES, NPX_COMMANDS, VULNERABILITY_SCAN, LIFE_PACKAGE_JSON } from "../data/packages";
import { AUDIT_ADVISORIES, AUDIT_SUMMARY } from "../data/audit";
import { playTypeSound } from "../utils/sounds";

/* Available CLI commands */
const HELP_TEXT = [
  "Available commands:",
  "",
  "  npm install <package>    Install a life package",
  "  npm ls                   List installed packages",
  "  npm audit                Run vulnerability audit",
  "  npm outdated             Check for outdated packages",
  "  npm run <script>         Run a life script",
  "  npx <command>            Run an npx command",
  "  cat package.json         View your life's config",
  "  du -sh node_modules      Check node_modules size",
  "  rm -rf node_modules      Try to delete node_modules",
  "  tree                     Show dependency tree",
  "  whoami                   Who are you?",
  "  clear                    Clear terminal",
  "  help                     Show this help",
  "  exit                     Exit CLI mode",
  "",
];

interface CliLine {
  type: "input" | "output" | "error" | "warning" | "success";
  text: string;
}

interface CliModeProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled?: boolean;
}

export function CliMode({ isOpen, onClose, soundEnabled = true }: CliModeProps) {
  const [lines, setLines] = useState<CliLine[]>([
    { type: "output", text: "Life Package Manager CLI v6.6.6" },
    { type: "output", text: 'Type "help" for available commands.' },
    { type: "output", text: "" },
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* Auto-scroll to bottom on new lines */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  /* Focus input when opened */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  /* Add output lines with typing delay */
  const addLines = useCallback((newLines: CliLine[], delay = 80) => {
    setIsProcessing(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < newLines.length) {
        setLines((prev) => [...prev, newLines[i]]);
        if (soundEnabled && newLines[i].text) playTypeSound();
        i++;
      } else {
        clearInterval(interval);
        setIsProcessing(false);
      }
    }, delay);
  }, [soundEnabled]);

  /* Process a command */
  function processCommand(cmd: string) {
    const trimmed = cmd.trim().toLowerCase();
    const parts = trimmed.split(/\s+/);

    /* Add the command as an input line */
    setLines((prev) => [...prev, { type: "input", text: `$ ${cmd}` }]);
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    if (!trimmed) return;

    /* Command routing */
    if (trimmed === "help") {
      addLines(HELP_TEXT.map((t) => ({ type: "output" as const, text: t })));
    } else if (trimmed === "clear") {
      setLines([]);
    } else if (trimmed === "exit") {
      addLines([{ type: "output", text: "Goodbye. Your dependencies will miss you." }], 100);
      setTimeout(onClose, 800);
    } else if (trimmed === "whoami") {
      addLines([
        { type: "output", text: "You are: a collection of mass, anxiety, and mass dependencies" },
        { type: "output", text: "UID: undefined" },
        { type: "output", text: "GID: existential-crisis" },
        { type: "output", text: "Home: ~/probably-messy" },
        { type: "output", text: "Shell: /bin/barely-functioning" },
      ]);
    } else if (trimmed.startsWith("npm install") || trimmed.startsWith("npm i ")) {
      const pkgName = parts.slice(2).join("-") || "everything";
      const pkg = LIFE_PACKAGES.find((p) => p.name.includes(pkgName)) ||
        LIFE_PACKAGES[Math.floor(Math.random() * LIFE_PACKAGES.length)];
      addLines([
        { type: "output", text: `Resolving: ${pkg.name}@${pkg.version}...` },
        { type: "warning", text: `npm WARN: ${pkg.name} has ${pkg.vulnerabilities} known vulnerabilities` },
        { type: "output", text: `Downloading: ${pkg.name}@${pkg.version} (${pkg.size})` },
        { type: "output", text: `Installing ${pkg.deps} sub-dependencies...` },
        { type: "warning", text: "npm WARN: peer dep missing: happiness@^1.0.0" },
        { type: "output", text: "" },
        { type: "success", text: `added 1 package, ${pkg.deps} sub-packages in ${(Math.random() * 30 + 5).toFixed(1)}s` },
        { type: "output", text: `found ${pkg.vulnerabilities} vulnerabilities (run npm audit for details)` },
        { type: "output", text: "" },
      ], 150);
    } else if (trimmed === "npm ls") {
      const pkgs = LIFE_PACKAGES.slice(0, 12);
      const outputLines: CliLine[] = [
        { type: "output", text: "my-life@0.0.1-beta /Users/you/life" },
      ];
      pkgs.forEach((p, i) => {
        const prefix = i === pkgs.length - 1 ? "`--" : "|--";
        outputLines.push({
          type: "output",
          text: `${prefix} ${p.name}@${p.version}`,
        });
      });
      outputLines.push({ type: "output", text: "" });
      outputLines.push({ type: "output", text: `${pkgs.length} packages installed. ${pkgs.length * 100} more hiding in node_modules.` });
      addLines(outputLines, 60);
    } else if (trimmed === "npm audit") {
      const outputLines: CliLine[] = [
        { type: "output", text: "=== npm audit security report ===" },
        { type: "output", text: "" },
      ];
      AUDIT_ADVISORIES.slice(0, 6).forEach((a) => {
        const sevColor = a.severity === "critical" || a.severity === "high" ? "error" : "warning";
        outputLines.push({
          type: sevColor as CliLine["type"],
          text: `${a.severity.toUpperCase().padEnd(10)} ${a.title}`,
        });
        outputLines.push({
          type: "output",
          text: `            Package: ${a.package} | Dep of: ${a.dependencyOf}`,
        });
        outputLines.push({
          type: "output",
          text: `            Fix: ${a.fix}`,
        });
        outputLines.push({ type: "output", text: "" });
      });
      outputLines.push({ type: "output", text: "" });
      outputLines.push({
        type: "error",
        text: `found ${AUDIT_SUMMARY.total} vulnerabilities (${AUDIT_SUMMARY.low} low, ${AUDIT_SUMMARY.moderate} moderate, ${AUDIT_SUMMARY.high} high, ${AUDIT_SUMMARY.critical} critical)`,
      });
      outputLines.push({ type: "output", text: 'Run "npm audit fix --therapy" to address 0 of these.' });
      addLines(outputLines, 60);
    } else if (trimmed === "npm outdated") {
      addLines([
        { type: "output", text: "Package              Current   Wanted    Latest" },
        { type: "output", text: "---------------------------------------------------" },
        { type: "warning", text: "motivation           0.0.1     1.0.0     ∞.0.0" },
        { type: "warning", text: "happiness            0.2.0     1.0.0     unreachable" },
        { type: "warning", text: "sleep                4.0.0     8.0.0     8.0.0" },
        { type: "error", text: "will-to-live         0.0.0     1.0.0     fluctuating" },
        { type: "warning", text: "patience             2.0.0     999.0.0   ∞.0.0" },
        { type: "warning", text: "work-life-balance    0.0.1     2.0.0     deprecated" },
        { type: "output", text: "" },
        { type: "output", text: "6 outdated packages. npm update will fix 0 of them." },
      ], 80);
    } else if (trimmed.startsWith("npm run")) {
      const script = parts.slice(2).join(" ") || "start";
      const scripts = LIFE_PACKAGE_JSON.scripts as Record<string, string>;
      const cmd = scripts[script];
      if (cmd) {
        addLines([
          { type: "output", text: `> my-life@0.0.1-beta ${script}` },
          { type: "output", text: `> ${cmd}` },
          { type: "output", text: "" },
          { type: "output", text: `Running ${script}...` },
          { type: "warning", text: `Process exited with code 1 (as expected)` },
        ]);
      } else {
        addLines([
          { type: "error", text: `npm ERR! Missing script: "${script}"` },
          { type: "error", text: "npm ERR! Available scripts: " + Object.keys(scripts).join(", ") },
        ]);
      }
    } else if (trimmed.startsWith("npx ")) {
      const npxCmd = parts.slice(1).join(" ");
      const match = NPX_COMMANDS.find((c) => c.command.includes(npxCmd));
      if (match) {
        addLines(match.output.map((text) => ({
          type: (text.startsWith("npm ERR") || text.startsWith("ERR") ? "error" :
                 text.startsWith("npm WARN") || text.startsWith("warning") ? "warning" :
                 "output") as CliLine["type"],
          text,
        })), 200);
      } else {
        addLines([
          { type: "output", text: `npx: searching for "${npxCmd}"...` },
          { type: "error", text: `npx ERR! command not found: ${npxCmd}` },
          { type: "output", text: "Try: npx create-new-hobby, npx debug-sleep, npx generate-excuse" },
        ]);
      }
    } else if (trimmed === "cat package.json") {
      const json = JSON.stringify(LIFE_PACKAGE_JSON, null, 2);
      addLines(json.split("\n").map((text) => ({ type: "output" as const, text })), 30);
    } else if (trimmed === "du -sh node_modules") {
      addLines([
        { type: "output", text: "Calculating..." },
        { type: "output", text: "" },
        { type: "error", text: "847T    node_modules/" },
        { type: "output", text: "" },
        { type: "output", text: "This is fine." },
      ]);
    } else if (trimmed === "rm -rf node_modules") {
      addLines([
        { type: "output", text: "Deleting node_modules..." },
        { type: "output", text: "Deleting node_modules/existential-dread..." },
        { type: "output", text: "Deleting node_modules/anxiety..." },
        { type: "warning", text: "Warning: node_modules is regenerating..." },
        { type: "warning", text: "Warning: node_modules has grown back larger than before" },
        { type: "error", text: "Error: node_modules cannot be killed. It is eternal." },
        { type: "output", text: "" },
        { type: "output", text: "node_modules size: 847T -> 1.2PB (congratulations)" },
      ], 200);
    } else if (trimmed === "tree") {
      addLines([
        { type: "output", text: "life@∞.0.0" },
        { type: "output", text: "|-- responsibilities@too-many" },
        { type: "output", text: "|   |-- adulting@3.2.1" },
        { type: "output", text: "|   |-- taxes@annual" },
        { type: "output", text: "|   `-- laundry@overdue" },
        { type: "output", text: "|-- coping-mechanisms@3.1.4" },
        { type: "output", text: "|   |-- coffee@6.6.6" },
        { type: "output", text: "|   |-- memes@∞.0.0" },
        { type: "output", text: "|   `-- retail-therapy@broke" },
        { type: "output", text: "`-- existential-questions@unanswered" },
        { type: "output", text: "" },
        { type: "output", text: "3 direct dependencies, 9847 transitive" },
      ], 60);
    } else {
      addLines([
        { type: "error", text: `bash: ${parts[0]}: command not found` },
        { type: "output", text: 'Type "help" for available commands.' },
      ]);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !isProcessing) {
      processCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black"
        >
          {/* Terminal window chrome */}
          <div className="h-full flex flex-col font-mono">
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-terminal/10">
              <div className="flex items-center gap-2">
                {/* macOS-style traffic lights */}
                <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-[0.55rem] text-terminal/40 tracking-wider">
                life@∞.0.0 -- bash -- 80x24
              </div>
              <button
                onClick={onClose}
                className="text-terminal/30 hover:text-terminal/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Terminal body */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 bg-black"
              onClick={() => inputRef.current?.focus()}
            >
              {/* Output lines */}
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={`text-[0.7rem] leading-[1.8] whitespace-pre-wrap
                    ${line.type === "input" ? "text-terminal" :
                      line.type === "error" ? "text-red-500" :
                      line.type === "warning" ? "text-amber-500" :
                      line.type === "success" ? "text-terminal/80" :
                      "text-terminal/50"}`}
                >
                  {line.text}
                </div>
              ))}

              {/* Input line */}
              {!isProcessing && (
                <div className="flex items-center text-[0.7rem] leading-[1.8]">
                  <span className="text-terminal/60 mr-2">
                    ~/life $
                  </span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-terminal outline-none caret-terminal"
                    spellCheck={false}
                    autoFocus
                  />
                  <span className="animate-blink text-terminal">&#x258A;</span>
                </div>
              )}

              {/* Processing indicator */}
              {isProcessing && (
                <span className="animate-blink text-terminal text-[0.7rem]">&#x258A;</span>
              )}
            </div>
          </div>

          {/* Scanline overlay for the full terminal */}
          <div className="scanlines pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Toggle button for CLI mode — placed in the header area */
export function CliModeToggle({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex items-center gap-1.5 border border-terminal/20 px-3 py-1.5
                 text-[0.55rem] tracking-[2px] text-terminal/40
                 hover:border-terminal/40 hover:text-terminal/70 hover:bg-terminal/[0.05]
                 transition-all"
    >
      <TerminalSquare className="w-3 h-3" />
      CLI MODE
    </motion.button>
  );
}
