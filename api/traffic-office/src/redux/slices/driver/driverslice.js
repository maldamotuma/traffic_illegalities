import { createSlice } from "@reduxjs/toolkit";
import { driverinfo } from "./driverapi";

const initialState = {
    driver: null,
    search: {
        by: "licesense",
        query: ""
    },
    not_found: false
}

const driverSlicer = createSlice({
    name: "driver",
    initialState,
    reducers: {
        setsearch(state, { payload }) {
            return {...state, search: {...state.search, ...payload } }
        }
    },
    extraReducers: {
        [driverinfo.fulfilled]: (state, { payload }) => {
            return {...state, driver: payload, not_found: payload === null ? true : false };
        }
    }
});

export const { setsearch } = driverSlicer.actions;

export default driverSlicer.reducer;