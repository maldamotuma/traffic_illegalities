import { Backdrop } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "./components/Router";
import { authUser } from "./redux/slices/auth/authapis";
import { addTrack } from "./redux/slices/track/trackSlice";
import user_traffic_socket from "./redux/socketfile";
import "./googlemapstyles.css";


function App() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    useEffect(() => {
        dispatch(authUser());
    }, []);
    if (user === "UNDEFINED") {
        return (
            <>
                <Backdrop open={true} />
            </>
        )
    }
    return (
        <>
            <audio src="sounds/message.mp3" id="message_audio" loop="loop"></audio>
            <Router />
        </>
    );
}

export default App;