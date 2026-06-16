"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

interface MuscleStats {
  LEGS: number;
  CHEST: number;
  BACK: number;
  SHOULDERS: number;
  ARMS: number;
  CORE: number;
}

export function MuscleRadar({ stats }: { stats: MuscleStats }) {
  const data = Object.entries(stats).map(([muscle, value]) => ({
    muscle,
    value,
    fullMark: 10,
  }));

  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="#333" />
          <PolarAngleAxis
            dataKey="muscle"
            tick={{ fill: "#39ff14", fontSize: 11, fontFamily: "Share Tech Mono" }}
          />
          <Radar
            name="Activation"
            dataKey="value"
            stroke="#39ff14"
            fill="#39ff14"
            fillOpacity={0.4}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
