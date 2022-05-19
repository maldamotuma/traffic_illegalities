import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import Basicinfo from '../commonForm/Basicinfo';
import * as trafficOActionBinders from '../../redux/actions/trafficofficeactions';
const Basicinfos = () => {
  
  const dispatch = useDispatch();
  const { add_traffic_office } = bindActionCreators( trafficOActionBinders, dispatch);
  const trafficOffice = useSelector(state => state.traffic_office.newTO);

  return (
    <Basicinfo add_operator={add_traffic_office} operatorInfo={trafficOffice}/>
  )
}

export default Basicinfos