/* Animated dependency tree visualization */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown, GitBranch } from "lucide-react";
import { DEPENDENCY_TREES, type DepTreeNode } from "../data/packages";

interface DependencyTreeProps {
  packageName: string;
  onView?: () => void;
}

/* Recursive tree node component */
function TreeNode({ node, depth = 0, index = 0 }: { node: DepTreeNode; depth?: number; index?: number }) {
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 + depth * 0.1, duration: 0.3 }}
      style={{ marginLeft: depth * 16 }}
    >
      <div
        className={`flex items-center gap-1.5 py-0.5 text-[0.65rem] cursor-pointer
                     hover:bg-terminal/[0.05] px-1 transition-colors ${hasChildren ? "" : "cursor-default"}`}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        {/* Expand/collapse icon */}
        {hasChildren ? (
          expanded ? (
            <ChevronDown className="w-3 h-3 text-terminal/40 flex-shrink-0" />
          ) : (
            <ChevronRight className="w-3 h-3 text-terminal/40 flex-shrink-0" />
          )
        ) : (
          <span className="w-3 h-3 flex items-center justify-center text-terminal/20 flex-shrink-0">
            -
          </span>
        )}

        {/* Package name */}
        <span className="text-terminal/80">{node.name}</span>
        <span className="text-terminal/30">@{node.version}</span>
      </div>

      {/* Children — animated expand/collapse */}
      <AnimatePresence>
        {expanded && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-l border-terminal/10"
            style={{ marginLeft: depth > 0 ? 6 : 0 }}
          >
            {node.children!.map((child, i) => (
              <TreeNode key={child.name} node={child} depth={depth + 1} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function DependencyTree({ packageName, onView }: DependencyTreeProps) {
  const [isOpen, setIsOpen] = useState(false);

  /* Find matching tree or use default */
  const slug = (packageName || "").toLowerCase().replace(/\s/g, "-");
  const tree = DEPENDENCY_TREES[slug] || DEPENDENCY_TREES["default"];

  function handleToggle() {
    setIsOpen(!isOpen);
    if (!isOpen && onView) onView();
  }

  return (
    <div className="mb-6">
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 text-[0.62rem] tracking-[3px] text-terminal/45
                   hover:text-terminal/70 transition-colors mb-2"
      >
        <GitBranch className="w-3 h-3" />
        {isOpen ? "HIDE" : "VIEW"} DEPENDENCY TREE
        <span className="text-terminal/25">({tree.children?.length || 0} direct deps)</span>
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
            <div className="border border-terminal/10 bg-terminal/[0.02] p-3 max-h-[300px] overflow-y-auto">
              <div className="text-[0.55rem] text-terminal/30 mb-2 tracking-wider">
                {tree.name}@{tree.version} dependency graph:
              </div>
              <TreeNode node={tree} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
