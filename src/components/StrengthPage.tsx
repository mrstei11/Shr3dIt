"use client";

import { useEffect, useMemo, useState } from "react";
import type { Day } from "@/lib/exercises";
import { getGuidesForWorkout } from "@/lib/exercises";
import { getMuscleStats, getWorkoutText, parseWorkout } from "@/lib/workouts";
import { AppShell } from "./AppShell";
import { MuscleRadar } from "./MuscleRadar";
import { NoteForm } from "./NoteForm";
import { Panel } from "./Panel";
import { Stopwatch } from "./Stopwatch";
import { WeekDayPicker } from "./WeekDayPicker";

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

  const filters = (
    <WeekDayPicker
      week={week}
      day={day}
      onWeekChange={setWeek}
      onDayChange={setDay}
    />
  );

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
    <AppShell sidebarExtra={filters}>
      <div className="space-y-4 sm:space-y-6">
        <div className="box p-3 lg:hidden">{filters}</div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          <Stopwatch />
          <Panel title="MUSCLE_ACTIVATION">
            <MuscleRadar stats={stats} />
          </Panel>
        </div>

        <NoteForm week={week} day={day} />

        <Panel title="MISSION_PROGRESS">
          <div className="mb-2 text-[#39ff14] text-sm sm:text-base">
            PROGRESS: {pct}%
          </div>
          <div className="h-4 w-full bg-[#111] border border-[#333]">
            <div
              className="h-full bg-[#39ff14] transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </Panel>

        <Panel title="TACTICAL_CHECKLIST">
          <h4 className="text-[#39ff14] text-base sm:text-lg mb-3 sm:mb-4 leading-snug">
            {header}
          </h4>
          <ul>
            {items.map((item) => (
              <li key={item} className="checklist-item">
                <input
                  type="checkbox"
                  checked={checked.has(item)}
                  onChange={() => toggleItem(item)}
                  className="mt-0.5"
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
              className="p-3 sm:p-4 text-sm leading-relaxed break-words"
              dangerouslySetInnerHTML={{ __html: guides }}
            />
          )}
        </div>
      </div>
    </AppShell>
  );
}
