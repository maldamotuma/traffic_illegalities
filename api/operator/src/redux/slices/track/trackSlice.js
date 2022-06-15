import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    cars: [
        // { _id: 1, lat: 8.558635, lng: 39.285559 },
        // { _id: 2, lat: 8.558468, lng: 39.285959 },
    ],
    traffics: [],
    user: []
}

const overSpeedAudio = new Audio("sounds/overspeed.mp3");

const trackSlice = createSlice({
    name: "car",
    initialState,
    reducers: {
        addTrack(state, { payload }) {
            if (payload.cars) {
                console.log(payload.cars);
                let newTr = true;
                state.cars.forEach((car, i) => {
                    if (payload.cars._id == car._id) {
                        state.cars[i] = payload.cars;
                        newTr = false
                    }
                });
                if (newTr) {
                    state.cars = [...state.cars, payload.cars];
                    overSpeedAudio.play();
                }
            }
            if (payload.traffics) {
                state.traffics = [...payload.traffics];
            }
            if (payload.user) {
                state.user = [...state.user, ...payload.user];
            }
        },
        count_assignment(state, { payload }) {
            const tmptraffics = current(state).traffics.filter(trfs => trfs._id !== payload._id);
            let tmp_data = [...tmptraffics]
            const setr = [...tmptraffics];
            for (let i = 0; i < tmptraffics.length; i++) {
                if (setr[i]._id === payload._id) {
                    tmp_data[i].cars = payload.no;
                }
            }
            // tmptraffics.forEach(tr => {
            //     if (tr._id === payload._id) {
            //         tr.cars = 50;
            //     }
            // });
            console.log(tmp_data);
            state.traffics = [...tmptraffics];
        }
    }
});

export const { addTrack, count_assignment } = trackSlice.actions;

export default trackSlice.reducer;