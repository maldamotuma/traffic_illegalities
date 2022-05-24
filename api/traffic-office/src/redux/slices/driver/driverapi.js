import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const driverinfo = createAsyncThunk(
    'driver/new',
    async(setloader, api) => {
        setloader(true);
        const { search } = api.getState().driver;
        const res = await axios.get(`/driver?${search.by}=${search.query}`);
        // setTimeout(() => {
        setloader(false);
        // }, 3000);
        if (res.data.success === 1) {
            return res.data.driver;
        } else {
            return null;
        }
    }
);