"use client";

import { useEffect, useMemo, useState } from "react";
import type { Day } from "@/lib/exercises";
import { getGuidesForWorkout } from "@/lib/exercises";
import { getMuscleStats, getWorkoutText, parseWorkout } from "@/lib/workouts";
import { MuscleRadar } from "./MuscleRadar";
import { NoteForm } from "./NoteForm";
import { Panel } from "./Panel";
import { Sidebar } from "./Sidebar";
import { Stopwatch } from "./Stopwatch";

const DAYS: Day[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export function StrengthPage() {
  const [week, setWeek] = useState(1);
  const [day, setDay] = useState<Day>("Monday");
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [guidesOpen, setGuidesOpen] = useState(false);

  const workoutText = useMemo(() => getWorkoutText(week, day), [week, day]);
  const { header, items } = useMemo(() => parseWorkout(workoutText), [workoutText]);
  const guides = useMemo(() => getGuidesForWorkout(workoutText), [workoutText]);
  const stats = useMemo(() => getMuscleStats(day), [day]);
  const pct =
    items.length === 0 ? 0 : Math.round((checked.size / items.length) * 100);

  useEffect(() => {
    setChecked(new Set());
  }, [week, day]);

  function toggleItem(item: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar>
        <label className="block text-xs text-[#39ff14]/70">SELECT_WEEK:</label>
        <select
          value={week}
          onChange={(e) => setWeek(Number(e.target.value))}
          className="w-full p-2 text-sm"
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((w) => (
            <option key={w} value={w}>
              Week {w}
            </option>
          ))}
        </select>
        <label className="block text-xs text-[#39ff14]/70 mt-2">SELECT_DAY:</label>
        <select
          value={day}
          onChange={(e) => setDay(e.target.value as Day)}
          className="w-full p-2 text-sm"
        >
          {DAYS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </Sidebar>

      <main className="flex-1 p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Stopwatch />
          <Panel title="MUSCLE_ACTIVATION">
            <MuscleRadar stats={stats} />
          </Panel>
        </div>

        <NoteForm week={week} day={day} />

        <Panel title="MISSION_PROGRESS">
          <div className="mb-2 text-[#39ff14]">PROGRESS: {pct}%</div>
          <div className="h-4 w-full bg-[#111] border border-[#333]">
            <div
              className="h-full bg-[#39ff14] transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </Panel>

        <Panel title="TACTICAL_CHECKLIST">
          <h4 className="text-[#39ff14] text-lg mb-4">{header}</h4>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={checked.has(item)}
                  onChange={() => toggleItem(item)}
                  className="mt-1"
                />
                <span className={checked.has(item) ? "line-through opacity-60" : ""}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <div className="box">
          <button
            type="button"
            onClick={() => setGuidesOpen(!guidesOpen)}
            className="box-header w-full text-left cursor-pointer"
          >
            DATA_ARCHIVE (GUIDE) {guidesOpen ? "▼" : "▶"}
          </button>
          {guidesOpen && (
            <div
              className="p-4 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: guides }}
            />
          )}
        </div>
      </main>
    </div>
  );
}
