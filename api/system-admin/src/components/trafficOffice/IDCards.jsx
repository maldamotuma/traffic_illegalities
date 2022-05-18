import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Idcards from '../commonForm/Idcards';
import AddIdscomponent from '../commonForm/AddIdscomponent';
import Idphotos from '../commonForm/Idphotoscomponent';
import IDForm from '../commonForm/Identificationform';
import { bindActionCreators } from 'redux';
import * as trafficOActionBinders from '../../redux/actions/trafficofficeactions';

const Idcard = () => {

  const dispatch = useDispatch();
  const { add_traffic_office } = bindActionCreators(trafficOActionBinders, dispatch);

  const newTrafficOffice = useSelector(state => state.traffic_office.newTO);
  const personId = newTrafficOffice.identificationCard;

  return (
    <Idcards personId={personId}>
      <AddIdscomponent
        Idphotoscomponent={<Idphotos newOperator={newTrafficOffice}/>}
        Identificationform={<IDForm personId={personId} add_operator={add_traffic_office}/>}
        add_operator = { add_traffic_office }
      />
    </Idcards>
  )
}

export default Idcard