import { FIXEDNOTIFICATION } from "../ActionTypes";

export const notify = info => dispatch => {
    dispatch({
        type: FIXEDNOTIFICATION,
        payload: { type: info.type, message: info.msg, open: true }
    });
}