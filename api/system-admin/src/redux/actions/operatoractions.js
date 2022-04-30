import { ADDOPERATOR, SUBMITOPERATOR, FETCHSINGLEOPERATOR, FETCHOPERATORS } from "../ActionTypes";
import axios from "../caxios";
import { formdataGenerator } from "./helper";

export const add_operator = operator => dispatch => {
    return dispatch({
        type: ADDOPERATOR,
        payload: operator
    });
}

export const submit_operator = (setscreen) => (dispatch, getState) => {
    const operator = getState().newOperator.newOperator;
    // const formdata = new FormData();
    // for(const key in operator) {
    //     formdata.append(key, operator[key]);
    // }
    // for (const key in operator) {
    //     if (Array.isArray(operator[key])) {
    //         operator[key].forEach(photo => {
    //             formdata.append(`${key}[]`, photo);
    //         });
    //     } else if (typeof (operator[key]) === "object" && key !== "profilePicture") {
    //         formdata.append(key, JSON.stringify(operator[key]));
    //     } else {
    //         formdata.append(key, operator[key]);
    //     }
    // }
    // console.log("malda attention : ", getState().newOperator.profilePicture);
    const formdata = formdataGenerator(operator);
    axios.post('/add-operator', formdata).then(res => {
        if (res.data.success === 1) {
            setTimeout(() => {
                setscreen("success");
            }, 2000);
            return dispatch({
                type: SUBMITOPERATOR,
                payload: operator
            });
        } else {
            setTimeout(() => {
                setscreen("form");
            }, 2000);
        }
    });
}

export const fetch_operators = () => async dispatch => {
    const res = await axios.get("/operators");
    if (res.data.success === 1) {
        dispatch({
            type: FETCHOPERATORS,
            payload: res.data.operators
        });
    }
}

export const get_operator = opid => async dispatch => {
    const res = await axios.get(`/operator/${opid}`);
    if (res.data.success === 1) {
        dispatch({
            type: FETCHSINGLEOPERATOR,
            payload: res.data.operator
        });
    }
}