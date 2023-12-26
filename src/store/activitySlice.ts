import {createSlice} from "@reduxjs/toolkit";

export interface Activity {
    id: number;
    locationId: number;
    zoneId: number;
    eventId: number;
    name?: string;
    description?: string;
    startTime: string;
    endTime: string;
    priority?: number;
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
