import instance from "./instance";
import { Zone, Schedule, ZoneInfo, NewZoneInfo } from "../types/event";
import { AxiosResponse } from "axios";

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

  static async putZoneInfo(
    id: number,
    newInfo: NewZoneInfo,
  ): Promise<AxiosResponse<null>> {
    return instance.put(`/zone_info/${id}`, newInfo);
  }

  static async deleteZoneInfo(id: number): Promise<AxiosResponse<null>> {
    return instance.delete(`/zone_info/${id}`);
  }
}
