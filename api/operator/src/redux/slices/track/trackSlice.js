import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cars: [
        { _id: 1, lat: 8.558635, lng: 39.285559 },
        // { _id: 2, lat: 8.558468, lng: 39.285959 },
    ],
    traffics: [
        { _id: 1, lat: 8.558762, lng: 39.285221 },
        { _id: 2, lat: 8.557807, lng: 39.287571 }
    ],
    user: []
}

var overSpeedAudio = new Audio("sounds/overspeed.mp3");

const trackSlice = createSlice({
    name: "car",
    initialState,
    reducers: {
        addTrack(state, { payload }) {
            if (payload.cars) {
                let newTr = true;
                state.cars.forEach((car, i) => {
                    if (payload.cars._id === car._id) {
                        state.cars[i] = payload.cars;
                        newTr = false
                    }
                });
                if (newTr) {
                    state.cars = [...state.cars, payload.cars];
                    overSpeedAudio.play();
                }
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