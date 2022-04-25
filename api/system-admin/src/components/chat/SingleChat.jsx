import { Card,
	Chip,
	CardHeader, Avatar, Paper, Box, Typography, CardActions, Button, Stack, IconButton } from "@mui/material";
import { styled } from '@mui/system';
import { SendOutlined, CloseRounded } from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as conversationActions from '../../redux/actions/messagesAction';
import { AdminPanelSettings } from "@mui/icons-material";
import Online from "./Online";

const TopChat = ({conversation}) => {
	const dispatch = useDispatch();
	const { remove_conversation_from_screen } = bindActionCreators(conversationActions, dispatch);
	return (
			<CardHeader
			avatar = {
				<Avatar src="https://picsum.photos/200" sx={{width: '45px', height: '45px'}}>M</Avatar>
			}
			title={
				<Typography color={"#fff"} fontWeight={700}>
					{conversation.name.first + " " + conversation.name.last}
				</Typography>
			}
			subheader={
				<Online>
					<Chip
					icon={<AdminPanelSettings />}
					label="S.Admin"
					size="small"
					color="secondary"
					/>
				</Online>
			}

			action={
				<IconButton color={"secondary"} onClick={() => remove_conversation_from_screen(conversation)}>
					<CloseRounded sx={{ color: '#aaffff' }}/>
				</IconButton>
			}
			sx={{
				bgcolor: 'primary.main',
				border: '0 !important',
				py: '10px !important',
				color: '#fff !important'
			}}
			/>
	)
}

const StyledInput = styled('input')({
	padding: '5px 10px',
	border: '2px solid #1976D2 !important',
	borderRadius: '10px 0 0 10px',
	outline: 'none',
	fontSize: '1em',
});
const TextArea = ({ conversation }) => {
	const [message, setMessage] = useState("");
	const dispatch = useDispatch();
	const { add_new_message } = bindActionCreators(conversationActions, dispatch);
	const socket = useSelector(state => state.socket.socket);
	const me = useSelector(state => state.user);
	const handleSubmit = e => {
		e.preventDefault();
		const {participatorType, pid} = conversation.participators.find(prt => (prt.pid !== me._id || prt.participatorType !== "Systemadmin"));
		const smessage = {
			text: message,
			sender: {
				participatorType: 'Systemadmin',
				pid: me._id,
			},
			receiver: {participatorType, pid}
		}
		add_new_message(smessage, conversation._id);
		socket.emit("new_message", smessage, conversation._id);
		setMessage("");
	}
	return (
		<CardActions sx={{
			position: 'absolute',
			bottom: 0,
			borderTop: '1px solid #aaa',
			width: '100%',
		}}>
			<Box component={"form"} onSubmit={handleSubmit}>
				<Stack sx={{width: '100%'}} direction={"row"} justifyContent={"center"}>
					<StyledInput placeholder={"Yout message..."}
					onChange={e => setMessage(e.target.value)}
					value={message}
					/>
					<Button
					type={"submit"}
					variant={"contained"} sx={{
						borderRadius: '0 5px 5px 0',
					}}>
						<SendOutlined sx={{ width: '20px', height: '20px' }}/>
					</Button>
				</Stack>
			</Box>
		</CardActions>
	)
}

const SingleMessage = ({message}) => {
	const me = useSelector(state => state.user);
	return (
		<Card sx={{
			bgcolor: message.sender.pid === me._id && message.sender.participatorType === "Systemadmin" ? 'info.main' : "#777",
			display: 'inline-block',
			maxWidth: '200px',
			float: message.sender.pid === me._id && message.sender.participatorType === "Systemadmin" ? 'right' : 'left',
			clear: 'both',
			my: .1,
			color: '#fff',
			px: 1,
			py: .2
		}}>
			<Typography>
				{message.text}
			</Typography>
			<Typography variant={"caption"} sx={{
				float: 'right'
			}}>
				2min ago
			</Typography>
		</Card>
	)
}

const SingleChat = ({conversation}) => {
	const conversations = useSelector(state => state.conversations);

	const messRef = useRef();
	useEffect(()=>{
		messRef.current.scrollTop = messRef.current.scrollHeight;
	},[conversations]);
	return (
		<Paper sx={{
			width: '300px',
			height: '400px',
			borderRadius: '10px',
			boxShadow: "0 4px 10px #bbb, 0 -4px 10px #bbb, 4px 0 10px #bbb, -4px 0 10px #bbb",
			overflow: 'hidden'
		}}
		>
			<Card elevation={0} sx={{
				height: '100%',
			}}>
			<TopChat conversation={conversation}/>
			<Box ref={messRef} sx={{
				px: 1,
				maxHeight: '277px',
				overflow: 'auto',
				scrollBehavior: 'smooth'
			}}>
			{
				conversation?.messages?.map (msg => (
					<SingleMessage message={msg}/>
				))
			}
			</Box>
			<TextArea conversation={conversation}/>
			</Card>
		</Paper>
	)
}

export default SingleChat;