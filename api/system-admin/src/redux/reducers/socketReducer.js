import { ADD_SOCKET_INFO, ADDONLINEUSERS } from "../ActionTypes";

export const SocketReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_SOCKET_INFO:
            return {...state, ...action.payload};
        case ADDONLINEUSERS:
            return {...state, onlineUsers: action.payload};
        default:
            return state;
    }
}