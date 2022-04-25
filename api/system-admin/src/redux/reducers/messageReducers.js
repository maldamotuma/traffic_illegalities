import { ADD_MESSAGE, ADDNEWCONVERSATION, REMOVECONVERSATIONFROMSCREEN } from '../ActionTypes';

export const message_reducer = (state = [], action) => {
	switch(action.type) {
		case ADDNEWCONVERSATION:
			return [action.payload, ...state];
		case REMOVECONVERSATIONFROMSCREEN:
			return state.filter(st => st.fastId !== action.payload.fastId);
		case ADD_MESSAGE:
			let indexOfElement = state.findIndex(cvn => cvn._id === action.payload.convid);
			let newState = [...state];
			newState[indexOfElement].messages.push(action.payload.message);
			return newState;
		default:
			return state;
	}
}