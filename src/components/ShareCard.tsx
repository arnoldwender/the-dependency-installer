/* Share card — generates a shareable image of your life dependencies */
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Download, Check } from "lucide-react";
import html2canvas from "html2canvas";
import type { LifePackage } from "../data/packages";

interface ShareCardProps {
  installed: LifePackage[];
  totalVulns: number;
  totalPackages: number;
  onGenerate?: () => void;
}

export function ShareCard({ installed, totalVulns, totalPackages, onGenerate }: ShareCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  async function generateCard() {
    if (!cardRef.current) return;
    setIsGenerating(true);
    if (onGenerate) onGenerate();

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#000000",
        scale: 2,
      });
      const url = canvas.toDataURL("image/png");
      setImageUrl(url);
    } catch {
      /* html2canvas failed — silently handle */
    }
    setIsGenerating(false);
  }

  function downloadCard() {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.download = "my-life-dependencies.png";
    link.href = imageUrl;
    link.click();
  }

  async function shareCard() {
    if (!imageUrl) return;

    const text = `My Life Dependencies:\n${installed.map((p) => `- ${p.name}@${p.version}`).join("\n")}\n\n${totalVulns} vulnerabilities found. ${totalPackages} packages installed.\n\nnpminstall.life`;

    if (navigator.share) {
      try {
        await navigator.share({ text });
        return;
      } catch {
        /* Share cancelled or failed */
      }
    }

    /* Fallback — copy text to clipboard */
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (installed.length === 0) return null;

  return (
    <div className="mb-6">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen && !imageUrl) generateCard();
        }}
        className="flex items-center gap-2 text-[0.62rem] tracking-[3px] text-terminal/45
                   hover:text-terminal/70 transition-colors mb-2"
      >
        <Share2 className="w-3 h-3" />
        {isOpen ? "HIDE" : "GENERATE"} SHARE CARD
      </button>

      {/* Hidden card template for html2canvas */}
      <div className="fixed -left-[9999px] top-0">
        <div
          ref={cardRef}
          className="w-[600px] p-8 font-mono"
          style={{ backgroundColor: "#000000", color: "#00ff41" }}
        >
          <div style={{ fontSize: "10px", letterSpacing: "4px", opacity: 0.4, marginBottom: "8px" }}>
            MY LIFE DEPENDENCIES
          </div>
          <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", textShadow: "0 0 20px #00ff41" }}>
            npm install life
          </div>
          <div style={{ borderTop: "1px solid rgba(0,255,65,0.2)", paddingTop: "12px", marginBottom: "12px" }}>
            {installed.slice(0, 8).map((pkg, i) => (
              <div key={i} style={{ fontSize: "13px", padding: "4px 0", opacity: 0.7, display: "flex", justifyContent: "space-between" }}>
                <span>{pkg.name}@{pkg.version}</span>
                <span style={{ opacity: 0.4 }}>{pkg.size}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(0,255,65,0.2)", paddingTop: "12px", fontSize: "12px" }}>
            <div style={{ color: "#ef4444", marginBottom: "4px" }}>
              {totalVulns} vulnerabilities found ({Math.floor(totalVulns * 0.6)} critical)
            </div>
            <div style={{ opacity: 0.4 }}>
              {totalPackages.toLocaleString()} packages | estimated audit time: 47 years
            </div>
          </div>
          <div style={{ marginTop: "16px", fontSize: "10px", opacity: 0.25, letterSpacing: "2px" }}>
            npminstall.life -- BUILT BY ARNOLD WENDER
          </div>
        </div>
      </div>

      {/* Visible share panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border border-terminal/15 bg-terminal/[0.02] p-4">
              {isGenerating ? (
                <div className="text-center text-[0.6rem] text-terminal/40 py-4">
                  Generating share card...
                </div>
              ) : imageUrl ? (
                <>
                  <img
                    src={imageUrl}
                    alt="Your Life Dependencies share card"
                    className="w-full border border-terminal/10 mb-3"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={downloadCard}
                      className="flex-1 flex items-center justify-center gap-2 border border-terminal/20
                                 text-terminal/50 text-[0.6rem] py-2 hover:bg-terminal/[0.05]
                                 hover:text-terminal/70 transition-all"
                    >
                      <Download className="w-3 h-3" />
                      DOWNLOAD
                    </button>
                    <button
                      onClick={shareCard}
                      className="flex-1 flex items-center justify-center gap-2 border border-terminal/20
                                 text-terminal/50 text-[0.6rem] py-2 hover:bg-terminal/[0.05]
                                 hover:text-terminal/70 transition-all"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3" />
                          COPIED!
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3 h-3" />
                          SHARE
                        </>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center text-[0.6rem] text-terminal/40 py-4">
                  Failed to generate card. Try again.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
