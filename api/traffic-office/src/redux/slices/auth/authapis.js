import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const authUser = createAsyncThunk(
    'user/getAuthenticatedUser',
    async() => {
        const res = await axios.post("/me");
        if (res.data.success === 1) {
            return res.data.user;
        } else {
            return null;
        }
    }
);

export const login = createAsyncThunk(
    'user/login',
    async(data) => {
        const res = await axios.post("/login", data);
        if (res.data.success === 1) {
            return res.data.user;
        } else {
            return null;
        }
    }
);

export const logout = createAsyncThunk(
    'user/logout',
    async(data) => {
        const res = await axios.post("/logout");
        if (res.data.success === 1) {
            return res.data.user;
        } else {
            return null;
        }
    }
);