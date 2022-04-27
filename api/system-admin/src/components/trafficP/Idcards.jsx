import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Idcards from '../commonForm/Idcards';
import AddIdscomponent from '../commonForm/AddIdscomponent';
import Idphotos from '../commonForm/Idphotoscomponent';
import IDForm from '../commonForm/Identificationform';
import { bindActionCreators } from 'redux';
import * as trafficPActionBinders from '../../redux/actions/trafficpoliceactions';

const Idcard = () => {

  const dispatch = useDispatch();
  const { add_traffic_police } = bindActionCreators(trafficPActionBinders, dispatch);

  const newTrafficPolice = useSelector(state => state.newTrafficPolice.newTrafficPolice);
  const personId = newTrafficPolice.identificationCard;

  return (
    <Idcards personId={personId}>
      <AddIdscomponent
        Idphotoscomponent={<Idphotos newOperator={newTrafficPolice}/>}
        Identificationform={<IDForm personId={personId} add_operator={add_traffic_police}/>}
        add_operator = { add_traffic_police }
      />
    </Idcards>
  )
}

export default Idcard