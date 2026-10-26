
export type ActivityStatus =
  | "Upcoming"
  | "In Progress"
  | "Completed"
  | "Cancelled";

export type ActivityType = "Repair" | "SOS";

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  vehicleName: string;
  garageName: string;
  date: string;
  status: ActivityStatus;
  cost?: number;
}
