import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ListItemButton from "@mui/material/ListItemButton";
import Online from "../chat/Online";
import { useSelector, useDispatch } from 'react-redux';
import * as conversationActions from '../../redux/actions/messagesAction';
import { bindActionCreators } from 'redux';


export default function OnlineList() {

	const dispatch = useDispatch();
	const onlineUsers = useSelector(state => state.socket.onlineUsers);
	const me = useSelector(state => state.user);
	const { add_new_conversation } = bindActionCreators(conversationActions, dispatch);

 	return (
    	<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
	      {
	      	onlineUsers && onlineUsers.map(user => (
	      		<ListItem sx={{
	      			bgcolor: me._id === user.id ? "#eee" : "#fff"
	      		}}>
				    <ListItemButton onClick={() => me._id === user.id ? null : add_new_conversation(user, me._id)}>
				        <ListItemAvatar>
				          <Avatar src={"https://picsum.photos/200"} alt={""} />
				        </ListItemAvatar>
				        <ListItemText primary={user.name.first +" "+user.name.last} secondary={<Online color={"success.main"}/>} />
				    </ListItemButton>
			    </ListItem>
	      	))
	      }
	    </List>
  );
}
