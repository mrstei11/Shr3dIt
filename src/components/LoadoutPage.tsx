"use client";

import { useMemo, useState } from "react";
import { EXERCISES, stripGuideTitle } from "@/lib/exercises";
import { AppShell } from "./AppShell";
import { Panel } from "./Panel";

function tierClass(difficulty: string) {
  if (difficulty === "TIER I") return "tier-i";
  if (difficulty === "TIER II") return "tier-ii";
  return "tier-iii";
}

export function LoadoutPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return EXERCISES;
    return EXERCISES.filter(
      (ex) =>
        ex.name.toLowerCase().includes(q) ||
        ex.muscleGroup.toLowerCase().includes(q) ||
        ex.difficulty.toLowerCase().includes(q)
    );
  }, [search]);

  const selectedExercises = EXERCISES.filter((ex) => selected.has(ex.name));

  function toggle(name: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  return (
    <AppShell>
      <div className="space-y-4 sm:space-y-6">
        <Panel title="ACTIVE_MISSION_QUEUE">
          <h4 className="text-[#39ff14] mb-3 text-sm sm:text-base">
            OPERATOR SELECTIONS:
          </h4>
          {selectedExercises.length === 0 ? (
            <p className="text-[#888] italic text-sm sm:text-base">
              Select exercises from the Armory below to build your custom op.
            </p>
          ) : (
            <div className="space-y-2">
              {selectedExercises.map((ex) => (
                <div
                  key={ex.name}
                  className="border border-[#333] bg-[#111] p-3 border-l-4 border-l-[#39ff14]"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-start sm:gap-4">
                    <b className="text-base sm:text-lg text-white">{ex.name}</b>
                    <span className="text-[#888] text-xs sm:text-sm">
                      {ex.muscleGroup} {"//"}{" "}
                      <span className={tierClass(ex.difficulty)}>
                        {ex.difficulty}
                      </span>
                    </span>
                  </div>
                  <p
                    className="text-sm text-[#aaa] mt-1 break-words"
                    dangerouslySetInnerHTML={{
                      __html: stripGuideTitle(ex.guide),
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </Panel>

        <Panel title="EXERCISE_ARMORY">
          <input
            type="search"
            placeholder="Search exercises..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2.5 mb-4 text-sm"
          />

          <div className="space-y-2 md:hidden">
            {filtered.map((ex) => (
              <button
                key={ex.name}
                type="button"
                onClick={() => toggle(ex.name)}
                className={`w-full text-left border p-3 transition-colors ${
                  selected.has(ex.name)
                    ? "border-[#39ff14] bg-[#111]"
                    : "border-[#333] bg-[#0a0a0a]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selected.has(ex.name)}
                    onChange={() => toggle(ex.name)}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-0.5"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-white">{ex.name}</div>
                    <div className="text-xs text-[#888] mt-1">
                      {ex.muscleGroup} {"//"}{" "}
                      <span className={tierClass(ex.difficulty)}>
                        {ex.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#333] text-[#39ff14]">
                  <th className="p-2 text-left w-8" />
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Muscle_Group</th>
                  <th className="p-2 text-left">Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((ex) => (
                  <tr
                    key={ex.name}
                    className="border-b border-[#222] hover:bg-[#111] cursor-pointer"
                    onClick={() => toggle(ex.name)}
                  >
                    <td className="p-2">
                      <input
                        type="checkbox"
                        checked={selected.has(ex.name)}
                        onChange={() => toggle(ex.name)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td className="p-2">{ex.name}</td>
                    <td className="p-2">{ex.muscleGroup}</td>
                    <td className={`p-2 ${tierClass(ex.difficulty)}`}>
                      {ex.difficulty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
