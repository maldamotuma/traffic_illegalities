import { Box } from '@mui/material';
import SingleChat from './SingleChat';
import { io } from "socket.io-client";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as socketActionCreators from '../../redux/actions/socketActions';
import * as messageActions from '../../redux/actions/messagesAction';
import { bindActionCreators } from 'redux';

const socket = io(process.env.REACT_APP_SERVER);

const Index = () => {

	const dispatch = useDispatch();
	const { add_socket_info, online_users } = bindActionCreators(socketActionCreators, dispatch);
	const { add_new_message } = bindActionCreators(messageActions, dispatch);
	const {user, conversations} = useSelector(state => state);
	useEffect(()=>{
		add_socket_info({ socket })
		socket.emit("online", {
			name: user.name,
			participatorType: 'Systemadmin',
			id: user._id
		});
		socket.on("online_users", onlineUsers => {
			online_users(onlineUsers);
		});
		socket.on("receive_message", (message, convid) => {
			add_new_message(message, convid);
		});
	},[]);
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
			conversations.map(conversation => <SingleChat conversation={conversation}/>)
		}
		</Box>
	)
}

export default Index;