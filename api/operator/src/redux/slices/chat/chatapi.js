import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const newMessage = createAsyncThunk(
    'conv/new',
    async(conv, api) => {
        const { conversations } = api.getState();
        const convtmp = conversations.find(cvn => String(cvn._id) === String(conv._id));
        if (convtmp) {
            return { new: false, _id: conv._id, message: conv.message };
        } else {
            const res = await axios.get(`/user-conversation?id=${conv._id}`);
            if (res.data.success === 1) {
                return { new: true, conversation: {...res.data.conversation, hide: null } };
            } else {
                return null;
            }
        }
    }
);