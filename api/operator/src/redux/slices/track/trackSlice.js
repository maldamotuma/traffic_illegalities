import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cars: [],
    traffic: [],
    user: []
}
const trackSlice = createSlice({
    name: "car",
    initialState,
    reducers: {
        addTrack(state, { payload }) {
            if (payload.cars) {
                state.cars = [...state.cars, ...payload.cars];
            }
            if (payload.traffic) {
                state.traffic = [...state.traffic, ...payload.traffic];
            }
            if (payload.user) {
                state.user = [...state.user, ...payload.user];
            }
        }
    }
});

export const { addTrack } = trackSlice.actions;

export default trackSlice.reducer;