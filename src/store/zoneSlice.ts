import {createSlice} from "@reduxjs/toolkit";

export interface Zone {
    id: number;
    number?: string;
    description?: string;
    manager?: string;
}

export interface ZoneState {
    zone: Zone[]
}

const initialState: ZoneState = {zone: []}

const zoneSlice = createSlice({
    name: 'zone',
    initialState,
    reducers: {
        addZone (state, action) {
            state.zone = action.payload
        },
    }
});

export const {addZone} = zoneSlice.actions;

export default zoneSlice.reducer;
