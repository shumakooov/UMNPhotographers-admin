import {createSlice} from "@reduxjs/toolkit";

export interface Activity {
    id: number;
    locationId: number;
    zoneId: number;
    eventId: number;
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    priority: number;
}

export interface ActivityFull {
    id: number,
    locationId: number,
    eventId: number,
    zoneId: number,
    name: string,
    description: string,
    startTime: string,
    endTime: string,
    photographersCount: number,
    priority: number,
    shootingTime: number,
    shootingType: string,
    importantPersons: string,
    activityCode: string
}

export interface ActivityState {
    activity: Activity[]
}

const initialState: ActivityState = {activity: []}

const activitySlice = createSlice({
   name: 'activity',
   initialState,
    reducers: {
        addActivity(state, action) {
            state.activity = action.payload
        },
    }
});

export const {addActivity} = activitySlice.actions;

export default activitySlice.reducer;
