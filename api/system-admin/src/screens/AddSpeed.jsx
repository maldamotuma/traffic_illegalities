import * as React from 'react';
import { useDispatch } from 'react-redux';
import * as speedActionBinders from '../redux/actions/speedactions';
import { bindActionCreators } from 'redux';
import FormStepper from '../components/commonForm/FormStepper';
import AddSpeedInfo from '../components/speed/AddSpeedInfo';

export default function AddSpeed() {
    const dispatch = useDispatch();
    const { submit_new_speed_limit } = bindActionCreators(speedActionBinders, dispatch);

    const steps = ["Related Informations"];
    const components = [<AddSpeedInfo />];

    return (
        <FormStepper
            title={"Add Speed Region"}
            steps={steps}
            components={components}
            large={true}
            submitAction={submit_new_speed_limit}
            not_validate_final={true}
        />
    );
}