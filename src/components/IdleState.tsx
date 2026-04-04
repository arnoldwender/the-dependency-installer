import { Package } from "lucide-react";

export function IdleState() {
  return (
    <div className="text-center py-12 text-terminal/20 text-[0.72rem] tracking-[3px]">
      <Package className="w-12 h-12 mx-auto mb-4 opacity-40" />
      <div>TYPE ANYTHING. WE'LL INSTALL IT.</div>
      <div className="text-[0.6rem] text-terminal/10 mt-2">
        WARNING: SOME PACKAGES CANNOT BE UNINSTALLED
      </div>
    </div>
  );
}
