import React from 'react'
import { useSelector } from 'react-redux'
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import Dashboard from '../screens/Dashboard'
import Login from '../screens/Login'
import Searchscreen from '../screens/Searchscreen'
import Mainpage from './page/Main'

const routes = [
    {path: "/", element: <Mainpage />, childs: [
        { path: "/", element: <Dashboard /> },
        { path: "/search", element: <Searchscreen /> }
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