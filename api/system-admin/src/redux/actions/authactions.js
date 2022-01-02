import axios from "../caxios";
import { SETADMIN } from "../ActionTypes";
import { FIXEDNOTIFICATION } from '../ActionTypes';



export const checkAuth = () => async dispatch => {
    try {
        const res = await axios.get('/auth-user');
        dispatch({
            type: SETADMIN,
            payload: res.data.user
        });
        console.log(res);
    } catch (error) {
        console.log(error);
        // alert('error');
    }
}


export const login = (credentials, setloading) => async dispatch => {
    try {
        const res = await axios.post('/signin', credentials);
        if (res.data.success == 1) {
            dispatch({
                type: SETADMIN,
                payload: res.data.user
            });
        }else {
            dispatch({
                type: FIXEDNOTIFICATION,
                payload: {type: 'error', message: 'Invalid credentials', open: true}
            });
        }
        console.log(res);
        setloading(false);
    } catch (error) {
        setloading(false);
        console.log(error);
        alert('error');
    }
}

export const logout = (setloading) => async dispatch => {
    try {
        dispatch({
                type: FIXEDNOTIFICATION,
                payload: {type: 'info', message: 'Signing you out ...', open: true}
            });
        const res = await axios.post('/signout');
            dispatch({
                type: SETADMIN,
                payload: res.data.user
            });
            dispatch({
                type: FIXEDNOTIFICATION,
                payload: {type: 'success', message: 'Signedout successfully', open: true}
            });
            setloading(false);
        console.log(res);
    } catch (error) {
        setloading(false);
        console.log(error);
        alert('error');
    }
}