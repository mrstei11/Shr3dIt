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
  const [formError, setFormError] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!note.trim()) return;
    setSaving(true);
    setStatusMsg(null);
    setFormError(null);
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ week, day, note: note.trim() }),
      });
      if (res.status === 401) {
        setFormError("Session expired. Please sign in again.");
        return;
      }
      if (!res.ok) throw new Error("Save failed");
      setNote("");
      setStatusMsg("DATA SECURED — note uploaded to your archive.");
      onSaved?.();
    } catch {
      setFormError("Upload failed. Check Postgres connection.");
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
        {statusMsg && (
          <span className="text-sm text-[#39ff14]/80">{statusMsg}</span>
        )}
        {formError && (
          <span className="text-sm text-red-400">{formError}</span>
        )}
      </div>
    </Panel>
  );
}
