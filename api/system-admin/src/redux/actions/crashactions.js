import axios from "../caxios";
import { DOWNLOADCRASHLOG, FETCHCRASHREPORT } from "../ActionTypes";
import { FileDownload } from "js-file-download";
import { login_form } from "../helpers";

export const fetch_crashes = () => async dispatch => {
    try {
        const res = await axios.get("/crashes");
        if (res.data.success === 1) {
            dispatch({
                type: FETCHCRASHREPORT,
                payload: res.data.crashes
            });
        } else if (res.data.success === -1) {
            login_form(dispatch);
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