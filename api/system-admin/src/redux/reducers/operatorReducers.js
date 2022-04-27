import { ADDOPERATOR, FETCHOPERATORS, SUBMITOPERATOR } from "../ActionTypes";

const initialState = {
    newOperator: {
        name: {
            first: "",
            last: ""
        },
        region: {
            coordinates: { lat: 0, lng: 0 },
            radius: 50
        }
    }
}
export const OperatorReducers = (state = initialState, action) => {
    switch (action.type) {
        case ADDOPERATOR:
            return { ...state, newOperator: { ...state.newOperator, ...action.payload } };
        case SUBMITOPERATOR:
            return initialState;
        case FETCHOPERATORS:
            return { ...state, operators: action.payload }
        default:
            return state;
    }
}