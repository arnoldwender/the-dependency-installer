import { useState, useEffect, useCallback } from "react";
import { Header } from "./components/Header";
import { InputBar } from "./components/InputBar";
import { TerminalLog } from "./components/TerminalLog";
import { PackageList } from "./components/PackageList";
import { InstallSummary } from "./components/InstallSummary";
import { IdleState } from "./components/IdleState";
import { Footer } from "./components/Footer";
import { VulnerabilityScan } from "./components/VulnerabilityScan";
import { DependencyTree } from "./components/DependencyTree";
import { LifePackageJson } from "./components/LifePackageJson";
import { NpxCommands } from "./components/NpxCommands";
import { GlobalCounter } from "./components/GlobalCounter";
import { ShareCard } from "./components/ShareCard";
import { SoundToggle } from "./components/SoundToggle";
import { AchievementToast } from "./components/AchievementToast";
import { AchievementList } from "./components/AchievementList";
import { useInstaller } from "./hooks/useInstaller";
import { useAchievements } from "./hooks/useAchievements";

export default function App() {
  const [input, setInput] = useState("");
  const {
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
    install,
    reset,
    toggleSound,
  } = useInstaller();

  const { unlocked, pending, unlock, dismissPending, allAchievements } = useAchievements();

  /* Track total installs across resets for achievements */
  const [lifetimeInstalls, setLifetimeInstalls] = useState(0);
  const [lifetimeVulns, setLifetimeVulns] = useState(0);

  function handleInstall() {
    install(input);
  }

  function handleReset() {
    reset();
    setInput("");
  }

  /* Achievement triggers based on state changes */
  useEffect(() => {
    if (phase !== "done") return;

    const newTotal = lifetimeInstalls + installed.length;
    const newVulns = lifetimeVulns + totalVulns;
    setLifetimeInstalls(newTotal);
    setLifetimeVulns(newVulns);

    /* First Install */
    if (installed.length > 0) {
      unlock("first-install");
    }

    /* Getting Started — 5+ total installs */
    if (newTotal >= 5) {
      unlock("five-installs");
    }

    /* Dependency Hell — 10+ total installs */
    if (newTotal >= 10) {
      unlock("dependency-hell");
    }

    /* npm audit Survivor — 100+ total vulns */
    if (newVulns >= 100) {
      unlock("vulnerability-survivor");
    }

    /* Package Hoarder — 20+ unique installs */
    if (newTotal >= 20) {
      unlock("collector");
    }

    /* Easter Egg Hunter */
    if (triggeredEasterEgg) {
      unlock("easter-egg-hunter");
    }

    /* Feelings easter egg */
    if (input.toLowerCase().includes("feelings")) {
      unlock("feelings-installed");
    }
  }, [phase]);

  /* Callbacks for component-triggered achievements */
  const handleTreeView = useCallback(() => {
    unlock("tree-viewer");
  }, [unlock]);

  const handleNpxRun = useCallback(() => {
    unlock("npx-runner");
  }, [unlock]);

  const handleShareGenerate = useCallback(() => {
    unlock("share-card");
  }, [unlock]);

  const handleJsonEdit = useCallback(() => {
    unlock("json-editor");
  }, [unlock]);

  return (
    <div className="min-h-screen bg-black text-terminal font-mono overflow-hidden relative">
      <div className="scanlines" />
      <div className="vignette" />
      <div className="scanline-moving" />

      {/* Sound toggle — fixed position */}
      <SoundToggle enabled={soundEnabled} onToggle={toggleSound} />

      {/* Achievement toast notification */}
      <AchievementToast
        achievement={pending.length > 0 ? pending[0] : null}
        onDismiss={dismissPending}
      />

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-8 relative z-10">
        <Header />

        {/* Global install counter */}
        <GlobalCounter />

        <InputBar
          input={input}
          setInput={setInput}
          onInstall={handleInstall}
          phase={phase}
        />

        <TerminalLog logs={logs} progress={progress} phase={phase} />

        <PackageList installed={installed} failed={failedPackages} />

        {/* Post-install features — only shown when done */}
        {phase === "done" && (
          <>
            {/* Vulnerability scan */}
            <VulnerabilityScan vulns={vulnScan} totalVulns={totalVulns} />

            {/* Dependency tree */}
            <DependencyTree packageName={input} onView={handleTreeView} />

            {/* Install summary */}
            <InstallSummary
              totalPackages={totalPackages}
              totalVulns={totalVulns}
              onReset={handleReset}
            />

            {/* Share card */}
            <ShareCard
              installed={installed}
              totalVulns={totalVulns}
              totalPackages={totalPackages}
              onGenerate={handleShareGenerate}
            />
          </>
        )}

        {/* Idle state features — shown when not installing */}
        {phase === "idle" && (
          <>
            <IdleState />

            {/* NPX quick commands */}
            <NpxCommands onRun={handleNpxRun} soundEnabled={soundEnabled} />

            {/* Package.json viewer */}
            <LifePackageJson onEdit={handleJsonEdit} />

            {/* Achievements list */}
            <AchievementList allAchievements={allAchievements} unlocked={unlocked} />
          </>
        )}

        <Footer />
      </div>
    </div>
  );
}
