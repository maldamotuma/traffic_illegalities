import React from 'react';
import FormStepper from '../components/commonForm/FormStepper';
import { useDispatch, useSelector } from 'react-redux';
import * as trafficOlcActionBinders from '../redux/actions/trafficofficeactions';
import { bindActionCreators } from 'redux';
import Basicinfos from '../components/trafficOffice/BasicInfos';
import Idcards from '../components/trafficOffice/IDCards';

const AddTrafficOffice = () => {
    const dispatch = useDispatch();
    const { submit_traffic_office } = bindActionCreators(trafficOlcActionBinders, dispatch);

    const steps = ["Office Info", "Office ID"];
    const components = [<Basicinfos />, <Idcards />];

    return (
        <FormStepper
            title={"Add Traffic Office"}
            steps={steps}
            components={components}
            submitAction={submit_traffic_office}
        />
    )
}

export default AddTrafficOffice;