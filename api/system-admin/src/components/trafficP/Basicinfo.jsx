import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import Basicinfo from '../commonForm/Basicinfo';
import * as trafficPActionBinders from '../../redux/actions/trafficpoliceactions';
const Basicinfos = () => {
  
  const dispatch = useDispatch();
  const { add_traffic_police } = bindActionCreators( trafficPActionBinders, dispatch);
  const operatorInfo = useSelector(state => state.newTrafficPolice.newTrafficPolice);

  return (
    <Basicinfo add_operator={add_traffic_police} operatorInfo={operatorInfo}/>
  )
}

export default Basicinfos