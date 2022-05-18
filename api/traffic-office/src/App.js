import { Backdrop } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "./components/Router";
import { authUser } from "./redux/slices/auth/authapis";


function App() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    useEffect(() => {
        dispatch(authUser());
    }, []);
    if (user === "UNDEFINED") {
      return <Backdrop open={true}/>
    }
    return (
        <Router />
    );
}

export default App;