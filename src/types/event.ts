export type Zone = {
  id: number;
  number: number;
  description: string | null;
  manager: string | null;
  eventId: number;
};

export type Schedule = {
  id: number;
  eventId: number;
  photographerId: number;
  zoneId: number;
  published: boolean;
  firstname: string;
  surname: string;
  middleName: string;
};

export type ZoneInfo = {
  id: number;
  zoneId: number;
  eventId: number;
  photographerId: number;
  photographerScheduleId: number;
  firstname: string;
  surname: string;
  middleName: string;
  priority: number;
};

export type NewZoneInfo = Pick<
  ZoneInfo,
  "zoneId" | "photographerId" | "photographerScheduleId" | "priority"
>;
