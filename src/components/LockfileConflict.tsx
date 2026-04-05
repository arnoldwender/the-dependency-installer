/* Lockfile merge conflict simulator — premium git diff-style conflicts */
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitMerge, AlertTriangle, RotateCcw } from "lucide-react";
import {
  LOCKFILE_CONFLICTS,
  RESOLVE_OPTIONS,
  generateFakeLockfileLines,
} from "../data/lockfile";

/* Resolution loading messages — cycles through while "resolving" */
const RESOLVE_MESSAGES = [
  "Resolving conflict... running git merge --strategy=hope...",
  "Consulting Stack Overflow... 847 tabs open...",
  "Asking ChatGPT... it suggested deleting the repo...",
  "Running git blame... it was you. It was always you.",
  "Attempting git rebase --onto better-life...",
];

export function LockfileConflict() {
  const [isOpen, setIsOpen] = useState(false);
  const [conflictIndex, setConflictIndex] = useState(0);
  const [resolved, setResolved] = useState<string | null>(null);
  const [resolving, setResolving] = useState(false);
  const [resolveMsg, setResolveMsg] = useState(0);
  const [conflictsResolved, setConflictsResolved] = useState(0);

  const conflict = LOCKFILE_CONFLICTS[conflictIndex];

  /* Generate fake lockfile lines for the scrolling background */
  const bgLines = useMemo(() => generateFakeLockfileLines(60), []);

  function handleResolve(outcome: string) {
    setResolving(true);
    setResolveMsg(0);

    /* Cycle through loading messages for dramatic effect */
    const msgInterval = setInterval(() => {
      setResolveMsg((prev) => (prev + 1) % RESOLVE_MESSAGES.length);
    }, 800);

    /* Simulate resolution delay */
    setTimeout(() => {
      clearInterval(msgInterval);
      setResolved(outcome);
      setResolving(false);
      setConflictsResolved((prev) => prev + 1);
    }, 2400);
  }

  function handleNewConflict() {
    setResolved(null);
    setConflictIndex((prev) => (prev + 1) % LOCKFILE_CONFLICTS.length);
  }

  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[0.62rem] tracking-[3px] text-terminal/45
                   hover:text-terminal/70 transition-colors mb-2"
      >
        <GitMerge className="w-3 h-3" />
        {isOpen ? "HIDE" : "VIEW"} LOCKFILE CONFLICT
        {conflictsResolved > 0 && (
          <span className="text-[0.45rem] text-terminal/25">
            ({conflictsResolved} resolved)
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border border-terminal/15 bg-[#010a01]">
              {/* Git diff header */}
              <div className="border-b border-terminal/10 px-3 py-2">
                <div className="flex items-center justify-between">
                  <div className="text-[0.55rem] text-terminal/50 tracking-wider mb-1">
                    MERGE CONFLICT IN {conflict.filename}
                  </div>
                  <div className="text-[0.45rem] text-red-500/40">
                    CONFLICT {conflictIndex + 1}/{LOCKFILE_CONFLICTS.length}
                  </div>
                </div>
                <div className="text-[0.5rem] text-terminal/30">
                  <span className="text-red-500/60">{conflict.branchA}</span>
                  {" vs "}
                  <span className="text-terminal/60">{conflict.branchB}</span>
                </div>
              </div>

              {/* Diff header lines — look like real git diff output */}
              <div className="px-3 pt-2 text-[0.55rem] leading-[1.6]">
                <div className="text-terminal/30">diff --git a/{conflict.filename} b/{conflict.filename}</div>
                <div className="text-terminal/30">index a847c3f..b666d3a 100644</div>
                <div className="text-red-500/60">--- a/{conflict.filename}</div>
                <div className="text-terminal/60">+++ b/{conflict.filename}</div>
                <div className="text-cyan-500/40">@@ -847,12 +847,12 @@</div>
              </div>

              {/* Scrollable lockfile content with conflict markers */}
              <div className="max-h-[320px] overflow-y-auto px-3 py-2">
                {/* Background lockfile lines (before conflict) */}
                <div className="text-[0.55rem] leading-[1.7]">
                  {bgLines.slice(0, 8).map((line, i) => (
                    <div key={`bg-pre-${i}`} className="text-terminal/20">
                      <span className="text-terminal/10 inline-block w-8 text-right mr-2 select-none">
                        {840 + i}
                      </span>
                      {line}
                    </div>
                  ))}
                </div>

                {/* Context before conflict */}
                {conflict.contextBefore.map((line, i) => (
                  <div key={`ctx-before-${i}`} className="text-[0.55rem] leading-[1.7] text-terminal/40">
                    <span className="text-terminal/10 inline-block w-8 text-right mr-2 select-none">
                      {848 + i}
                    </span>
                    {line}
                  </div>
                ))}

                {/* Conflict markers */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* "Ours" marker */}
                  <div className="text-[0.55rem] leading-[1.7]">
                    <div className="bg-red-500/10 border-l-2 border-red-500/40 pl-2 py-0.5 text-red-500/70">
                      {"<<<<<<< HEAD (" + conflict.branchA + ")"}
                    </div>
                    {conflict.ours.map((line, i) => (
                      <div
                        key={`ours-${i}`}
                        className="bg-red-500/[0.05] border-l-2 border-red-500/20 pl-2 text-red-400/60"
                      >
                        {line}
                      </div>
                    ))}
                  </div>

                  {/* Separator */}
                  <div className="text-[0.55rem] leading-[1.7] text-terminal/30 bg-terminal/[0.03] border-l-2 border-terminal/20 pl-2 py-0.5">
                    =======
                  </div>

                  {/* "Theirs" */}
                  <div className="text-[0.55rem] leading-[1.7]">
                    {conflict.theirs.map((line, i) => (
                      <div
                        key={`theirs-${i}`}
                        className="bg-green-500/[0.05] border-l-2 border-green-500/20 pl-2 text-green-400/60"
                      >
                        {line}
                      </div>
                    ))}
                    <div className="bg-green-500/10 border-l-2 border-green-500/40 pl-2 py-0.5 text-green-500/70">
                      {">>>>>>> " + conflict.branchB}
                    </div>
                  </div>
                </motion.div>

                {/* Context after conflict */}
                {conflict.contextAfter.map((line, i) => (
                  <div key={`ctx-after-${i}`} className="text-[0.55rem] leading-[1.7] text-terminal/40">
                    <span className="text-terminal/10 inline-block w-8 text-right mr-2 select-none">
                      {860 + i}
                    </span>
                    {line}
                  </div>
                ))}

                {/* More background lockfile lines (after conflict) */}
                <div className="text-[0.55rem] leading-[1.7]">
                  {bgLines.slice(8, 24).map((line, i) => (
                    <div key={`bg-post-${i}`} className="text-terminal/20">
                      <span className="text-terminal/10 inline-block w-8 text-right mr-2 select-none">
                        {864 + i}
                      </span>
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              {/* File stats line */}
              <div className="px-3 py-1.5 border-t border-terminal/10 text-[0.5rem] text-terminal/25">
                {conflict.filename}: 14,847 lines | 12,093 additions(+) | 2,754 deletions(-) | mass conflicts: ∞
              </div>

              {/* Resolve options */}
              <div className="px-3 pb-3 pt-1">
                {!resolved ? (
                  <>
                    <div className="flex items-center gap-1.5 text-[0.5rem] text-amber-500/50 mb-2">
                      <AlertTriangle className="w-3 h-3" />
                      <span className="tracking-wider">RESOLVE CONFLICT:</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {RESOLVE_OPTIONS.map((option, idx) => (
                        <motion.button
                          type="button"
                          key={option.label}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleResolve(option.outcome)}
                          disabled={resolving}
                          className={`border p-2 text-left transition-all disabled:opacity-40
                                     ${idx === 2
                                       ? "border-amber-500/20 bg-amber-500/[0.03] hover:border-amber-500/40 hover:bg-amber-500/[0.06]"
                                       : "border-terminal/15 bg-terminal/[0.02] hover:border-terminal/30 hover:bg-terminal/[0.05]"
                                     }`}
                        >
                          <div className={`text-[0.55rem] mb-0.5
                                          ${idx === 2 ? "text-amber-500/70" : "text-terminal/70"}`}>
                            {option.label}
                          </div>
                          <div className="text-[0.45rem] text-terminal/30">
                            ({option.description})
                          </div>
                        </motion.button>
                      ))}
                    </div>
                    {resolving && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 text-[0.5rem] text-terminal/40 animate-pulse"
                      >
                        {RESOLVE_MESSAGES[resolveMsg]}
                      </motion.div>
                    )}
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="border border-terminal/15 bg-terminal/[0.03] p-3 text-[0.55rem] text-terminal/60 leading-relaxed mb-2">
                      {resolved}
                    </div>
                    <button
                      type="button"
                      onClick={handleNewConflict}
                      className="flex items-center gap-1.5 text-[0.5rem] text-terminal/40 hover:text-terminal/70 transition-colors tracking-wider"
                    >
                      <RotateCcw className="w-3 h-3" />
                      GENERATE NEW CONFLICT
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
