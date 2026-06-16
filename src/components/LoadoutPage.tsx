"use client";

import { useMemo, useState } from "react";
import { EXERCISES, stripGuideTitle } from "@/lib/exercises";
import { Panel } from "./Panel";
import { Sidebar } from "./Sidebar";

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
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        <Panel title="ACTIVE_MISSION_QUEUE">
          <h4 className="text-[#39ff14] mb-3">OPERATOR SELECTIONS:</h4>
          {selectedExercises.length === 0 ? (
            <p className="text-[#888] italic">
              Select exercises from the Armory below to build your custom op.
            </p>
          ) : (
            <div className="space-y-2">
              {selectedExercises.map((ex) => (
                <div
                  key={ex.name}
                  className="border border-[#333] bg-[#111] p-3 border-l-4 border-l-[#39ff14]"
                >
                  <div className="flex justify-between items-start gap-4">
                    <b className="text-lg text-white">{ex.name}</b>
                    <span className="text-[#888] text-sm shrink-0">
                      {ex.muscleGroup} {"//"}{" "}
                      <span className={tierClass(ex.difficulty)}>
                        {ex.difficulty}
                      </span>
                    </span>
                  </div>
                  <p
                    className="text-sm text-[#aaa] mt-1"
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
            className="w-full p-2 mb-4 text-sm"
          />
          <div className="overflow-x-auto">
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
      </main>
    </div>
  );
}
