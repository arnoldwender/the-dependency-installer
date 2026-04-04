import { motion } from "framer-motion";
import { Package } from "lucide-react";

export function IdleState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="text-center py-12 text-terminal/20 text-[0.72rem] tracking-[3px]"
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Package className="w-12 h-12 mx-auto mb-4 opacity-40" />
      </motion.div>
      <div>TYPE ANYTHING. WE'LL INSTALL IT.</div>
      <div className="text-[0.6rem] text-terminal/10 mt-2">
        WARNING: SOME PACKAGES CANNOT BE UNINSTALLED
      </div>
    </motion.div>
  );
}
