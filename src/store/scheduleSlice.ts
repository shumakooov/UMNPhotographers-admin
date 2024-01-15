import {createSlice} from "@reduxjs/toolkit";

export interface Schedule {
    id: number,
    eventId: number,
    photographerId: number,
    zoneId: number,
    published: boolean,
    firstname: string,
    surname: string,
    middleName: string,
}

export interface ScheduleState {
    schedule: Schedule[]
}

const initialState: ScheduleState = {schedule: []}

const scheduleSlice = createSlice({
   name: 'schedule',
   initialState,
    reducers: {
        addSchedule(state, action) {
            state.schedule = action.payload
        },
    }
});

export const {addSchedule} = scheduleSlice.actions;

export default scheduleSlice.reducer;
