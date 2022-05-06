import { APPENDCARINFO, FETCHCARS } from "../ActionTypes";
import axios from "../caxios";
import { formdataGenerator } from "./helper";

export const register_car = setScreen => (dispatch, getState) => {
    let car = getState().newCar.newCar;
    car.owner = car.owner._id;
    const formdata = formdataGenerator(car);
    axios.post("/add-car", formdata).then(res => {
        if (res.data.success === 1) {
            setScreen("success");
        } else {
            setScreen("form");
        }
    });
}

export const add_car_info = car_info => dispatch => {
    dispatch({
        type: APPENDCARINFO,
        payload: car_info
    });
}

export const fetch_cars = () => async dispatch => {
    const res = await axios.get("/cars");
    if (res.data.success === 1) {
        dispatch({
            type: FETCHCARS,
            payload: res.data.cars
        });
    }
}