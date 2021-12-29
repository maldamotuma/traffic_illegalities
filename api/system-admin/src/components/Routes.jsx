import React from 'react';
import {
    Routes,
    Route
} from "react-router-dom";
import Login from '../screens/Login'
import Dashboard from '../screens/Dashboard';
import Mainpage from '../screens/Mainpage';
import Activesession from '../screens/Activesession';

const RoutingComponent = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Mainpage />} >
                <Route path="/" element={<Dashboard />} />
                <Route path="/active-session" element={<Activesession />} />
            </Route>
        </Routes>
    )
}

export default RoutingComponent;
