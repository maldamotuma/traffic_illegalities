import React from 'react';
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

const routesList = [
    { path: '/login', element: <Login /> },
    {
        path: '/', element: <Mainpage />, childs: [
            { path: '/', element: <Dashboard /> },
            { path: '/active-session', element: <Activesession /> },
            { path: '/add-operator', element: <AddOperator /> },
            { path: '/add-system-admin', element: <AddSystemAdmin /> },
        ]
    },
];
const RoutingComponent = () => {
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
}

export default RoutingComponent;
