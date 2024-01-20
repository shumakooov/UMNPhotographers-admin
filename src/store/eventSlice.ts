import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import EventController from "../api/eventContoller";
import { Schedule, Zone, ZoneInfo } from "../types/event";
import { Event } from "../types/event";
import { RootState } from "./store";

export interface EventState {
  event: Event[];
  zonesInfo: ZoneInfo[];
  zones: Zone[];
  scheduleList: Schedule[];
}

export const changeEvent = createAsyncThunk(
  "event/change",
  async (
    [eventId, newData]: [string, Omit<Event, "id">],
    { rejectWithValue },
  ) => {
    try {
      await EventController.putEvent(eventId, newData);
      const { data } = await EventController.getEvent(eventId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const receivePhotographerPriority = createAsyncThunk(
  "event/photographerPriority",
  async (eventId: string, { rejectWithValue }) => {
    try {
      // Получение информации
      const zones = await EventController.getEventZones(eventId);
      const scheduleList = await EventController.getScheduleList(eventId);
      const listZoneInfo = await EventController.getAllZoneInfo(eventId);

      const hasZoneSchedule = scheduleList.filter(
        (item) => item.zoneId !== null,
      );

      const approvedZones = hasZoneSchedule.map((item) => {
        const numberZone = zones.find(
          (zone) => zone.id === item.zoneId,
        )?.number;
        return {
          photographerId: item.photographerId,
          [`zone${numberZone}`]: "✔",
        };
      });

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
        initZonesPriority = {
          ...initZonesPriority,
          [`zone${item.number}`]: "-",
        };
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

      data = data.map((item) => {
        const approvedZone = approvedZones.find(
          (el) => el.photographerId === item.id,
        );
        if (approvedZone) {
          return { ...item, ...approvedZone };
        }

        return item;
      });

      return { zonesInfo: listZoneInfo, zones: zones, data, scheduleList };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const changeApprovedZone = createAsyncThunk(
  "event/approvedZone/change",
  async (
    {
      photographerId,
      numberZone,
    }: {
      photographerId: number;
      numberZone: string;
    },
    { rejectWithValue, getState },
  ) => {
    try {
      const state: any = getState();
      let zoneId: number | undefined | null = state.events.zones.find(
        (zoneItem: Zone) => zoneItem.number === Number(numberZone),
      )?.id;
      const schedule = state.events.scheduleList.find(
        (scheduleItem: Schedule) =>
          scheduleItem.photographerId === photographerId,
      );

      if (!zoneId) {
        return Promise.resolve("Зона не найдена");
      }

      if (!schedule) {
        return Promise.resolve("Расписание не найдено");
      }

      // Сброс утверждения при повторном нажатии на галочку
      if (schedule.zoneId === zoneId) {
        zoneId = null;
      }

      const { data } = await EventController.putScheduleZone(
        schedule.id,
        schedule.published,
        zoneId,
      );

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const resetPhotographerPriority = createAsyncThunk(
  "event/photographerPriority/reset",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      for (let item of state.events.zonesInfo) {
        await EventController.deleteZoneInfo(item.id);
      }
      return;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const initialState: EventState = {
  event: [],
  zonesInfo: [],
  zones: [],
  scheduleList: [],
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addEvent(state, action) {
      state.event = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(receivePhotographerPriority.fulfilled, (state, action) => {
      state.zonesInfo = action.payload.zonesInfo;
      state.zones = action.payload.zones;
      state.scheduleList = action.payload.scheduleList;
    });
  },
});

export const { addEvent } = eventSlice.actions;

export default eventSlice.reducer;
