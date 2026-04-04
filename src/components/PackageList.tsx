import { motion } from "framer-motion";
import { AlertTriangle, Check, Package, X } from "lucide-react";
import type { LifePackage } from "../data/packages";

interface PackageListProps {
  installed: LifePackage[];
  failed?: LifePackage[];
}

export function PackageList({ installed, failed = [] }: PackageListProps) {
  if (installed.length === 0 && failed.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="text-[0.62rem] tracking-[4px] text-terminal/45 mb-3 flex items-center gap-2">
        <Package className="w-3 h-3" />
        INSTALLED PACKAGES:
      </div>

      <div className="space-y-1">
        {installed.map((pkg, i) => (
          <motion.div
            key={`ok-${i}`}
            initial={{ opacity: 0, x: -10, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 25 }}
            className="grid grid-cols-[1fr_auto_auto_auto] gap-3 items-center
                       px-3 py-2 border border-terminal/8 bg-terminal/[0.03]
                       text-[0.68rem] hover:bg-terminal/[0.06] transition-colors"
          >
            <span className="text-terminal font-medium truncate">{pkg.name}</span>
            <span className="text-terminal/35 text-[0.6rem]">v{pkg.version}</span>
            <span className="text-terminal/30 text-[0.6rem]">{pkg.size}</span>
            <span
              className={`text-[0.6rem] flex items-center gap-1 ${
                pkg.vulnerabilities > 0 ? "text-red-500" : "text-terminal/30"
              }`}
            >
              {pkg.vulnerabilities > 0 ? (
                <>
                  <AlertTriangle className="w-3 h-3" />
                  {pkg.vulnerabilities} vulns
                </>
              ) : (
                <>
                  <Check className="w-3 h-3" />
                  safe
                </>
              )}
            </span>
          </motion.div>
        ))}

        {/* Failed packages shown in red */}
        {failed.map((pkg, i) => (
          <motion.div
            key={`fail-${i}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (installed.length + i) * 0.05 }}
            className="px-3 py-2 border border-red-500/20 bg-red-500/[0.03] text-[0.68rem]"
          >
            <div className="flex items-center gap-2">
              <X className="w-3 h-3 text-red-500 flex-shrink-0" />
              <span className="text-red-500/70 font-medium truncate">{pkg.name}</span>
              <span className="text-red-500/30 text-[0.55rem]">FAILED</span>
            </div>
            {pkg.failReason && (
              <div className="text-[0.55rem] text-red-500/40 mt-1 ml-5 truncate">
                {pkg.failReason}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
