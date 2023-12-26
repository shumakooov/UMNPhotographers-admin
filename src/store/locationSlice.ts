import {createSlice} from "@reduxjs/toolkit";

export interface Location {
    id: number;
    name?: string;
    description?: string;
    startDate: string;
    startTime?: string;
    endTime?: string;
    address?: string;
    manager?: string;
}

export interface LocationState {
    location: Location[]
}

const initialState: LocationState = {location: []}

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        addLocation (state, action) {
            state.location = action.payload
        },
    }
});

export const {addLocation} = locationSlice.actions;

export default locationSlice.reducer;
