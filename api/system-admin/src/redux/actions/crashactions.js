import axios from "../caxios";
import { DOWNLOADCRASHLOG, FETCHCRASHREPORT } from "../ActionTypes";
import { FileDownload } from "js-file-download";

export const fetch_crashes = () => async dispatch => {
    try {
        const res = await axios.get("/crashes");
        if (res.data.success === 1) {
            dispatch({
                type: FETCHCRASHREPORT,
                payload: res.data.crashes
            });
        }
    } catch (error) {
        console.log("malda : ", error);
    }
}

export const download_crashlog = (crash_id) => async dispatch => {
    try {
        const res = await axios.get("/download-crash?crash=" + crash_id);
        if (res.data) {
            FileDownload(res.data, "malda.log");
            dispatch({
                type: DOWNLOADCRASHLOG,
                payload: {}
            });
        }
    } catch (error) {

    }
}