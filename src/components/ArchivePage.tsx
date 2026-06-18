"use client";

import { useCallback, useEffect, useState } from "react";
import type { WorkoutNote } from "@/lib/db";
import { AppShell } from "./AppShell";
import { Panel } from "./Panel";

export function ArchivePage() {
  const [notes, setNotes] = useState<WorkoutNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/notes");
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setNotes(data.notes ?? []);
    } catch {
      setError("Could not load archive. Sign in and ensure Postgres is configured.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <AppShell>
      <Panel title="SQL_CENTRAL_INTELLIGENCE">
        <div className="mb-4">
          <button type="button" className="timer-btn w-full sm:w-auto" onClick={load}>
            REFRESH DATA
          </button>
        </div>
        {loading && <p className="text-[#888]">Loading intel...</p>}
        {error && <p className="text-red-400 text-sm sm:text-base">{error}</p>}
        {!loading && !error && (
          <>
            <div className="space-y-3 md:hidden">
              {notes.length === 0 ? (
                <p className="text-[#888] text-center py-4">No notes in archive yet.</p>
              ) : (
                notes.map((n) => (
                  <div
                    key={n.id}
                    className="border border-[#333] bg-[#111] p-3 border-l-4 border-l-[#39ff14]"
                  >
                    <div className="text-xs text-[#888] mb-2">
                      {new Date(n.timestamp).toLocaleString()} · WK {n.week} ·{" "}
                      {n.day}
                    </div>
                    <p className="text-sm break-words">{n.note}</p>
                  </div>
                ))
              )}
            </div>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-[#333] text-[#39ff14]">
                    <th className="p-2 text-left">TIME</th>
                    <th className="p-2 text-left">WK</th>
                    <th className="p-2 text-left">DAY</th>
                    <th className="p-2 text-left">INTEL</th>
                  </tr>
                </thead>
                <tbody>
                  {notes.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-4 text-[#888] text-center">
                        No notes in archive yet.
                      </td>
                    </tr>
                  ) : (
                    notes.map((n) => (
                      <tr key={n.id} className="border-b border-[#222]">
                        <td className="p-2 whitespace-nowrap">
                          {new Date(n.timestamp).toLocaleString()}
                        </td>
                        <td className="p-2">{n.week}</td>
                        <td className="p-2">{n.day}</td>
                        <td className="p-2 break-words">{n.note}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Panel>
    </AppShell>
  );
}
