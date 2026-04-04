import { useState } from "react";
import { Header } from "./components/Header";
import { InputBar } from "./components/InputBar";
import { TerminalLog } from "./components/TerminalLog";
import { PackageList } from "./components/PackageList";
import { InstallSummary } from "./components/InstallSummary";
import { IdleState } from "./components/IdleState";
import { Footer } from "./components/Footer";
import { useInstaller } from "./hooks/useInstaller";

export default function App() {
  const [input, setInput] = useState("");
  const { phase, logs, progress, installed, totalPackages, totalVulns, install, reset } =
    useInstaller();

  function handleInstall() {
    install(input);
  }

  function handleReset() {
    reset();
    setInput("");
  }

  return (
    <div className="min-h-screen bg-black text-terminal font-mono overflow-hidden relative">
      <div className="scanlines" />
      <div className="vignette" />
      <div className="scanline-moving" />

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-8 relative z-10">
        <Header />

        <InputBar
          input={input}
          setInput={setInput}
          onInstall={handleInstall}
          phase={phase}
        />

        <TerminalLog logs={logs} progress={progress} phase={phase} />

        <PackageList installed={installed} />

        {phase === "done" && (
          <InstallSummary
            totalPackages={totalPackages}
            totalVulns={totalVulns}
            onReset={handleReset}
          />
        )}

        {phase === "idle" && <IdleState />}

        <Footer />
      </div>
    </div>
  );
}
