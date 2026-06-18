"use client";

import { useEffect, useRef, useState } from "react";

export function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  const display = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;

  return (
    <div
      id="stopwatch-container"
      className="border-2 border-[#39ff14] bg-black p-4 sm:p-5 text-center"
    >
      <div
        id="timer-display"
        className="text-5xl sm:text-6xl text-[#39ff14] drop-shadow-[0_0_10px_#39ff14] tabular-nums"
      >
        {display}
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <button type="button" className="timer-btn flex-1 min-w-[5.5rem] sm:flex-none" onClick={() => setRunning(true)}>
          INITIATE
        </button>
        <button type="button" className="timer-btn flex-1 min-w-[5.5rem] sm:flex-none" onClick={() => setRunning(false)}>
          HALT
        </button>
        <button
          type="button"
          className="timer-btn flex-1 min-w-[5.5rem] sm:flex-none"
          onClick={() => {
            setRunning(false);
            setSeconds(0);
          }}
        >
          WIPE
        </button>
      </div>
    </div>
  );
}
