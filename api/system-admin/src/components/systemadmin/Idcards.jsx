import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Idcards from '../commonForm/Idcards';
import AddIdscomponent from '../commonForm/AddIdscomponent';
import Idphotos from '../commonForm/Idphotoscomponent';
import IDForm from '../commonForm/Identificationform';
import { bindActionCreators } from 'redux';
import * as systemAdminActionCreators from '../../redux/actions/systemadminactions';

const Idcard = () => {

  const dispatch = useDispatch();
  const { add_system_admin } = bindActionCreators( systemAdminActionCreators, dispatch);

  const newSA = useSelector(state => state.system_admin.newSA);
  const personId = newSA.identificationCard;

  return (
    <Idcards personId={personId}>
      <AddIdscomponent
        Idphotoscomponent={<Idphotos newOperator={newSA}/>}
        Identificationform={<IDForm personId={personId} add_operator={add_system_admin}/>}
        add_operator = { add_system_admin }
      />
    </Idcards>
  )
}

export default Idcard