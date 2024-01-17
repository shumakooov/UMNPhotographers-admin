import instance from "./instance";

type Zone = {
  id: number;
  number: number;
  description: string | null;
  manager: string | null;
  eventId: number;
};

type Schedule = {
  id: number;
  eventId: number;
  photographerId: number;
  zoneId: number;
  published: boolean;
  firstname: string;
  surname: string;
  middleName: string;
};

type ZoneInfo = {
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

export default class EventController {
  static async getEventZones(eventId: string): Promise<Zone[]> {
    const { data } = await instance.get(
      `/zone/all?eventId=${eventId}&page=0&size=100`,
    );
    return data.list;
  }

  static async getScheduleList(eventId: string): Promise<Schedule[]> {
    const { data } = await instance.get(
      `/schedule/list?eventId=${eventId}&page=0&size=100`,
    );
    return data.list;
  }

  static async getAllZoneInfo(eventId: string): Promise<ZoneInfo[]> {
    const { data } = await instance.get(
      `/zone_info/all?eventId=${eventId}&page=0&size=100`,
    );
    return data.list;
  }
}
