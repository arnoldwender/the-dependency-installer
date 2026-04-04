import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="border-t border-terminal/8 pt-6 mt-4 text-center text-[0.58rem] text-terminal/20 tracking-[2px] leading-[2.2]"
    >
      <div>NPM INSTALL LIFE IS NOT RESPONSIBLE FOR EXISTENTIAL CRISES OR BLOATED node_modules</div>
      <div>BUILT BY ARNOLD WENDER -- WE HAVE 847 DEPENDENCIES IN PRODUCTION</div>
      <div className="text-red-500/10 mt-1">HTTP 418 -- node_modules IS ALSO A TEAPOT</div>
    </motion.div>
  );
}
