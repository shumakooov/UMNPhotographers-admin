import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import EventController from "../api/eventContoller";

export interface Event {
  id: number;
  name: string;
  level: number;
  startTime: string;
  endTime: string;
  timeZone: string;
  address: string;
  driveLink: string;
  photographersCount: number;
  published: boolean;
  description: string;
}

export interface EventState {
  event: Event[];
}

export const receivePhotographerPriority = createAsyncThunk(
  "event/photographerPriority",
  async (eventId: string, { rejectWithValue }) => {
    try {
      // Получение информации
      const zones = await EventController.getEventZones(eventId);
      const scheduleList = await EventController.getScheduleList(eventId);
      const listZoneInfo = await EventController.getAllZoneInfo(eventId);

      // Уникальные id фотографов
      const photographerIdListSet: number[] = Array.from(
        new Set(scheduleList.map((item) => item.photographerId)),
      );

      // Массив с информацией о фотографах
      const photographersInfo = photographerIdListSet.map((photographerId) => {
        const scheduleItem = scheduleList.find(
          (item) => item.photographerId === photographerId,
        );
        return {
          id: photographerId,
          firstname: scheduleItem?.firstname,
          surname: scheduleItem?.surname,
        };
      });

      // Нулевые приоритеты на зоны
      let initZonesPriority = {};
      for (let item of zones) {
        initZonesPriority = { ...initZonesPriority, [`zone${item.number}`]: 0 };
      }

      // Соединение информации о фотографах и нулевых приоритетов
      const initResponse = photographersInfo.map((photographer) => ({
        ...photographer,
        ...initZonesPriority,
      }));

      // Наполнениие для таблицы
      let data: any[] = [];

      for (let item of initResponse) {
        const photographerPriority = listZoneInfo.filter(
          (zoneInfo) => zoneInfo.photographerId === item.id,
        );
        for (let { zoneId, priority } of photographerPriority) {
          // @ts-ignore
          item[`zone${zoneId}`] = priority;
        }
        data.push(item);
      }

      return { zoneCount: zones.length, data };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const initialState: EventState = { event: [] };

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addEvent(state, action) {
      state.event = action.payload;
    },
  },
});

export const { addEvent } = eventSlice.actions;

export default eventSlice.reducer;
