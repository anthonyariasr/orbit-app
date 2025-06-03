"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/components/AuthGuard";

// Duration constants in seconds
const WORK_DURATION = 25 * 60; // 25 minutes
const BREAK_DURATION = 5 * 60; // 5 minutes

export default function PomodoroPage() {
  // Timer state
  const [secondsLeft, setSecondsLeft] = useState(WORK_DURATION);
  const [isRunning, setIsRunning] = useState(false); // Whether the timer is currently running
  const [isBreak, setIsBreak] = useState(false); // Whether we're in a break session

  // Timer effect: handles countdown and session switching
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval!); // Stop timer
            setIsRunning(false); // Pause
            setIsBreak((prevBreak) => !prevBreak); // Toggle session
            // Restart with appropriate duration
            return isBreak ? WORK_DURATION : BREAK_DURATION;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Clear interval when timer is paused or component unmounts
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isBreak]);

  // Format seconds as MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (

      <div className="relative min-h-screen overflow-hidden">
        {/* Background video (YouTube URLs don't work here) */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="/videos/bg-pomodoro.mp4"
          autoPlay
          loop
          muted
        />

        {/* Overlay to darken background for better readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] z-10" />

        {/* Foreground content */}
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-white">
          {/* Session title */}
          <h1 className="text-3xl font-bold mb-4 text-center">
            {isBreak ? "Descanso" : "Tiempo de Concentración"}
          </h1>

          {/* Timer display */}
          <div className="text-6xl font-mono mb-6">
            {formatTime(secondsLeft)}
          </div>

          {/* Control buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-2xl shadow hover:bg-indigo-700 transition cursor-pointer"
            >
              {isRunning ? "Pause" : "Start"}
            </button>

            <button
              onClick={() => {
                setIsRunning(false);
                setSecondsLeft(isBreak ? BREAK_DURATION : WORK_DURATION);
              }}
              className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-2xl hover:bg-indigo-100 transition cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

  );
}
