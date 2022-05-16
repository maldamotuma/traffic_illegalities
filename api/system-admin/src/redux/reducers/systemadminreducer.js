import { ADDSYSTEMADMIN } from "../ActionTypes";

const initialState = {
    newSA: {
        name: {
            first: "",
            last: ""
        }
    }
}
export const systemadmin_reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDSYSTEMADMIN:
            return {...state, newSA: {...state.newSA, ...action.payload } }
        default:
            return state;
    }
}