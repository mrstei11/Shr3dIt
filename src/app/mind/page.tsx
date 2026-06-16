import { GeminiPanel } from "@/components/GeminiPanel";

export default function MindRoute() {
  return (
    <GeminiPanel
      title="INTELLECT_UPLINK"
      prompt="Tell me one concise lesson from History or Physics. Use HTML <b> tags. Tone: Professor."
    />
  );
}
