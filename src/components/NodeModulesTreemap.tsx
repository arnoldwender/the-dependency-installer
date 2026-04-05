/* node_modules size treemap — styled like Webpack Bundle Analyzer (Premium) */
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HardDrive, X, AlertTriangle, Trash2 } from "lucide-react";
import { TREEMAP_ITEMS, DISK_SUMMARY, type TreemapItem } from "../data/treemap";

/* Fake "optimization" suggestions per package */
const OPTIMIZATION_TIPS: Record<string, string> = {
  "Stack Overflow": "Suggestion: npm uninstall stack-overflow && rm -rf career",
  "Existential Dread": "Suggestion: Cannot optimize. This dependency is load-bearing.",
  "Morning Coffee": "Suggestion: Do NOT remove. Last developer who tried this is still asleep.",
  "Procrastination Engine": "Suggestion: npm dedupe --later ...scheduling for next sprint.",
  "Webpack Config": "Suggestion: Abandon hope. Migrate to Vite. Accept your fate.",
  "Deprecated Dependencies": "Suggestion: npm audit fix --force (WARNING: may break everything)",
  "Imposter Syndrome": "Suggestion: npm install confidence --save-dev (peer dep: therapy@latest)",
  "node_modules/.cache": "Suggestion: rm -rf node_modules/.cache && pretend nothing happened",
};

export function NodeModulesTreemap() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<TreemapItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [optimizing, setOptimizing] = useState(false);
  const [optimizeResult, setOptimizeResult] = useState<string | null>(null);

  /* Sort items by sizeBytes for layout — largest first */
  const sorted = useMemo(
    () => [...TREEMAP_ITEMS].sort((a, b) => b.sizeBytes - a.sizeBytes),
    []
  );

  /* Calculate relative sizes for grid layout */
  const maxSize = Math.max(...sorted.map((i) => i.sizeBytes));

  /* Total "size" for display — sum of all displayed sizes */
  const totalDisplay = useMemo(() => {
    const totalGB = sorted.reduce((sum, item) => {
      if (item.sizeBytes >= 1000) return sum + item.sizeBytes / 1000;
      return sum + item.sizeBytes / 1000;
    }, 0);
    return `${totalGB.toFixed(1)}GB parsed`;
  }, [sorted]);

  /* Fake "optimize" action */
  function handleOptimize() {
    setOptimizing(true);
    setOptimizeResult(null);
    setTimeout(() => {
      setOptimizing(false);
      setOptimizeResult(
        "Optimized! Saved 0 bytes. node_modules actually grew by 2.3GB during analysis. This is normal."
      );
    }, 2500);
  }

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[0.62rem] tracking-[3px] text-terminal/45
                   hover:text-terminal/70 transition-colors mb-2"
      >
        <HardDrive className="w-3 h-3" />
        {isOpen ? "HIDE" : "ANALYZE"} NODE_MODULES SIZE
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
              {/* Header bar — mimics Webpack Bundle Analyzer */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-terminal/10">
                <div className="flex items-center gap-2">
                  <span className="text-[0.55rem] text-terminal/50 tracking-wider">
                    WEBPACK LIFE ANALYZER — node_modules
                  </span>
                  <span className="text-[0.45rem] text-terminal/25">
                    ({totalDisplay})
                  </span>
                </div>
                <span className="text-[0.5rem] text-red-500/50 font-bold">
                  Total: {DISK_SUMMARY.total} — Disk space: {DISK_SUMMARY.remaining}
                </span>
              </div>

              {/* Treemap grid */}
              <div className="p-3">
                <div className="grid grid-cols-4 gap-1 auto-rows-auto">
                  {sorted.map((item, i) => {
                    /* Calculate relative height based on size */
                    const ratio = item.sizeBytes / maxSize;
                    const minH = 48;
                    const maxH = 120;
                    const height = Math.max(minH, Math.round(ratio * maxH));

                    /* Large items span 2 columns */
                    const span = ratio > 0.5 ? "col-span-2" : "col-span-1";
                    const isHovered = hoveredItem === item.name;

                    return (
                      <motion.button
                        key={item.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.04, duration: 0.3 }}
                        onClick={() => setSelected(selected?.name === item.name ? null : item)}
                        onMouseEnter={() => setHoveredItem(item.name)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className={`${span} relative overflow-hidden border transition-all duration-200
                                   text-left p-2 group cursor-pointer
                                   ${selected?.name === item.name
                                     ? "border-white/40 z-10 ring-1 ring-white/20"
                                     : "border-white/5 hover:border-white/20"
                                   }`}
                        style={{
                          height: `${height}px`,
                          backgroundColor: `${item.color}${isHovered ? "22" : "15"}`,
                          borderColor: selected?.name === item.name ? item.color : undefined,
                        }}
                      >
                        {/* Color indicator bar at top */}
                        <div
                          className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-200"
                          style={{
                            backgroundColor: item.color,
                            height: isHovered ? "3px" : "2px",
                          }}
                        />

                        {/* Package name */}
                        <div
                          className="text-[0.55rem] font-bold truncate leading-tight"
                          style={{ color: item.color }}
                        >
                          {item.name}
                        </div>

                        {/* Size label */}
                        <div className="text-[0.5rem] text-white/30 mt-0.5">
                          {item.size}
                        </div>

                        {/* Percentage label on hover */}
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute bottom-1.5 right-1.5 text-[0.42rem] text-white/25"
                          >
                            {((item.sizeBytes / sorted.reduce((s, x) => s + x.sizeBytes, 0)) * 100).toFixed(1)}%
                          </motion.div>
                        )}

                        {/* Hover glow effect */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                          style={{ backgroundColor: `${item.color}08` }}
                        />
                      </motion.button>
                    );
                  })}
                </div>

                {/* Selected item detail panel */}
                <AnimatePresence>
                  {selected && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="mt-3 border p-3 relative"
                      style={{
                        borderColor: `${selected.color}30`,
                        backgroundColor: `${selected.color}08`,
                      }}
                    >
                      <button
                        onClick={() => setSelected(null)}
                        className="absolute top-2 right-2 text-white/30 hover:text-white/60 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>

                      <div className="text-[0.6rem] font-bold mb-1" style={{ color: selected.color }}>
                        {selected.name}
                      </div>

                      <div className="text-[0.55rem] text-terminal/50 leading-relaxed mb-2">
                        {selected.description}
                      </div>

                      {/* Optimization tip for known packages */}
                      {OPTIMIZATION_TIPS[selected.name] && (
                        <div className="flex items-start gap-1.5 mt-2 pt-2 border-t border-white/5">
                          <AlertTriangle className="w-3 h-3 text-amber-500/50 flex-shrink-0 mt-0.5" />
                          <div className="text-[0.48rem] text-amber-500/40 leading-relaxed">
                            {OPTIMIZATION_TIPS[selected.name]}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Disk usage summary bar */}
              <div className="px-3 pb-3">
                <div className="border border-terminal/10 bg-terminal/[0.02] p-2">
                  <div className="flex items-center justify-between text-[0.5rem] text-terminal/30 mb-1.5">
                    <span>DISK USAGE</span>
                    <span className="text-red-500/60">{DISK_SUMMARY.used} / {DISK_SUMMARY.total}</span>
                  </div>
                  {/* Usage bar — completely full */}
                  <div className="h-[6px] bg-terminal/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{
                        background: "linear-gradient(90deg, #00ff41, #eab308, #f97316, #ef4444)",
                      }}
                    />
                  </div>
                  <div className="text-[0.45rem] text-red-500/40 mt-1.5">
                    {DISK_SUMMARY.recommendation}
                  </div>
                </div>

                {/* Fake "Optimize" button */}
                <div className="mt-2">
                  <button
                    onClick={handleOptimize}
                    disabled={optimizing}
                    className="flex items-center gap-1.5 text-[0.5rem] text-terminal/35
                               hover:text-terminal/60 transition-colors disabled:opacity-30"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span className="tracking-wider">
                      {optimizing ? "OPTIMIZING..." : "OPTIMIZE BUNDLE"}
                    </span>
                  </button>
                  {optimizing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1.5 text-[0.48rem] text-terminal/30 animate-pulse"
                    >
                      Running tree-shaking on your life choices... analyzing regret graph... deduplicating anxiety...
                    </motion.div>
                  )}
                  {optimizeResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1.5 text-[0.48rem] text-amber-500/40"
                    >
                      {optimizeResult}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
