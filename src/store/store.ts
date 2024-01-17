import { configureStore } from '@reduxjs/toolkit'
import locationReducer from './locationSlice'
import zoneReducer from './zoneSlice'
import activityReducer from './activitySlice'
import eventReducer from './eventSlice'
import scheduleReducer from "./scheduleSlice";
import photographerReducer from "./photographerSlice"
import schedulePartReducer from "./schedulePartSlice";

export const store = configureStore({
    reducer: {
        locations: locationReducer,
        zones: zoneReducer,
        activities: activityReducer,
        events: eventReducer,
        scheduleList: scheduleReducer,
        schedulePart: schedulePartReducer,
        photographer: photographerReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
