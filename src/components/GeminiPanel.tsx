"use client";

import { useEffect, useState } from "react";
import { Panel } from "./Panel";
import { Sidebar } from "./Sidebar";

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
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Panel title={title}>
          {loading ? (
            <p className="text-[#888] animate-pulse">Establishing uplink...</p>
          ) : (
            <div
              className="text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}
        </Panel>
      </main>
    </div>
  );
}
