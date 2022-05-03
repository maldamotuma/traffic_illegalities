import React from 'react'
import { useSelector } from 'react-redux'
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import Login from '../screens/Login'
import Mainpage from './page/Main'

const routes = [
    { path: "/", element: <Mainpage /> },
];

const Router = () => {
    const user = useSelector(state => state.user);
    return (
        <BrowserRouter>
            <Routes>
                {
                    user === null ?
                        <Route path={"/*"} element={<Login />}>
                        </Route>
                        :
                        routes.map(route => (
                            <Route path={route.path} element={route.element}>
                            </Route>
                        ))
                }
            </Routes>
        </BrowserRouter>
    )
}

export default Router