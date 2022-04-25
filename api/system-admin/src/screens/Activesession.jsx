import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { io } from 'socket.io-client';
import Mapfitun from '../components/mapcomponents/Mapfitun';
import * as operatorActionBinders from '../redux/actions/trackActions';

const CarSocket = io("http://localhost:5000/car");

const Activesession = () => {
    // const socket = useSelector(state => state);
    const dispatch = useDispatch();
    const { track_car } = bindActionCreators( operatorActionBinders, dispatch);
    useEffect(() => {
        CarSocket.on('track_car', (carInfo) => {
            track_car(carInfo);
        });
    }, []);
    
    return (<Mapfitun filtersView track/>)
}

export default Activesession
