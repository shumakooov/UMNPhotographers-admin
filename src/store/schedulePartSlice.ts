import {createSlice} from "@reduxjs/toolkit";

export interface SchedulePart {
    id: number,
    photographerScheduleId: number,
    photographerId: number,
    activityId: number,
    activityName: string,
    startTime: string,
    endTime: string
}

export interface SchedulePartState {
    schedulePart: SchedulePart[]
}

const initialState: SchedulePartState = {schedulePart: []}

const schedulePartSlice = createSlice({
   name: 'schedulePart',
   initialState,
    reducers: {
        addSchedulePart(state, action) {
            state.schedulePart = action.payload
        },
    }
});

export const {addSchedulePart} = schedulePartSlice.actions;

export default schedulePartSlice.reducer;
