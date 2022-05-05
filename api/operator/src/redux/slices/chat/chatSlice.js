import { createSlice } from "@reduxjs/toolkit";
import { newMessage } from "./chatapi";

const initialState = [
    { _id: 1, name: { first: "malda", last: "motuma" } },
    { _id: 2, name: { first: "John", last: "Doe" } },
    { _id: 3, name: { first: "Tesfae", last: "Gobena" } },
    { _id: 4, name: { first: "Biruk", last: "Sebsibe" } },
    { _id: 5, name: { first: "Robera", last: "Fanta" } },
    { _id: 6, name: { first: "Burje", last: "Yohannis" } },
    { _id: 7, name: { first: "Josh", last: "Eyasu" } },
];

var messAudio = new Audio("sounds/message.mp3");
var closeAudio = new Audio("sounds/close.mp3");

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        retreivedMessage(state, { payload }) {
            return payload;
        },
        // newMessage(state, { payload }) {
        //     let founded = false;
        //     state.forEach(cnv => {
        //         if (String(cnv._id) === String(payload._id)) {
        //             cnv.hide = null;
        //             founded = true;
        //             // cnv.messages.push(payload.message);
        //         }
        //     });
        //     if (!founded) {
        //         state.push({...payload, hide: null });
        //     }
        //     messAudio.play();
        // },
        removeMessageFromView(state, { payload }) {
            closeAudio.play();
            state.forEach(cnv => {
                if (cnv._id === payload) {
                    cnv.hide = true;
                }
            })
        }
    },

    extraReducers: {
        [newMessage.fulfilled]: (state, { payload }) => {
            if (payload.new) {
                state.push(payload.conversation);
            } else {
                state.forEach(cnv => {
                    if (String(cnv._id) === String(payload._id)) {
                        cnv.hide = null;
                        cnv.messages.push(payload.message);
                        // cnv.messages.push(payload.message);
                    }
                });
            }
            messAudio.play();
        }
    }
});

export const { retreivedMessage, removeMessageFromView } = chatSlice.actions;

export default chatSlice.reducer;