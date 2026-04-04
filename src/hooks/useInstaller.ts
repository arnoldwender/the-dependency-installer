import { useState, useRef, useCallback } from "react";
import {
  LIFE_PACKAGES,
  EASTER_EGGS,
  INSTALL_FAILURES,
  VULNERABILITY_SCAN,
  type LifePackage,
  type VulnEntry,
} from "../data/packages";
import { INSTALL_MESSAGES, ERROR_MESSAGES } from "../data/messages";
import { playTypeSound, playSuccessChime, playErrorBuzz, playWarningBeep } from "../utils/sounds";
import { fireTerminalConfetti } from "../utils/confetti";
import { incrementLocalCount } from "../utils/counter";

export type Phase = "idle" | "installing" | "done";

export function useInstaller() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [installed, setInstalled] = useState<LifePackage[]>([]);
  const [totalPackages, setTotalPackages] = useState(0);
  const [totalVulns, setTotalVulns] = useState(0);
  const [vulnScan, setVulnScan] = useState<VulnEntry[]>([]);
  const [failedPackages, setFailedPackages] = useState<LifePackage[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [triggeredEasterEgg, setTriggeredEasterEgg] = useState(false);
  const intervalsRef = useRef<number[]>([]);
  const timeoutsRef = useRef<number[]>([]);
  const startTimeRef = useRef<number>(0);
  const installCountRef = useRef(0);

  const cleanup = useCallback(() => {
    intervalsRef.current.forEach(clearInterval);
    timeoutsRef.current.forEach(clearTimeout);
    intervalsRef.current = [];
    timeoutsRef.current = [];
  }, []);

  const addLog = useCallback((msg: string) => {
    setLogs((prev) => [...prev, msg]);
  }, []);

  const install = useCallback(
    (input: string) => {
      if (!input.trim() || phase === "installing") return;

      cleanup();
      setPhase("installing");
      setLogs([]);
      setProgress(0);
      setInstalled([]);
      setFailedPackages([]);
      setTotalPackages(0);
      setTotalVulns(0);
      setVulnScan([]);
      setTriggeredEasterEgg(false);
      startTimeRef.current = Date.now();

      const slug = input.toLowerCase().replace(/\s/g, "-");

      /* Check for easter eggs first */
      const easterEgg = EASTER_EGGS.find((e) => slug.includes(e.trigger));

      if (easterEgg) {
        setTriggeredEasterEgg(true);
        let i = 0;
        const eggInterval = window.setInterval(() => {
          if (i < easterEgg.messages.length) {
            setLogs((prev) => [...prev, easterEgg.messages[i]]);
            setProgress(Math.round(((i + 1) / easterEgg.messages.length) * 100));
            if (soundEnabled) playTypeSound();
            i++;
          } else {
            clearInterval(eggInterval);

            if (easterEgg.type === "long-fail") {
              /* Motivation easter egg — fails at the end */
              if (soundEnabled) playErrorBuzz();
              setPhase("done");
              setVulnScan(shuffleArray(VULNERABILITY_SCAN).slice(0, 3));
              return;
            }

            /* Feelings easter egg — continue with regular install but with the special messages already shown */
            const shuffled = [...LIFE_PACKAGES].sort(() => 0.5 - Math.random()).slice(0, 6);
            const feelingsPkg = LIFE_PACKAGES.find((p) => p.name === "feelings") || LIFE_PACKAGES[0];
            const pkgs = [feelingsPkg, ...shuffled.filter((p) => p.name !== feelingsPkg.name)].slice(0, 7);

            finishInstall(pkgs);
          }
        }, 350);
        intervalsRef.current.push(eggInterval);
        return;
      }

      /* Normal install flow */
      const pkg =
        LIFE_PACKAGES.find((p) => p.name.includes(slug)) ||
        LIFE_PACKAGES[Math.floor(Math.random() * LIFE_PACKAGES.length)];

      /* Build message sequence with occasional random failures */
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
          if (soundEnabled) playTypeSound();
          i++;
        } else {
          clearInterval(logInterval);

          /* Select packages to "install" — some may randomly fail */
          const shuffled = [...LIFE_PACKAGES].sort(() => 0.5 - Math.random()).slice(0, 8);
          const pkgs = [pkg, ...shuffled.filter((p) => p.name !== pkg.name)].slice(0, 7);

          finishInstall(pkgs);
        }
      }, 250);
      intervalsRef.current.push(logInterval);
    },
    [phase, cleanup, soundEnabled]
  );

  /* Shared logic to reveal packages one by one and finish */
  function finishInstall(pkgs: LifePackage[]) {
    let pi = 0;
    const failed: LifePackage[] = [];

    const pkgInterval = window.setInterval(() => {
      if (pi < pkgs.length) {
        const current = pkgs[pi];

        /* 20% chance of install failure for extra humor */
        const failure = Math.random() < 0.2
          ? INSTALL_FAILURES[Math.floor(Math.random() * INSTALL_FAILURES.length)]
          : null;

        if (failure) {
          const failedPkg: LifePackage = {
            ...current,
            failed: true,
            failReason: failure.error,
          };
          failed.push(failedPkg);
          setFailedPackages((prev) => [...prev, failedPkg]);
          addLog(`npm ERR! ${current.name}: ${failure.error}`);
          if (soundEnabled) playErrorBuzz();
        } else {
          setInstalled((prev) => [...prev, current]);
          setTotalPackages((t) => t + current.deps);
          setTotalVulns((t) => t + current.vulnerabilities);
          if (soundEnabled) playTypeSound();
        }

        pi++;
      } else {
        clearInterval(pkgInterval);

        /* Generate vulnerability scan results */
        const vulnCount = 4 + Math.floor(Math.random() * 6);
        const vulns = shuffleArray(VULNERABILITY_SCAN).slice(0, vulnCount);
        setVulnScan(vulns);

        /* Increment global counter */
        installCountRef.current += pkgs.length - failed.length;
        incrementLocalCount(pkgs.length - failed.length);

        /* Fire confetti and success sound */
        if (soundEnabled) playSuccessChime();
        fireTerminalConfetti();

        setPhase("done");
      }
    }, 250);
    intervalsRef.current.push(pkgInterval);
  }

  const reset = useCallback(() => {
    cleanup();
    setPhase("idle");
    setLogs([]);
    setInstalled([]);
    setFailedPackages([]);
    setProgress(0);
    setTotalPackages(0);
    setTotalVulns(0);
    setVulnScan([]);
    setTriggeredEasterEgg(false);
  }, [cleanup]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  return {
    phase,
    logs,
    progress,
    installed,
    failedPackages,
    totalPackages,
    totalVulns,
    vulnScan,
    soundEnabled,
    triggeredEasterEgg,
    startTime: startTimeRef.current,
    installCount: installCountRef.current,
    install,
    reset,
    toggleSound,
  };
}

/* Fisher-Yates shuffle */
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
