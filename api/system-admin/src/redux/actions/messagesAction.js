import axios from "../caxios";
import { ADD_MESSAGE, ADDNEWCONVERSATION, REMOVECONVERSATIONFROMSCREEN } from '../ActionTypes';

export const add_new_conversation = (user, myId) => async dispatch => {
	const participators = [
		{ type: user.participatorType, id: user.id },
		{ type: 'Systemadmin', id: myId }
	];
	const res = await axios.get(`/get-conversation?ids[]=${JSON.stringify(participators)}`);
	if (res.data.success === 1) {
		dispatch({
			type: ADDNEWCONVERSATION,
			payload: {...res.data.conversation, name: user.name}
		});
	}
}

export const remove_conversation_from_screen = conversation => dispatch => {
	dispatch({
		type: REMOVECONVERSATIONFROMSCREEN,
		payload: conversation
	});
}

export const add_new_message = (message, convid) => (dispatch) => {
	console.log(convid);
	return dispatch({
		type: ADD_MESSAGE,
		payload: { message, convid }
	});
}