import { APPENDCARINFO, FETCHCARS, REGISTERCAR } from "../ActionTypes";

export const carReducer = (state = {}, action) => {
    switch (action.type) {
        case APPENDCARINFO:
            return { ...state,newCar: {...state.newCar, ...action.payload} };
        case FETCHCARS:
            return {...state, cars: action.payload}
        default:
            return state;
    }
}