import { Box } from '@mui/material';
// import SingleChat from './SingleChat';
import { io } from "socket.io-client";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import * as socketActionCreators from '../../redux/actions/socketActions';
// import * as messageActions from '../../redux/actions/messagesAction';
// import { bindActionCreators } from 'redux';
import Conversation from './Conversation';
import { newMessage } from '../../redux/slices/chat/chatapi';
import { setUserSocket } from '../../redux/slices/socket/socket';

const UserSocket = io("http://localhost:5000/userOperator");

const Index = () => {

	const dispatch = useDispatch();
	// const { add_socket_info, online_users } = bindActionCreators(socketActionCreators, dispatch);
	// const { add_new_message } = bindActionCreators(messageActions, dispatch);
	const { user, conversations } = useSelector(state => state);
	useEffect(() => {
		dispatch(setUserSocket(UserSocket));
		if (user._id) {
			UserSocket.emit("join", user._id);

			UserSocket.on("receive_message", (conv) => {
				dispatch(newMessage(conv));
			});
			console.log("this is user malda !!: ", user);
		}
	}, [user?._id]);
	return (
		<Box sx={{
			display: "flex",
			position: "fixed",
			right: "3em",
			bottom: "2em",
			zIndex: 9,
			gap: 2
		}}>
			{
				conversations.filter(cnv => cnv.hide !== true).map(conversation => (
					<div key={conversation._id}>
						<Conversation conversation={conversation} />
					</div>
				))
			}
			{/* <Conversation />
        <Conversation />
        <Conversation />
        <Conversation /> */}
		</Box>
	)
}

export default Index;