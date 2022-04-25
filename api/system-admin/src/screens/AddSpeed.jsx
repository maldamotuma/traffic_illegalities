import * as React from 'react';
import { useDispatch } from 'react-redux';
import * as operatorActionBinders from '../redux/actions/operatoractions';
import { bindActionCreators } from 'redux';
import FormStepper from '../components/commonForm/FormStepper';
import AddSpeedInfo from '../components/speed/AddSpeedInfo';

export default function AddSpeed() {
    const dispatch = useDispatch();
    const { submit_operator } = bindActionCreators(operatorActionBinders, dispatch);

    const steps = ["Related Informations"];
    const components = [<AddSpeedInfo />];

    return (
        <FormStepper
            title={"Add Speed Region"}
            steps={steps}
            components={components}
            large={true}
        />
    );
}