import { FIXEDNOTIFICATION } from '../ActionTypes';

export const helperReducer = (state = {fixedNotification: {open: false}}, action) => {
	switch (action.type) {
        case FIXEDNOTIFICATION:
            return {fixedNotification: action.payload};
        default:
            return state;
    }
}