/* Editable package.json of life — shows your life's config */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileJson, Copy, Check } from "lucide-react";
import { LIFE_PACKAGE_JSON } from "../data/packages";

interface LifePackageJsonProps {
  onEdit?: () => void;
}

export function LifePackageJson({ onEdit }: LifePackageJsonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [jsonContent, setJsonContent] = useState(() =>
    JSON.stringify(LIFE_PACKAGE_JSON, null, 2)
  );
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(jsonContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleEdit(value: string) {
    setJsonContent(value);
    if (onEdit) onEdit();
  }

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[0.62rem] tracking-[3px] text-terminal/45
                   hover:text-terminal/70 transition-colors mb-2"
      >
        <FileJson className="w-3 h-3" />
        {isOpen ? "HIDE" : "VIEW"} YOUR LIFE'S PACKAGE.JSON
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
            <div className="border border-terminal/15 bg-[#010a01] relative">
              {/* Toolbar */}
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-terminal/10">
                <span className="text-[0.55rem] text-terminal/30 tracking-wider">
                  ~/life/package.json
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-[0.55rem] text-terminal/40 hover:text-terminal/70 transition-colors"
                  >
                    {isEditing ? "LOCK" : "EDIT"}
                  </button>
                  <button
                    onClick={handleCopy}
                    className="text-terminal/40 hover:text-terminal/70 transition-colors"
                  >
                    {copied ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>

              {/* JSON content */}
              {isEditing ? (
                <textarea
                  value={jsonContent}
                  onChange={(e) => handleEdit(e.target.value)}
                  className="w-full bg-transparent text-terminal/70 font-mono text-[0.6rem]
                             leading-[1.8] p-3 outline-none resize-none min-h-[300px]
                             caret-terminal"
                  spellCheck={false}
                />
              ) : (
                <pre className="p-3 text-[0.6rem] leading-[1.8] max-h-[400px] overflow-y-auto">
                  {jsonContent.split("\n").map((line, i) => (
                    <div key={i} className="flex">
                      <span className="text-terminal/15 w-8 text-right mr-3 select-none flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-terminal/60">
                        {colorizeJson(line)}
                      </span>
                    </div>
                  ))}
                </pre>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Simple JSON syntax highlighting via spans */
function colorizeJson(line: string): JSX.Element {
  /* Match JSON keys, string values, numbers, booleans */
  const parts: JSX.Element[] = [];
  let remaining = line;
  let key = 0;

  /* Keys (before colon) */
  const keyMatch = remaining.match(/^(\s*)"([^"]+)"(\s*:)/);
  if (keyMatch) {
    parts.push(<span key={key++}>{keyMatch[1]}</span>);
    parts.push(
      <span key={key++} className="text-terminal/80">
        "{keyMatch[2]}"
      </span>
    );
    parts.push(<span key={key++}>{keyMatch[3]}</span>);
    remaining = remaining.slice(keyMatch[0].length);
  }

  /* String values */
  const strMatch = remaining.match(/^(\s*)"([^"]*)"(.*)/);
  if (strMatch) {
    parts.push(<span key={key++}>{strMatch[1]}</span>);
    parts.push(
      <span key={key++} className="text-amber-500/70">
        "{strMatch[2]}"
      </span>
    );
    parts.push(<span key={key++} className="text-terminal/40">{strMatch[3]}</span>);
    return <>{parts}</>;
  }

  /* Anything else (brackets, commas) */
  if (remaining) {
    parts.push(
      <span key={key++} className="text-terminal/40">
        {remaining}
      </span>
    );
  }

  return <>{parts}</>;
}
