import React, { useState } from 'react';
import FormStepper from '../components/commonForm/FormStepper';
import { useDispatch, useSelector } from 'react-redux';
import * as trafficOlcActionBinders from '../redux/actions/trafficofficeactions';
import { bindActionCreators } from 'redux';
import Basicinfos from '../components/trafficOffice/BasicInfos';
import Idcards from '../components/trafficOffice/IDCards';
import { validate } from '../components/car/formValidator';

const AddTrafficOffice = () => {
    const [vinfo, setvinfo] = useState({});
    const [errors, seterrors] = useState({});

    const dispatch = useDispatch();
    const { submit_traffic_office } = bindActionCreators(trafficOlcActionBinders, dispatch);

    const steps = ["Office Info", "Office ID"];
    const components = [<Basicinfos errors={errors} setvinfo={setvinfo} />, <Idcards />];

    const validateForm = () => {
        const tmpErrors = validate(vinfo);
        seterrors(tmpErrors);
        return Object.keys(tmpErrors).length;
    }
    const validFinal = () => {
        alert("true");
    }

    return (
        <FormStepper
            title={"Add Traffic Office"}
            steps={steps}
            components={components}
            submitAction={submit_traffic_office}
            validateForm={validateForm}
            validFinal={validFinal}
        />
    )
}

export default AddTrafficOffice;