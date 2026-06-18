"use client";

import { useState } from "react";
import { Panel } from "./Panel";

export function NoteForm({
  week,
  day,
  onSaved,
}: {
  week: number;
  day: string;
  onSaved?: () => void;
}) {
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!note.trim()) return;
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ week, day, note: note.trim() }),
      });
      if (!res.ok) throw new Error("Save failed");
      setNote("");
      setStatus("DATA SECURED — note uploaded to archive.");
      onSaved?.();
    } catch {
      setStatus("Upload failed. Check Postgres connection.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Panel title="COMMS_LOG (ADD NOTE)">
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Input tactical feedback or PRs..."
        rows={3}
        className="w-full p-2"
      />
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <button
          type="button"
          className="timer-btn w-full sm:w-auto"
          onClick={handleSave}
          disabled={saving || !note.trim()}
        >
          {saving ? "UPLOADING..." : "UPLOAD TO ARCHIVE"}
        </button>
        {status && (
          <span className="text-sm text-[#39ff14]/80">{status}</span>
        )}
      </div>
    </Panel>
  );
}
