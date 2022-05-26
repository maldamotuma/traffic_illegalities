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
            return { driver: res.data.driver, new_records: res.data.new_records };
        } else {
            return null;
        }
    }
);

export const recordArrest = createAsyncThunk(
    'driver/arrest',
    async(data, api) => {
        data.setloading(true);
        const res = await axios.post(`/record-punishment`, data.form);
        // setTimeout(() => {
        data.setloading(false);
        // }, 3000);
        if (res.data.success === 1) {
            return res.body.success;
        } else {
            return null;
        }
    }
);