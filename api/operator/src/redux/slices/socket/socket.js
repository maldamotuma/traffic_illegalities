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
        },
        setCarSocket(state, { payload }) {
            state.car = payload
        }
    }
});

export const { setUserSocket, setCarSocket } = socketSlice.actions;

export default socketSlice.reducer;