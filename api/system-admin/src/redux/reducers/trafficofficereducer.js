import { ADDTRAFFICOFFICE } from "../ActionTypes";

const initialState = {
    newTO: {
        name: {
            first: "",
            last: ""
        }
    }
}

export const traffic_office_reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDTRAFFICOFFICE:
            return {...state, newTO: {...state.newTO, ...action.payload } }
        default:
            return state;
    }
}