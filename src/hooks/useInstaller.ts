import { useState, useRef, useCallback } from "react";
import { LIFE_PACKAGES, type LifePackage } from "../data/packages";
import { INSTALL_MESSAGES, ERROR_MESSAGES } from "../data/messages";

export type Phase = "idle" | "installing" | "done";

export function useInstaller() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [installed, setInstalled] = useState<LifePackage[]>([]);
  const [totalPackages, setTotalPackages] = useState(0);
  const [totalVulns, setTotalVulns] = useState(0);
  const intervalsRef = useRef<number[]>([]);

  const cleanup = useCallback(() => {
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
  }, []);

  const install = useCallback(
    (input: string) => {
      if (!input.trim() || phase === "installing") return;

      cleanup();
      setPhase("installing");
      setLogs([]);
      setProgress(0);
      setInstalled([]);
      setTotalPackages(0);
      setTotalVulns(0);

      const slug = input.toLowerCase().replace(/\s/g, "-");
      const pkg =
        LIFE_PACKAGES.find((p) => p.name.includes(slug)) ||
        LIFE_PACKAGES[Math.floor(Math.random() * LIFE_PACKAGES.length)];

      const allMessages = [
        `> npm install ${slug}`,
        ...INSTALL_MESSAGES,
        ...ERROR_MESSAGES.slice(0, 2),
      ];

      let i = 0;
      const logInterval = window.setInterval(() => {
        if (i < allMessages.length) {
          setLogs((prev) => [...prev, allMessages[i]]);
          setProgress(Math.round(((i + 1) / allMessages.length) * 100));
          i++;
        } else {
          clearInterval(logInterval);

          const shuffled = [...LIFE_PACKAGES]
            .sort(() => 0.5 - Math.random())
            .slice(0, 6);
          const pkgs = [pkg, ...shuffled.filter((p) => p.name !== pkg.name)].slice(0, 7);

          let pi = 0;
          const pkgInterval = window.setInterval(() => {
            if (pi < pkgs.length) {
              const current = pkgs[pi];
              setInstalled((prev) => [...prev, current]);
              setTotalPackages((t) => t + current.deps);
              setTotalVulns((t) => t + current.vulnerabilities);
              pi++;
            } else {
              clearInterval(pkgInterval);
              setPhase("done");
            }
          }, 250);
          intervalsRef.current.push(pkgInterval);
        }
      }, 300);
      intervalsRef.current.push(logInterval);
    },
    [phase, cleanup]
  );

  const reset = useCallback(() => {
    cleanup();
    setPhase("idle");
    setLogs([]);
    setInstalled([]);
    setProgress(0);
    setTotalPackages(0);
    setTotalVulns(0);
  }, [cleanup]);

  return {
    phase,
    logs,
    progress,
    installed,
    totalPackages,
    totalVulns,
    install,
    reset,
  };
}
