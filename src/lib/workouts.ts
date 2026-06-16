import type { Day } from "./exercises";

export function getWorkoutText(week: number, day: Day): string {
  const header = "MISSION DIRECTIVE:\n";

  if (week <= 4) {
    switch (day) {
      case "Monday":
        return `${header}LEG DAY (FOUNDATION)\n[VEST ON] Squats: 4 sets x 12 reps\n[VEST ON] Walking Lunges: 3 sets x 12 steps/leg\n[VEST ON] Calf Raises (Hold DBs): 3 sets x 20\n[VEST OFF] Finisher: Max Air Squats in 90 sec`;
      case "Tuesday":
        return `${header}PUSH/PULL (FOUNDATION)\n[NO VEST] Push-ups: 4 sets x AMRAP\n[NO VEST] Pull-up Negatives: 4 sets x 5 reps\n[NO VEST] DB Rows (30lbs): 4 sets x 12 reps\n[NO VEST] Finisher: 3 mins Plank`;
      case "Wednesday":
        return `${header}METCON A (CARDIO)\n[NO VEST] EMOM 18 mins (Min 1): 15 DB Skier Swings\n[NO VEST] EMOM 18 mins (Min 2): 10 Burpees\n[NO VEST] EMOM 18 mins (Min 3): Active Rest (Walk)`;
      case "Thursday":
        return `${header}FULL BODY GRIND (CIRCUIT)\nAMRAP 20 Mins: [VEST ON] 10 Squats\nAMRAP 20 Mins: [VEST ON] 10 Lunges\nAMRAP 20 Mins: [VEST OFF] 10 Pushups\nAMRAP 20 Mins: [NO VEST] 10 Sit-ups`;
      case "Friday":
        return `${header}ARM FARM A (HYPERTROPHY)\n[NO VEST] DB Curls: 3x12\n[NO VEST] Chair Dips: 3x15\n[NO VEST] Lateral Raises: 3x12\n[NO VEST] Overhead Tricep Ext: 3x12`;
    }
  }

  if (week <= 8) {
    switch (day) {
      case "Monday":
        return `${header}LEG DAY (UNILATERAL)\n[VEST ON] Bulgarian Split Squats: 4 sets x 8/leg\n[VEST ON] Sumo Squats: 4 sets x 15\n[VEST ON] Glute Bridges: 3 sets x 15\nFinisher: Wall Sit (Max Time)`;
      case "Tuesday":
        return `${header}PUSH/PULL (ANGLES)\nDecline Push-ups: 4 sets x Failure\nChin-ups: Max reps OR Negatives\nDB Pullovers: 3 sets x 12\nArnold Press: 3 sets x 10`;
      case "Wednesday":
        return `${header}METCON B (AGILITY)\nEMOM 18: 20 Mtn Climbers + 10 Jacks\nEMOM 18: 12 DB Snatch (Alt arms)\nEMOM 18: 45 sec Plank`;
      case "Thursday":
        return `${header}THE GAUNTLET (CIRCUIT)\nAMRAP 20: 5 Pushups\nAMRAP 20: 10 Reverse Lunges\nAMRAP 20: 15 Air Squats\nAMRAP 20: 20 Russian Twists`;
      case "Friday":
        return `${header}ARM FARM B\nHammer Curls: 3x10\nDB Floor Press: 3x15\nUpright Rows: 3x12\nConcentration Curls: 2x10/arm`;
    }
  }

  switch (day) {
    case "Monday":
      return `${header}LEG DAY (POWER)\nDB Thrusters: 5 sets x 10 reps\nDB RDLs: 4 sets x 12\nJump Lunges: 3 sets x 20 total\nFinisher: 100 Air Squats for time`;
    case "Tuesday":
      return `${header}PUSH/PULL (DENSITY)\nT-Pushups: 4 sets x 12\nRenegade Rows: 4 sets x 8/side\nZ-Press: 3 sets x 10\nFinisher: 60 Pushups for time`;
    case "Wednesday":
      return `${header}METCON C (THE 300)\nFor Time: 50 DB Swings\nFor Time: 50 Air Squats\nFor Time: 50 Pushups\nFor Time: 50 Lunges\nFor Time: 50 Sit-ups\nFor Time: 50 DB Swings`;
    case "Thursday":
      return `${header}THE MAN MAKER\nAMRAP 20: Complex (Pushup->Row->Clean->Thruster) x 5\nRest 60s`;
    case "Friday":
      return `${header}ARMOUR BUILDING\nZottman Curls: 3x10\nClose Grip Pushups: 3x12\nRear Delt Flys: 3x15\nPlank to Pushup: 3x10`;
  }
}

export function parseWorkout(workoutText: string): {
  header: string;
  items: string[];
} {
  const lines = workoutText
    .split("\n")
    .filter((l) => l && !l.includes("MISSION DIRECTIVE"));

  return {
    header: lines[0] ?? "",
    items: lines.slice(1),
  };
}

export function getMuscleStats(day: Day) {
  const stats = {
    LEGS: 1,
    CHEST: 1,
    BACK: 1,
    SHOULDERS: 1,
    ARMS: 1,
    CORE: 1,
  };

  switch (day) {
    case "Monday":
      stats.LEGS = 10;
      stats.CORE = 6;
      stats.BACK = 2;
      break;
    case "Tuesday":
      stats.CHEST = 9;
      stats.BACK = 9;
      stats.ARMS = 6;
      stats.SHOULDERS = 5;
      break;
    case "Wednesday":
      stats.CORE = 10;
      stats.LEGS = 6;
      stats.SHOULDERS = 5;
      stats.ARMS = 4;
      break;
    case "Thursday":
      stats.LEGS = 7;
      stats.CHEST = 7;
      stats.BACK = 7;
      stats.SHOULDERS = 7;
      stats.ARMS = 7;
      stats.CORE = 8;
      break;
    case "Friday":
      stats.ARMS = 10;
      stats.SHOULDERS = 9;
      stats.CHEST = 4;
      stats.BACK = 4;
      stats.LEGS = 1;
      break;
  }

  return stats;
}
