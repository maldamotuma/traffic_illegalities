import axios from "../caxios";
import { ADDSYSTEMADMIN, SUBMITSYSTEMADMIN } from "../ActionTypes";
import { formdataGenerator } from "./helper";

export const submit_system_admin = setScreen => async(dispatch, getState) => {
    try {
        const system_admin = getState().system_admin.newSA;
        const formdata = formdataGenerator(system_admin);
        const res = await axios.post("/add-system-admin", formdata);
        if (res.data.success === 1) {
            setScreen("success");
        }
    } catch (error) {
        // dispatch({
        //     type: SUBMITSYSTEMADMIN,
        //     payload: sys_admin
        // });
        alert("error");
    }
}

export const add_system_admin = sys_admin => dispatch => {
    dispatch({
        type: ADDSYSTEMADMIN,
        payload: sys_admin
    });
}