import axios from "../caxios";
import { SETADMIN } from "../ActionTypes";
import { FIXEDNOTIFICATION, UPDATEONETIME } from '../ActionTypes';
import { login_form } from "../helpers";



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
        } else {
            dispatch({
                type: FIXEDNOTIFICATION,
                payload: { type: 'error', message: 'Invalid credentials', open: true }
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
            payload: { type: 'info', message: 'Signing you out ...', open: true }
        });
        const res = await axios.post('/signout');
        dispatch({
            type: SETADMIN,
            payload: res.data.user
        });
        dispatch({
            type: FIXEDNOTIFICATION,
            payload: { type: 'success', message: 'Signedout successfully', open: true }
        });
        setloading(false);
        console.log(res);
    } catch (error) {
        setloading(false);
        console.log(error);
        alert('error');
    }
}

export const forgotPassword = (email) => async dispatch => {
    try {
        let res = await axios.post('/forgot-password', { email: email });
        dispatch({
            type: FIXEDNOTIFICATION,
            payload: { type: 'success', message: 'Email sent.Check you Email ...', open: true }
        });
    } catch (error) {
        dispatch({
            type: FIXEDNOTIFICATION,
            payload: { type: 'error', message: 'something went wrong ...', open: true }
        });
        console.log(error);
    }
}

export const changePassword = (password, setloading, type) => async(dispatch, getState) => {
    try {
        let res = await axios.post(type === 'create' ? '/create-new-password' : '/change-password', password);
        if (res.data.success) {
            if (type === 'create') {
                dispatch({
                    type: UPDATEONETIME,
                    payload: false
                });
                dispatch({
                    type: FIXEDNOTIFICATION,
                    payload: { type: 'success', message: 'Password successfully ' + (type === 'create' ? 'Created' : 'Changed'), open: true }
                });
            } else if (res.data.success === -1) {
                login_form(dispatch);
            }
        } else {
            dispatch({
                type: FIXEDNOTIFICATION,
                payload: { type: 'error', message: res.data.message, open: true }
            });
        }
        setloading(false);
    } catch (error) {
        setloading(false);
        console.log(error);
    }
}

export const checkToken = (token, navigate) => async dispatch => {
    try {
        const res = await axios.post('/reset-password', token);
        if (res.data.success == 1) {
            dispatch({
                type: SETADMIN,
                payload: res.data.user
            });
            navigate('/')
        } else {
            navigate('/login');
        }
    } catch (error) {

    }
}