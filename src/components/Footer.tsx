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
      {/* Legal links stay readable, unlike the ghost lines above (DDG § 5) */}
      <nav aria-label="Rechtliches" className="flex justify-center gap-6 mt-2 text-xs tracking-[1px] leading-normal">
        <a href="/impressum/" className="inline-block min-h-[44px] py-3 text-terminal underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal">Impressum</a>
        <a href="/datenschutz/" className="inline-block min-h-[44px] py-3 text-terminal underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal">Datenschutz</a>
      </nav>
    </motion.div>
  );
}
