import { TRACKCAR } from '../ActionTypes';
const initialState = {
    car: {},
    traffic: {},
    customer: {}
}
export const track_reducer = (state = initialState, action) => {
    switch (action.type) {
        case TRACKCAR:
            return {...state, car: action.payload};
        default:
            return state;
    }
}