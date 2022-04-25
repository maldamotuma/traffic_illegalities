import React, { useEffect } from 'react';
import {
    Routes,
    Route
} from "react-router-dom";
import Login from '../screens/Login'
import Dashboard from '../screens/Dashboard';
import Mainpage from '../screens/Mainpage';
import Activesession from '../screens/Activesession';
import AddOperator from '../screens/AddOperator';
import AddSystemAdmin from '../screens/AddSystemAdmin';
import { connect } from 'react-redux'
import { checkAuth } from '../redux/actions/authactions';
import FullscreenBackDrop from './FullscreenBackDrop';
import CreateNewPassword from '../screens/CreateNewPassword';
import ChangePassword from '../screens/ChangePassword';
import ForgotPassword from '../screens/ForgotPassword';
import AddCar from '../screens/AddCar.jsx';
import CarList from '../screens/CarList';
import AddTrafficPolice from '../screens/AddTrafficPolice';
import AddSpeed from '../screens/AddSpeed';

const routesList = [
    // { path: '/login', element: <Login /> },
    {
        path: '/', element: <Mainpage />, childs: [
            { path: '/', element: <Dashboard /> },
            { path: '/active-session', element: <Activesession /> },
            { path: '/add-operator', element: <AddOperator /> },
            { path: '/add-car', element: <AddCar /> },
            { path: '/car-list', element: <CarList /> },
            { path: '/add-system-admin', element: <AddSystemAdmin /> },
            { path: '/add-speed-region', element: <AddSpeed /> },
            { path: '/add-traffic-police', element: <AddTrafficPolice /> },
            { path: '/create-new-password', element: <CreateNewPassword /> },
            { path: '/change-password', element: <ChangePassword /> },
        ]
    },
];
const RoutingComponent = ({checkAuth, user}) => {
    useEffect(() => {
        checkAuth();
    }, []);

    if(user === -1) {
        return <FullscreenBackDrop />
    }else if(user?.oneTime){
        return (
            <Routes>
                <Route path={"*"} element={<CreateNewPassword />}/>
            </Routes>
        )
    }else if(user) {
        return (
        <Routes>
            {
                // eslint-disable-next-line array-callback-return
                routesList.map(url => (
                    <>
                        {!url.childs && <Route path={url.path} element={url.element} />}
                        {url.childs && (
                            <Route path={url.path} element={url.element}>
                                {
                                    url.childs.map(urlc => (
                                        <Route path={urlc.path} element={urlc.element} key={`child${urlc.path}`} />
                                    ))
                                }
                            </Route>
                        )}
                    </>
                ))
            }
        </Routes>
    )

    }else {
        return (
            <Routes>
                <Route path={'/forgot-password'} element={<ForgotPassword />} />
                <Route path={'*'} element={<Login />}/>
            </Routes>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = {
    checkAuth: checkAuth
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutingComponent)
