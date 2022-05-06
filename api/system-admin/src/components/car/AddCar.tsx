import * as React from 'react';
import Basicinfo from './BasicInfo';
import CarOwner from './CarOwner';
import CarPhotos from './CarPhotos';
import FormStepper from '../commonForm/FormStepper';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as carActionCreators from "../../redux/actions/carActions";

export default function AddCar() {
    const dispatch = useDispatch();
    const { register_car } = bindActionCreators(carActionCreators, dispatch);

    const steps = ["Basic Information", "Car Owner", "Car Images"];
    const components = [<Basicinfo />, <CarOwner />, <CarPhotos />];
    return (
        <FormStepper
            title={"Add Car"}
            steps={steps}
            components={components}
            submitAction={register_car}
        />
    );
}