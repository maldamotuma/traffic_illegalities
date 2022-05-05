import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
}
export const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setUserSocket(state, { payload }) {
            state.user = payload
        }
    }
});

export const { setUserSocket } = socketSlice.actions;

export default socketSlice.reducer;