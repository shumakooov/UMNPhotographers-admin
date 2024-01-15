import {createSlice} from "@reduxjs/toolkit";

export interface Event {
    id: number,
    name: string,
    level: number,
    startTime: string,
    endTime: string,
    timeZone: string,
    address: string,
    driveLink: string,
    photographersCount: number,
    published: boolean,
    description: string
}

export interface EventState {
    event: Event[]
}

const initialState: EventState = {event: []}

const eventSlice = createSlice({
   name: 'event',
   initialState,
    reducers: {
        addEvent(state, action) {
            state.event = action.payload
        },
    }
});

export const {addEvent} = eventSlice.actions;

export default eventSlice.reducer;
