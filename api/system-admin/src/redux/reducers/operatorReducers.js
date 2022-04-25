import { ADDOPERATOR, SUBMITOPERATOR } from "../ActionTypes";

const initialState = {
    name: {
        first: "",
        last: ""
    },
    region: {
        coordinates: {lat: 0, lng: 0},
        radius: 50
    }
}
export const OperatorReducers = (state = initialState, action) => {
    switch (action.type) {
        case ADDOPERATOR:
            return {...state, ...action.payload};
        case SUBMITOPERATOR:
            return initialState;
        default:
            return state;
    }
}