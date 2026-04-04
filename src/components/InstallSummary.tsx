import { RefreshCw, Package, AlertTriangle, HardDrive, Clock } from "lucide-react";

interface InstallSummaryProps {
  totalPackages: number;
  totalVulns: number;
  onReset: () => void;
}

export function InstallSummary({ totalPackages, totalVulns, onReset }: InstallSummaryProps) {
  const diskSpace = Math.floor(Math.random() * 900 + 100);

  return (
    <div className="animate-pkg-in">
      <div className="border border-red-500/20 bg-red-500/[0.03] p-5 mb-6">
        <div className="text-[0.6rem] tracking-[4px] text-red-500/40 mb-4">
          INSTALLATION SUMMARY
        </div>

        <div className="grid grid-cols-2 gap-3 text-[0.72rem]">
          <div className="flex items-center gap-2 text-terminal/50">
            <Package className="w-3.5 h-3.5" />
            added {totalPackages.toLocaleString()} packages
          </div>
          <div className="flex items-center gap-2 text-amber-500/70">
            <AlertTriangle className="w-3.5 h-3.5" />
            {totalVulns} vulnerabilities
          </div>
          <div className="flex items-center gap-2 text-terminal/35">
            <HardDrive className="w-3.5 h-3.5" />
            {diskSpace}MB disk space
          </div>
          <div className="flex items-center gap-2 text-red-500/50">
            <Clock className="w-3.5 h-3.5" />
            47 years to audit
          </div>
        </div>

        <div className="mt-4 text-[0.68rem] text-amber-600/50 border-t border-amber-600/10 pt-3">
          Run <span className="text-amber-600/80">npm audit fix</span> to fix 0 of{" "}
          {totalVulns} vulnerabilities.
          <br />
          Run <span className="text-amber-600/80">npm audit fix --force</span> to introduce{" "}
          {totalVulns * 3} new ones.
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full bg-transparent border border-terminal/20 text-terminal/40
                   font-mono text-[0.65rem] py-3 tracking-[2px] transition-all duration-200
                   hover:border-terminal/50 hover:text-terminal/70 hover:bg-terminal/[0.05]
                   focus:outline-none focus:ring-1 focus:ring-terminal/30
                   flex items-center justify-center gap-2"
      >
        <RefreshCw className="w-3 h-3" />
        INSTALL MORE PROBLEMS
      </button>
    </div>
  );
}
