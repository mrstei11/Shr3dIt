import type { Day } from "@/lib/exercises";

const DAYS: Day[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export function WeekDayPicker({
  week,
  day,
  onWeekChange,
  onDayChange,
}: {
  week: number;
  day: Day;
  onWeekChange: (week: number) => void;
  onDayChange: (day: Day) => void;
}) {
  return (
    <div className="space-y-3">
      <label className="block text-xs text-[#39ff14]/70">SELECT_WEEK:</label>
      <select
        value={week}
        onChange={(e) => onWeekChange(Number(e.target.value))}
        className="w-full p-2.5 text-sm rounded-none"
      >
        {Array.from({ length: 12 }, (_, i) => i + 1).map((w) => (
          <option key={w} value={w}>
            Week {w}
          </option>
        ))}
      </select>
      <label className="block text-xs text-[#39ff14]/70">SELECT_DAY:</label>
      <select
        value={day}
        onChange={(e) => onDayChange(e.target.value as Day)}
        className="w-full p-2.5 text-sm rounded-none"
      >
        {DAYS.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
    </div>
  );
}
