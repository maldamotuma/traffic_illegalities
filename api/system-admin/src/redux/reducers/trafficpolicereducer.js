import { ADDNEWTRAFFICPOLICE, FETCHTRAFFICPOLICES } from "../ActionTypes";

const initialState = {
    newTrafficPolice: {
        name: {
            first: "",
            last: ""
        },
        // identificationCard: {

        // },
        IDphotos: []
    }
}
export const trafficpolice_reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDNEWTRAFFICPOLICE:
            return { ...state, newTrafficPolice: { ...state.newTrafficPolice, ...action.payload } };
        case FETCHTRAFFICPOLICES:
            return { ...state, trafficPolices: action.payload }
        default:
            return state;
    }
}