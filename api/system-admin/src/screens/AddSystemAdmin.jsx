import React, { useState } from 'react'
import FormStepper from '../components/commonForm/FormStepper'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as systemadminactions from "../redux/actions/systemadminactions";
import Basicinfo from '../components/systemadmin/Basicinfo';
import Idcards from '../components/systemadmin/Idcards';
import { validate } from '../components/car/formValidator';
import Formsnack from '../components/commonForm/Formsnack';

const AddSystemAdmin = () => {
    const [vinfo, setvinfo] = useState({});
    const [errors, seterrors] = useState({});
    const [open, setopen] = useState(false);

    const dispatch = useDispatch();
    const { submit_system_admin } = bindActionCreators(systemadminactions, dispatch);
    const idcard = useSelector(state => state.system_admin.newSA.identificationCard);

    const steps = ["Basic Information", "ID Cards"];
    const components = [<Basicinfo errors={errors} setvinfo={setvinfo} />, <Idcards />];
    const validateForm = () => {
        const tmpErrors = validate(vinfo);
        seterrors(tmpErrors);
        return Object.keys(tmpErrors).length;
    }
    const validFinal = () => {
        setopen(true);
    }
    return (
        <>
            <Formsnack status={open} setopen={setopen}/>
            <FormStepper
                title={"Add System Admin"}
                steps={steps}
                components={components}
                submitAction={submit_system_admin}
                validateForm={validateForm}
                validFinal={validFinal}
            />
        </>
    )
}

export default AddSystemAdmin
