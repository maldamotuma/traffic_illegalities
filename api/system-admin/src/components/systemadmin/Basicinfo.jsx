import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import Basicinfo from '../commonForm/Basicinfo';
import * as systemAdminActionCreators from '../../redux/actions/systemadminactions';

const Basicinfos = () => {
  
  const dispatch = useDispatch();
  const { add_system_admin } = bindActionCreators( systemAdminActionCreators, dispatch);
  const systemAdminInfo = useSelector(state => state.system_admin.newSA);

  return (
    <Basicinfo add_operator={add_system_admin} operatorInfo={systemAdminInfo}/>
  )
}

export default Basicinfos