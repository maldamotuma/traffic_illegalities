import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { io } from 'socket.io-client';
import Mapfitun from '../components/mapcomponents/Mapfitun';
import * as operatorActionBinders from '../redux/actions/trackActions';

const CarSocket = io(process.env.REACT_APP_SERVER + "/car");

const Activesession = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { track_car } = bindActionCreators( operatorActionBinders, dispatch);
    useEffect(() => {
        // CarSocket.emit("operator_join", user?._id );
        CarSocket.on('track_car', (carInfo) => {
            console.log(carInfo);
            track_car(carInfo);
        });
    }, []);
    
    return (<Mapfitun filtersView track/>)
}

export default Activesession
