"use client";

import { useEffect, useState } from "react";
import { AppShell } from "./AppShell";
import { Panel } from "./Panel";

export function GeminiPanel({
  title,
  prompt,
}: {
  title: string;
  prompt: string;
}) {
  const [html, setHtml] = useState("STANDING BY...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setHtml(data.text ?? "No response.");
      })
      .catch(() => {
        if (!cancelled) setHtml("<span style='color:red;'>Uplink failed.</span>");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [prompt]);

  return (
    <AppShell>
      <Panel title={title}>
        {loading ? (
          <p className="text-[#888] animate-pulse text-sm sm:text-base">
            Establishing uplink...
          </p>
        ) : (
          <div
            className="text-base sm:text-lg leading-relaxed break-words"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </Panel>
    </AppShell>
  );
}
