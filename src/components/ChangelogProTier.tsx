/* Fake changelog + Pro tier upgrade section (Premium) */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Sparkles, Check, Terminal, CreditCard } from "lucide-react";
import { CHANGELOG, PRO_TIERS, type ChangelogEntry } from "../data/changelog";

/* Badge colors for changelog entry types */
const TYPE_STYLES: Record<string, string> = {
  feature: "text-terminal bg-terminal/10 border-terminal/30",
  fix: "text-cyan-500 bg-cyan-500/10 border-cyan-500/30",
  breaking: "text-red-500 bg-red-500/10 border-red-500/30",
  deprecated: "text-amber-500 bg-amber-500/10 border-amber-500/30",
};

const TYPE_LABELS: Record<string, string> = {
  feature: "FEAT",
  fix: "FIX",
  breaking: "BREAK",
  deprecated: "DEPR",
};

/* Purchase failure messages — rotates on each click */
const PURCHASE_FAILURES = [
  "Error: Card declined. Reason: insufficient purpose.",
  "Error: Payment gateway rejected by existential firewall.",
  "Error: Transaction failed. npm ERR! 402 Payment Required (emotionally).",
  "Error: Your bank called. They're concerned about you.",
  "Error: Subscription requires stable internet AND stable mental health.",
  "Error: PayPal account suspended for suspicious optimism.",
];

/* Single changelog entry row */
function ChangelogRow({ entry, index }: { entry: ChangelogEntry; index: number }) {
  const style = TYPE_STYLES[entry.type] || TYPE_STYLES.feature;
  const label = TYPE_LABELS[entry.type] || "MISC";

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="flex items-start gap-3 py-2 border-b border-terminal/5 last:border-0"
    >
      {/* Type badge */}
      <span className={`inline-block px-1.5 py-0.5 text-[0.45rem] tracking-wider border flex-shrink-0 ${style}`}>
        {label}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="text-[0.58rem] text-terminal/60 leading-relaxed">
          {entry.message}
        </div>
      </div>

      {/* Version + date */}
      <div className="flex-shrink-0 text-right">
        <div className="text-[0.5rem] text-terminal/40">{entry.version}</div>
        <div className="text-[0.45rem] text-terminal/20">{entry.date}</div>
      </div>
    </motion.div>
  );
}

export function ChangelogProTier() {
  const [activeTab, setActiveTab] = useState<"changelog" | "pro">("changelog");
  const [isOpen, setIsOpen] = useState(false);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const [purchaseAttempts, setPurchaseAttempts] = useState(0);
  const [purchasing, setPurchasing] = useState(false);

  /* Handle fake purchase attempt — always fails with escalating messages */
  function handlePurchase(tierName: string) {
    if (tierName === "Free Tier") return;
    setPurchasing(true);
    setPurchaseError(null);

    setTimeout(() => {
      setPurchasing(false);
      setPurchaseError(PURCHASE_FAILURES[purchaseAttempts % PURCHASE_FAILURES.length]);
      setPurchaseAttempts((prev) => prev + 1);
    }, 1800);
  }

  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[0.62rem] tracking-[3px] text-terminal/45
                   hover:text-terminal/70 transition-colors mb-2"
      >
        <FileText className="w-3 h-3" />
        {isOpen ? "HIDE" : "VIEW"} CHANGELOG & PRO TIER
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
              {/* Tab bar */}
              <div className="flex border-b border-terminal/10">
                <button
                  type="button"
                  onClick={() => setActiveTab("changelog")}
                  className={`flex-1 px-3 py-2 text-[0.55rem] tracking-wider transition-colors
                             ${activeTab === "changelog"
                               ? "text-terminal/70 border-b-2 border-terminal/50 bg-terminal/[0.03]"
                               : "text-terminal/30 hover:text-terminal/50"
                             }`}
                >
                  CHANGELOG
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("pro")}
                  className={`flex-1 px-3 py-2 text-[0.55rem] tracking-wider transition-colors flex items-center justify-center gap-1.5
                             ${activeTab === "pro"
                               ? "text-amber-500/70 border-b-2 border-amber-500/50 bg-amber-500/[0.03]"
                               : "text-terminal/30 hover:text-terminal/50"
                             }`}
                >
                  <Sparkles className="w-3 h-3" />
                  PRO TIER
                </button>
              </div>

              {/* Content */}
              <div className="p-3">
                {activeTab === "changelog" ? (
                  /* Changelog entries */
                  <div className="max-h-[400px] overflow-y-auto">
                    <div className="text-[0.5rem] text-terminal/25 tracking-wider mb-2">
                      LIFE PACKAGE MANAGER -- RELEASE NOTES
                    </div>

                    {/* npm install command header */}
                    <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-terminal/10">
                      <Terminal className="w-3 h-3 text-terminal/30" />
                      <span className="text-[0.5rem] text-terminal/35">
                        $ npm changelog life-package-manager --format=existential
                      </span>
                    </div>

                    {CHANGELOG.map((entry, i) => (
                      <ChangelogRow key={entry.version + entry.date} entry={entry} index={i} />
                    ))}

                    <div className="text-[0.45rem] text-terminal/15 mt-3 text-center">
                      ... 847 earlier versions omitted (mostly bug fixes for 'being alive')
                    </div>
                    <div className="text-[0.42rem] text-terminal/10 mt-1 text-center">
                      Full changelog: https://github.com/universe/life/blob/main/CHANGELOG.md (404)
                    </div>
                  </div>
                ) : (
                  /* Pro tier pricing cards */
                  <div>
                    <div className="text-[0.5rem] text-terminal/25 tracking-wider mb-2">
                      ENTERPRISE LIFE PACKAGE MANAGER
                    </div>
                    <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-terminal/10">
                      <Terminal className="w-3 h-3 text-terminal/30" />
                      <span className="text-[0.5rem] text-terminal/35">
                        $ npm install will-to-live@enterprise
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {PRO_TIERS.map((tier, i) => (
                        <motion.div
                          key={tier.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className={`border p-3 relative
                                     ${tier.popular
                                       ? "border-amber-500/30 bg-amber-500/[0.03]"
                                       : "border-terminal/10 bg-terminal/[0.02]"
                                     }`}
                        >
                          {/* Popular badge */}
                          {tier.popular && (
                            <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 px-2 py-0.5
                                            bg-amber-500 text-black text-[0.4rem] tracking-wider font-bold">
                              POPULAR
                            </div>
                          )}

                          {/* Tier name */}
                          <div className={`text-[0.55rem] tracking-wider mb-2 mt-1
                                          ${tier.popular ? "text-amber-500/80" : "text-terminal/50"}`}>
                            {tier.name.toUpperCase()}
                          </div>

                          {/* Price */}
                          <div className="mb-3">
                            <span className={`text-lg font-bold ${tier.popular ? "text-amber-500" : "text-terminal/70"}`}>
                              {tier.price}
                            </span>
                            <span className="text-[0.45rem] text-terminal/30">{tier.period}</span>
                          </div>

                          {/* Features */}
                          <div className="space-y-1.5 mb-3">
                            {tier.features.map((feature, fi) => (
                              <div key={fi} className="flex items-start gap-1.5 text-[0.48rem] text-terminal/40">
                                <Check className="w-2.5 h-2.5 flex-shrink-0 mt-0.5 text-terminal/25" />
                                {feature}
                              </div>
                            ))}
                          </div>

                          {/* CTA button — always fails on click */}
                          <button
                            type="button"
                            onClick={() => handlePurchase(tier.name)}
                            disabled={tier.name === "Free Tier" || purchasing}
                            className={`w-full py-1.5 text-[0.5rem] tracking-wider border transition-colors
                                       ${tier.popular
                                         ? "border-amber-500/40 text-amber-500/70 hover:bg-amber-500/10"
                                         : "border-terminal/15 text-terminal/35 hover:bg-terminal/[0.05]"
                                       }
                                       ${tier.name === "Free Tier" ? "cursor-default opacity-50" : "cursor-pointer"}
                                       disabled:opacity-40`}
                          >
                            {purchasing && tier.name !== "Free Tier" ? (
                              <span className="animate-pulse">Processing...</span>
                            ) : (
                              tier.cta
                            )}
                          </button>
                        </motion.div>
                      ))}
                    </div>

                    {/* Purchase error message — shown after failed attempt */}
                    <AnimatePresence>
                      {purchaseError && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-3 border border-red-500/20 bg-red-500/[0.03] p-2"
                        >
                          <div className="flex items-start gap-1.5">
                            <CreditCard className="w-3 h-3 text-red-500/50 flex-shrink-0 mt-0.5" />
                            <div className="text-[0.5rem] text-red-500/50 leading-relaxed">
                              {purchaseError}
                            </div>
                          </div>
                          {purchaseAttempts >= 3 && (
                            <div className="text-[0.42rem] text-red-500/25 mt-1.5 pl-4">
                              Attempts: {purchaseAttempts} | Suggestion: npm install acceptance --save
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="text-[0.45rem] text-terminal/15 mt-3 text-center">
                      * All plans include unlimited existential dread at no extra cost
                    </div>
                    <div className="text-[0.42rem] text-terminal/10 mt-1 text-center">
                      Billing: your soul | Refund policy: npm uninstall regret (not found)
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
