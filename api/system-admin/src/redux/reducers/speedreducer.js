import { ADDNEWSPEED, ADDNEWSPEEDCOORDINATES, DELETECOORDINATE } from "../ActionTypes";

const initialState = {
    newSpeed: {
        coordinates: []
    }
}
export const speed_reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDNEWSPEED:
            return { ...state, newSpeed: { ...state.newSpeed, ...action.payload } }
        case ADDNEWSPEEDCOORDINATES:
            return {
                ...state,
                newSpeed: { ...state.newSpeed, coordinates: [...state.newSpeed.coordinates, action.payload] }
            }
        case DELETECOORDINATE:
            let tmpCoordinates = state.newSpeed.coordinates.filter(crdnt => JSON.stringify(crdnt) !== JSON.stringify(action.payload));
            return {
                ...state,
                newSpeed: { ...state.newSpeed, coordinates: [...tmpCoordinates] }
            }
        default:
            return state;
    }
}