export type MuscleGroup =
  | "LEGS"
  | "PUSH"
  | "PULL"
  | "ARMS"
  | "SHOULDERS"
  | "CORE"
  | "FULL BODY"
  | "CARDIO"
  | "RECOVERY";

export type Difficulty = "TIER I" | "TIER II" | "TIER III";

export interface Exercise {
  name: string;
  guide: string;
  muscleGroup: MuscleGroup;
  difficulty: Difficulty;
}

export const EXERCISES: Exercise[] = [
  { name: "Squat", guide: "<b>Squats:</b><br>Feet shoulder-width. Chest up. Drive through heels.", muscleGroup: "LEGS", difficulty: "TIER I" },
  { name: "Lunge", guide: "<b>Lunges:</b><br>Step, drop back knee to hover 1 inch off floor.", muscleGroup: "LEGS", difficulty: "TIER I" },
  { name: "Bulgarian", guide: "<b>Bulgarian Split Squat:</b><br>Back foot on chair. Hop forward. Lower straight down.", muscleGroup: "LEGS", difficulty: "TIER II" },
  { name: "Calf Raise", guide: "<b>Calf Raises:</b><br>Lift heels high. Pause. Lower slow.", muscleGroup: "LEGS", difficulty: "TIER I" },
  { name: "Glute", guide: "<b>Glute Bridges:</b><br>Lie on back. DB on hips. Squeeze glutes to ceiling.", muscleGroup: "LEGS", difficulty: "TIER I" },
  { name: "Wall Sit", guide: "<b>Wall Sit:</b><br>Knees 90 degrees. Hands off legs.", muscleGroup: "LEGS", difficulty: "TIER I" },
  { name: "RDL", guide: "<b>RDL:</b><br>Hinge at HIPS (butt back). Flat back. Feel hamstrings.", muscleGroup: "LEGS", difficulty: "TIER II" },
  { name: "Thruster", guide: "<b>Thruster:</b><br>Squat + Overhead Press in one motion.", muscleGroup: "FULL BODY", difficulty: "TIER III" },
  { name: "Push-up", guide: "<b>Push-ups:</b><br>Chest to floor. Plank body.", muscleGroup: "PUSH", difficulty: "TIER I" },
  { name: "T-Pushup", guide: "<b>T-Pushup:</b><br>Pushup -> Rotate to Side Plank.", muscleGroup: "PUSH", difficulty: "TIER II" },
  { name: "Dip", guide: "<b>Chair Dips:</b><br>Hands on chair. Lower hips.", muscleGroup: "PUSH", difficulty: "TIER I" },
  { name: "Floor Press", guide: "<b>Floor Press:</b><br>Bench press on floor. Elbows touch ground.", muscleGroup: "PUSH", difficulty: "TIER II" },
  { name: "Overhead", guide: "<b>Overhead/Z-Press:</b><br>Press DBs overhead. Core tight.", muscleGroup: "PUSH", difficulty: "TIER II" },
  { name: "Tricep", guide: "<b>Tricep Ext:</b><br>DB behind head. Extend up.", muscleGroup: "PUSH", difficulty: "TIER I" },
  { name: "Arnold", guide: "<b>Arnold Press:</b><br>Palms in -> Press & Rotate -> Palms out.", muscleGroup: "PUSH", difficulty: "TIER II" },
  { name: "Plank", guide: "<b>Plank:</b><br>Elbows under shoulders. Steel body.", muscleGroup: "CORE", difficulty: "TIER I" },
  { name: "Pull-up", guide: "<b>Pull-ups:</b><br>Chin over bar OR Negative (5 sec down).", muscleGroup: "PULL", difficulty: "TIER III" },
  { name: "Chin-up", guide: "<b>Chin-ups:</b><br>Palms facing you.", muscleGroup: "PULL", difficulty: "TIER II" },
  { name: "Row", guide: "<b>Rows:</b><br>Flat back. Pull to hip pocket.", muscleGroup: "PULL", difficulty: "TIER I" },
  { name: "Renegade", guide: "<b>Renegade Rows:</b><br>Plank position. Row DB to hip. No twisting.", muscleGroup: "PULL", difficulty: "TIER III" },
  { name: "Pullover", guide: "<b>Pullover:</b><br>Lie on back. DB behind head. Stretch lats.", muscleGroup: "PULL", difficulty: "TIER I" },
  { name: "Upright", guide: "<b>Upright Row:</b><br>Pull DBs up front of body. High elbows.", muscleGroup: "PULL", difficulty: "TIER I" },
  { name: "Fly", guide: "<b>Rear Delt Fly:</b><br>Bent over. Wings out.", muscleGroup: "PULL", difficulty: "TIER II" },
  { name: "Curl", guide: "<b>Curls:</b><br>No swinging. Squeeze biceps.", muscleGroup: "ARMS", difficulty: "TIER I" },
  { name: "Hammer", guide: "<b>Hammer Curls:</b><br>Palms facing each other.", muscleGroup: "ARMS", difficulty: "TIER I" },
  { name: "Zottman", guide: "<b>Zottman Curls:</b><br>Up palms up, Down palms down.", muscleGroup: "ARMS", difficulty: "TIER II" },
  { name: "Concentration", guide: "<b>Concentration Curls:</b><br>Elbow on inner thigh.", muscleGroup: "ARMS", difficulty: "TIER I" },
  { name: "Lateral", guide: "<b>Lateral Raises:</b><br>Pour the pitcher. Parallel to floor.", muscleGroup: "SHOULDERS", difficulty: "TIER I" },
  { name: "Swing", guide: "<b>Swings:</b><br>Hips back, Hips POP forward. Arms are ropes.", muscleGroup: "FULL BODY", difficulty: "TIER II" },
  { name: "Burpee", guide: "<b>Burpees:</b><br>Chest to floor. Jump.", muscleGroup: "CARDIO", difficulty: "TIER III" },
  { name: "Snatch", guide: "<b>Snatch:</b><br>Floor to Overhead in one jump.", muscleGroup: "FULL BODY", difficulty: "TIER III" },
  { name: "Mountain", guide: "<b>Mtn Climbers:</b><br>Knees to chest fast.", muscleGroup: "CARDIO", difficulty: "TIER II" },
  { name: "Jack", guide: "<b>Jumping Jacks:</b><br>Classic cardio.", muscleGroup: "CARDIO", difficulty: "TIER I" },
  { name: "Sit-up", guide: "<b>Sit-ups:</b><br>Touch floor behind head, touch toes.", muscleGroup: "CORE", difficulty: "TIER I" },
  { name: "Russian", guide: "<b>Russian Twists:</b><br>Feet up. Touch DB left and right.", muscleGroup: "CORE", difficulty: "TIER II" },
  { name: "Walk", guide: "<b>Active Rest:</b><br>Keep moving. Breathe.", muscleGroup: "RECOVERY", difficulty: "TIER I" },
  { name: "Clean", guide: "<b>Squat Clean:</b><br>Deadlift, drop under, catch at shoulders.", muscleGroup: "FULL BODY", difficulty: "TIER III" },
];

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;
export type Day = (typeof DAYS)[number];

export function getGuidesForWorkout(workoutText: string): string {
  const matches = EXERCISES.filter((ex) =>
    new RegExp(ex.name, "i").test(workoutText)
  ).map((ex) => ex.guide);

  if (matches.length === 0) return "EXECUTE MISSION.";
  return [...new Set(matches)].join(
    "<br><hr style='border-color: #39ff14; opacity: 0.3;'>"
  );
}

export function stripGuideTitle(guide: string): string {
  return guide.replace(/<b>.*?<\/b><br>/, "");
}
