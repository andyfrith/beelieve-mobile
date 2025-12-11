import { Colors } from "./theme";

export const MED_ACTIONS = [
  {
    icon: "add-circle-outline" as const,
    label: "Add\nMedication",
    route: "/medications/add" as const,
    color: "#2E7D32",
    gradient: [Colors.honey.color2, Colors.honey.color1] as [string, string],
  },
  {
    icon: "calendar-outline" as const,
    label: "Medication\nCalendar",
    route: "/calendar" as const,
    color: "#1976D2",
    gradient: [Colors.honey.color2, Colors.honey.color1] as [string, string],
  },
  {
    icon: "time-outline" as const,
    label: "Medication\nHistory",
    route: "/history" as const,
    color: "#C2185B",
    gradient: [Colors.honey.color2, Colors.honey.color1] as [string, string],
  },
  {
    icon: "time-outline" as const,
    label: "Medications",
    route: "/medications" as const,
    color: "#C2185B",
    gradient: [Colors.honey.color2, Colors.honey.color1] as [string, string],
  },
  // {
  //   icon: "medical-outline" as const,
  //   label: "Notifications\nTester",
  //   route: "/notifications" as const,
  //   color: "#E64A19",
  //   gradient: ["#FF5722", "#E64A19"] as [string, string],
  // },
];
