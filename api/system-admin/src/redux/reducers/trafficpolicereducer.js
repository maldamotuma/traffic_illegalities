import { ADDNEWTRAFFICPOLICE } from "../ActionTypes";

const initialState = {
    name: {
        first: "",
        last: ""
    },
    // identificationCard: {

    // },
    IDphotos: []
}
export const trafficpolice_reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDNEWTRAFFICPOLICE:
            return {...state, ...action.payload};
        default:
            return state;
    }
}