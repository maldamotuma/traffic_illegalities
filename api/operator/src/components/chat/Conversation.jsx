import {
    Card,
    Chip,
    CardHeader, Avatar, Paper, Box, Typography, CardActions, Button, Stack, IconButton, Grow
} from "@mui/material";
import { styled } from '@mui/system';
import { SendOutlined, CloseRounded } from '@mui/icons-material';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
// import * as conversationActions from '../../redux/actions/messagesAction';
import * as userttrafficactionbinders from '../../redux/slices/assignment/usertrafficslicer';
import { AdminPanelSettings, FiberSmartRecord, MoreVertRounded } from "@mui/icons-material";
import { removeMessageFromView } from "../../redux/slices/chat/chatSlice";
import ActionMenu from "./Actionmenu";
import { newMessage } from "../../redux/slices/chat/chatapi";
// import Online from "./Online";
import Moment from 'react-moment';

const TopChat = ({ conversation }) => {
    const dispatch = useDispatch();
    // const { remove_conversation_from_screen } = bindActionCreators(conversationActions, dispatch);
    const { join_user_traffic } = bindActionCreators(userttrafficactionbinders, dispatch);
    const assignment = useSelector(state => state.assignment?.user);

    const handleRemoveFromScreen = () => {
        dispatch(removeMessageFromView(conversation._id));
    }

    const handleSelect = () => {
        join_user_traffic({user: conversation.user?._id});
    }
    const handleUnselect = (e) => {
        e.preventDefault();
        join_user_traffic({user: null});
    }
    return (
        <CardHeader
            avatar={
                <Box
                    sx={{
                        position: "relative",
                        p: .5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    onClick={handleSelect}
                    onContextMenu={handleUnselect}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            background: "rgb(131,58,180)",
                            background: "linear-gradient(39deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
                            borderRadius: "50%",
                            opacity: assignment === conversation.user?._id ? .7 : 0
                        }}
                    ></Box>
                    <Avatar
                        src="https://picsum.photos/200"
                        sx={{
                            width: '45px',
                            height: '45px',
                            boxShadow: 5,
                            border: assignment === conversation.user?._id ? "2px solid #5C19AD" : "",
                            transition: ".1s all ease-in-out"
                        }}
                    >M</Avatar>
                </Box>
            }
            title={
                <Typography color={"#fff"} fontWeight={700}>
                    {conversation.user?.name.first + " " + conversation.user?.name.last}
                </Typography>
            }
            subheader={
                // <Online>
                <Chip
                    icon={<FiberSmartRecord />}
                    label="Online"
                    size="small"
                    color="success"
                />
                // </Online>
            }

            action={
                // <IconButton color={"secondary"}
                //     onClick={() => dispatch(removeMessageFromView(conversation._id))}
                // >
                //     <CloseRounded sx={{ color: '#aaffff' }} />
                //     <MoreVertRounded sx={{ color: '#aaffff' }} />
                <ActionMenu removeMessageFromView={handleRemoveFromScreen} />
                //  </IconButton>
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
    const me = useSelector(state => state.user);
    const useSocket = useSelector(state => state.socket.user);

    const handleSubmit = e => {
        e.preventDefault();
        const smessage = {
            _id: conversation._id,
            text: message,
            sender: {
                participatorType: 'Operator',
                pid: me._id,
            },
            receiver: {
                participatorType: 'User',
                pid: conversation.user._id,
            }
        }
        dispatch(newMessage({
            _id: conversation._id,
            message: {
                text: message,
                sender: {
                    participatorType: 'Operator',
                    pid: me._id,
                },
                receiver: {
                    participatorType: 'User',
                    pid: conversation.user._id,
                },
                createdAt: Date.now()
            }
        }));
        useSocket.emit("send_message", smessage, "us_" + conversation.user._id);
        setMessage("");
    }
    return (
        <CardActions sx={{
            position: 'absolute',
            bottom: 0,
            borderTop: '1px solid #aaa',
            width: '100%',
        }}>
            <Box component={"form"}
                onSubmit={handleSubmit}
            >
                <Stack sx={{ width: '100%' }} direction={"row"} justifyContent={"center"}>
                    <StyledInput placeholder={"Yout message..."}
                        onChange={e => setMessage(e.target.value)}
                        value={message}
                    />
                    <Button
                        type={"submit"}
                        variant={"contained"} sx={{
                            borderRadius: '0 5px 5px 0',
                        }}>
                        <SendOutlined sx={{ width: '20px', height: '20px' }} />
                    </Button>
                </Stack>
            </Box>
        </CardActions>
    )
}

const SingleMessage = ({ message }) => {
    const me = useSelector(state => state.user);
    return (
        <Card sx={{
            bgcolor: message.sender.pid === me._id && message.sender.participatorType === "Operator" ? 'info.main' : "#777",
            display: 'inline-block',
            maxWidth: '200px',
            float: message.sender.pid === me._id && message.sender.participatorType === "Operator" ? 'right' : 'left',
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
                {/* <TimeAgo
                    datetime=
                    /> */}
                <Moment fromNow>
                    {message.createdAt}
                </Moment>
            </Typography>
        </Card>
    )
}

const Conversation = ({ conversation }) => {
    const [inconv, setinconv] = useState(false);

    useEffect(() => {
        setinconv(true);
    }, [])
    // const conversations = useSelector(state => state.conversations);

    const messRef = useRef();
    useEffect(() => {
        messRef.current.scrollTop = messRef.current.scrollHeight;
    }, [conversation.messages]);
    return (
        <Grow in={conversation.hide ? false : true}>
            <Paper sx={{
                width: '300px',
                height: '400px',
                borderRadius: '10px',
                boxShadow: "0 4px 10px #0099ff, 0 -4px 10px #0099ff, 4px 0 10px #0099ff, -4px 0 10px #0099ff",
                overflow: 'hidden'
            }}
            >
                <Card elevation={0} sx={{
                    height: '100%',
                }}>
                    <TopChat
                        conversation={conversation}
                    />
                    <Box
                        ref={messRef}
                        sx={{
                            px: 1,
                            maxHeight: '277px',
                            overflow: 'auto',
                            scrollBehavior: 'smooth'
                        }}>
                        {
                            conversation?.messages?.map(msg => (
                                <SingleMessage
                                    message={msg}
                                />
                            ))
                        }
                    </Box>
                    <TextArea conversation={conversation} />
                </Card>
            </Paper>
        </Grow>
    )
}

export default Conversation;