import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import Mapfitun from '../components/mapcomponents/Mapfitun';
import * as speedActionCreators from '../redux/actions/speedactions';

const SpeedLimits = () => {

    const dispatch = useDispatch();
    const { fetch_speed_limits } = bindActionCreators(speedActionCreators, dispatch);
    const speedlimits = useSelector(state => state.speed.speedlimits);
    useEffect(() => {
        fetch_speed_limits();
    }, [])
    
    return (
        <Mapfitun speedlimits={speedlimits}/>
    )
}

export default SpeedLimits