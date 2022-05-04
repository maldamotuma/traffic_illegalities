import React from 'react'
import { useSelector } from 'react-redux'
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import Activesession from '../screens/Activesession'
import Login from '../screens/Login'
import Mainpage from './page/Main'

const routes = [
    {path: "/", element: <Mainpage />, childs: [
        { path: "/active-session", element: <Activesession /> },
    ]}
]


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
                                {
                                    route.childs.map(chld => (
                                        <Route path={chld.path} element={chld.element}/>
                                    ))
                                }
                            </Route>
                        ))
                }
            </Routes>
        </BrowserRouter>
    )
}

export default Router