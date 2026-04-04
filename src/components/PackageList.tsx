import { AlertTriangle, Check, Package } from "lucide-react";
import type { LifePackage } from "../data/packages";

interface PackageListProps {
  installed: LifePackage[];
}

export function PackageList({ installed }: PackageListProps) {
  if (installed.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="text-[0.62rem] tracking-[4px] text-terminal/45 mb-3 flex items-center gap-2">
        <Package className="w-3 h-3" />
        INSTALLED PACKAGES:
      </div>

      <div className="space-y-1">
        {installed.map((pkg, i) => (
          <div
            key={i}
            className="grid grid-cols-[1fr_auto_auto_auto] gap-3 items-center
                       px-3 py-2 border border-terminal/8 bg-terminal/[0.03]
                       text-[0.68rem] animate-pkg-in hover:bg-terminal/[0.06] transition-colors"
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
          </div>
        ))}
      </div>
    </div>
  );
}
