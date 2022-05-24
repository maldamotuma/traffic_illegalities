import * as React from 'react';
import Basicinfo from './BasicInfo';
import CarOwner from './CarOwner';
import CarPhotos from './CarPhotos';
import FormStepper from '../commonForm/FormStepper';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as carActionCreators from "../../redux/actions/carActions";
import * as operationActionCreators from "../../redux/actions/Operationactions";
import { validate } from './formValidator';

export default function AddCar() {
    const [vinfo, setvinfo] = React.useState();
    const [errors, seterrors] = React.useState();
    const dispatch = useDispatch();
    const { register_car } = bindActionCreators(carActionCreators, dispatch);
    const { notify } = bindActionCreators(operationActionCreators, dispatch);
    const photos = useSelector(state => state.newCar?.newCar?.photos);

    const steps = ["Basic Information", "Car Owner", "Car Images"];
    const components = [<Basicinfo setvinfo={setvinfo} errors={errors} />, <CarOwner setvinfo={setvinfo} errors={errors} />, <CarPhotos setvinfo={setvinfo} />];

    const validateForm = () => {
        const tmpErrors = validate(vinfo);
        seterrors(tmpErrors);
        return Object.keys(tmpErrors).length;
    }
    const validFinal = () => {
        if (photos) {
            return true;
        } else {
            dispatch(notify({
                type: "warning",
                msg: "Please Provide Car photos"
            }));
            return false;
        }
    }
    return (
        <FormStepper
            title={"Add Car"}
            steps={steps}
            components={components}
            submitAction={register_car}
            validateForm={validateForm}
            validFinal={validFinal}
        />
    );
}