import { FIXEDNOTIFICATION } from '../ActionTypes';

export const notifyFixed = (type, message) => dispatch => {
    dispatch({
        type: FIXEDNOTIFICATION,
        payload: { type, message, open: true }
    });
}

export const cancelNotifyFixed = () => dispatch => {
    dispatch({
        type: FIXEDNOTIFICATION,
        payload: { open: false, type: '', message: '' }
    });
}