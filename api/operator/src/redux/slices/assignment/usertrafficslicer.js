import { createSlice } from "@reduxjs/toolkit";

const usertrafficassignment = createSlice({
    name: "assignment/usertraffic",
    initialState: { user: null, traffic: null },
    reducers: {
        join_user_traffic(state, { payload }) {
            return {...state, ...payload };
        }
    }
});

export const { join_user_traffic } = usertrafficassignment.actions;

export default usertrafficassignment.reducer;