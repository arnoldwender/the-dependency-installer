/* Global install counter — ticks up in real time */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { getGlobalCount } from "../utils/counter";

export function GlobalCounter() {
  const [count, setCount] = useState(getGlobalCount);

  /* Tick up every 3-7 seconds by a random amount to feel alive */
  useEffect(() => {
    function tick() {
      setCount(getGlobalCount());
    }

    const interval = setInterval(tick, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="text-center mb-6"
    >
      <div className="inline-flex items-center gap-2 border border-terminal/10 bg-terminal/[0.02] px-4 py-2">
        <Globe className="w-3 h-3 text-terminal/30" />
        <span className="text-[0.6rem] text-terminal/30 tracking-wider">
          <motion.span
            key={count}
            initial={{ opacity: 0.5, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-terminal/60 font-bold inline-block"
          >
            {count.toLocaleString()}
          </motion.span>
          {" "}life packages installed worldwide
        </span>
      </div>
    </motion.div>
  );
}
