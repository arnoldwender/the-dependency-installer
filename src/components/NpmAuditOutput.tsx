/* Realistic npm audit output — styled exactly like real terminal npm audit */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert } from "lucide-react";
import { AUDIT_ADVISORIES, AUDIT_SUMMARY, type AuditAdvisory } from "../data/audit";

/* Severity colors matching real npm audit output */
const SEV_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  critical: { text: "text-red-500", bg: "bg-red-500", border: "border-red-500/30" },
  high: { text: "text-orange-500", bg: "bg-orange-500", border: "border-orange-500/30" },
  moderate: { text: "text-amber-500", bg: "bg-amber-500", border: "border-amber-500/30" },
  low: { text: "text-terminal/50", bg: "bg-terminal/50", border: "border-terminal/20" },
  info: { text: "text-cyan-500/50", bg: "bg-cyan-500/50", border: "border-cyan-500/20" },
};

/* Single audit advisory row — mimics the real npm audit table */
function AuditRow({ advisory, index }: { advisory: AuditAdvisory; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const colors = SEV_COLORS[advisory.severity] || SEV_COLORS.moderate;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
      className={`border ${colors.border} mb-1.5`}
    >
      {/* Header row — severity + title + package */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-3 py-2 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-start gap-3 text-[0.6rem]">
          {/* Severity badge — styled like real npm audit */}
          <span
            className={`inline-block px-1.5 py-0.5 text-[0.5rem] tracking-wider font-bold
                        text-black flex-shrink-0 ${colors.bg}`}
          >
            {advisory.severity.toUpperCase()}
          </span>

          {/* Title and package info */}
          <div className="flex-1 min-w-0">
            <div className="text-terminal/80 truncate">{advisory.title}</div>
            <div className="text-terminal/30 text-[0.5rem] mt-0.5">
              Package: <span className="text-terminal/50">{advisory.package}</span>
              {" | "}
              Dependency of: <span className="text-terminal/50">{advisory.dependencyOf}</span>
            </div>
          </div>

          {/* Advisory ID */}
          <span className="text-terminal/20 text-[0.5rem] flex-shrink-0">
            #{advisory.id}
          </span>
        </div>
      </button>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-2 border-t border-terminal/5 pt-2 text-[0.55rem] space-y-1.5">
              <div className="text-terminal/30">
                Path: <span className="text-terminal/50">{advisory.path}</span>
              </div>
              <div className="text-terminal/30">
                More info: <span className="text-cyan-500/40 underline">{advisory.moreInfo}</span>
              </div>
              <div className="text-terminal/30">
                Fix: <span className={colors.text}>{advisory.fix}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function NpmAuditOutput() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[0.62rem] tracking-[3px] text-terminal/45
                   hover:text-terminal/70 transition-colors mb-2"
      >
        <ShieldAlert className="w-3 h-3" />
        {isOpen ? "HIDE" : "RUN"} NPM AUDIT
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
              {/* Command header */}
              <div className="px-3 py-2 border-b border-terminal/10">
                <div className="text-[0.6rem] text-terminal/60">
                  $ npm audit
                </div>
              </div>

              {/* Audit running animation line */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="px-3 pt-2 text-[0.55rem] text-terminal/30"
              >
                === npm audit security report ===
              </motion.div>

              {/* Advisory list */}
              <div className="p-3 max-h-[400px] overflow-y-auto">
                {AUDIT_ADVISORIES.map((advisory, i) => (
                  <AuditRow key={advisory.id} advisory={advisory} index={i} />
                ))}
              </div>

              {/* Summary section — styled exactly like real npm audit summary */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="border-t border-terminal/10 px-3 py-3"
              >
                {/* Severity breakdown bar */}
                <div className="flex gap-0.5 h-2 mb-3 rounded-sm overflow-hidden">
                  {AUDIT_SUMMARY.critical > 0 && (
                    <div
                      className="bg-red-500 h-full"
                      style={{ flex: AUDIT_SUMMARY.critical }}
                    />
                  )}
                  {AUDIT_SUMMARY.high > 0 && (
                    <div
                      className="bg-orange-500 h-full"
                      style={{ flex: AUDIT_SUMMARY.high }}
                    />
                  )}
                  {AUDIT_SUMMARY.moderate > 0 && (
                    <div
                      className="bg-amber-500 h-full"
                      style={{ flex: AUDIT_SUMMARY.moderate }}
                    />
                  )}
                  {AUDIT_SUMMARY.low > 0 && (
                    <div
                      className="bg-terminal/40 h-full"
                      style={{ flex: AUDIT_SUMMARY.low }}
                    />
                  )}
                </div>

                {/* Count summary */}
                <div className="text-[0.6rem] text-red-400 mb-2">
                  found <span className="font-bold text-red-500">{AUDIT_SUMMARY.total.toLocaleString()}</span> vulnerabilities
                  {" ("}
                  <span className="text-terminal/50">{AUDIT_SUMMARY.low} low</span>
                  {", "}
                  <span className="text-amber-500">{AUDIT_SUMMARY.moderate} moderate</span>
                  {", "}
                  <span className="text-orange-500">{AUDIT_SUMMARY.high.toLocaleString()} high</span>
                  {", "}
                  <span className="text-red-500">{AUDIT_SUMMARY.critical} critical</span>
                  {")"}
                </div>

                {/* Fix recommendations */}
                <div className="text-[0.55rem] text-terminal/30 space-y-0.5">
                  <div>
                    Run <span className="text-terminal/50">npm audit fix</span> to fix{" "}
                    <span className="text-terminal/50">0</span> of {AUDIT_SUMMARY.total.toLocaleString()} vulnerabilities.
                  </div>
                  <div>
                    Run <span className="text-terminal/50">npm audit fix --force</span> to introduce{" "}
                    <span className="text-red-500/60">{(AUDIT_SUMMARY.total * 3).toLocaleString()}</span> new ones.
                  </div>
                  <div>
                    Run <span className="text-terminal/50">npm audit fix --therapy</span> to feel slightly better about it.
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
