import instance from "./instance";
import {
  Zone,
  Schedule,
  ZoneInfo,
  NewZoneInfo,
  Event,
  CheckRequest,
} from "../types/event";
import { AxiosResponse } from "axios";

export default class EventController {
  // Мероприятие
  static async getEvent(eventId: string): Promise<AxiosResponse<Event>> {
    return instance.get(`/event/${eventId}`);
  }

  static async putEvent(
    eventId: string,
    newData: Omit<Event, "id">,
  ): Promise<AxiosResponse<null>> {
    return instance.put(`/event/${eventId}`, newData);
  }

  static async deleteEvent(eventId: string): Promise<AxiosResponse<null>> {
    return instance.delete(`/event/${eventId}`);
  }

  // Зоны
  static async getEventZones(eventId: string): Promise<Zone[]> {
    const { data } = await instance.get(
      `/zone/all?eventId=${eventId}&page=0&size=100`,
    );
    return data.list;
  }

  static async getAllZoneInfo(
    eventId: string,
    zoneId: string = "",
  ): Promise<ZoneInfo[]> {
    const { data } = await instance.get(
      `/zone_info/all?zoneId=${zoneId}&eventId=${eventId}&page=0&size=100`,
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

  // Расписание
  static async getScheduleList(eventId: string): Promise<Schedule[]> {
    const { data } = await instance.get(
      `/schedule/list?eventId=${eventId}&page=0&size=100`,
    );
    return data.list;
  }

  static async putScheduleZone(
    id: number,
    published: boolean,
    zoneId: number | null,
  ): Promise<AxiosResponse<null>> {
    if (zoneId !== null) {
      return instance.put(
        `/schedule/${id}?published=${published}&zoneId=${zoneId}`,
      );
    }
    return instance.put(`/schedule/${id}?published=${published}`);
  }

  // Распределение
  static async checkDistribution(
    requestData: CheckRequest,
  ): Promise<{ result: boolean }> {
    const { data } = await instance.post("/service/check", requestData);
    return data;
  }

  static async autDistribute(
    requestData: CheckRequest,
  ): Promise<{ result: boolean }> {
    const { data } = await instance.post("/service/distribute", requestData);
    return data;
  }
}
