import { createSlice } from "@reduxjs/toolkit";
import { authUser, login, logout } from "./authapis";

const accountSlices = createSlice({
    name: "user",
    initialState: "UNDEFINED",
    reducers: {},
    extraReducers: {
        [authUser.fulfilled]: (state, { payload }) => {
            return payload;
        },
        [login.fulfilled]: (state, { payload }) => {
            return payload;
        },
        [logout.fulfilled]: (state, { payload }) => {
            return payload;
        }
    }
});

// export const { me } = accountSlices.actions;

export default accountSlices.reducer;