import React from 'react'
import FormStepper from '../components/commonForm/FormStepper'
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as systemadminactions from "../redux/actions/systemadminactions";
import Basicinfo from '../components/systemadmin/Basicinfo';
import Idcards from '../components/systemadmin/Idcards';

const AddSystemAdmin = () => {
    const dispatch = useDispatch();
    const { submit_system_admin } = bindActionCreators(systemadminactions, dispatch);

    const steps = ["Basic Information", "ID Cards"];
    const components = [<Basicinfo />, <Idcards />];
    return (
        <FormStepper
            title={"Add System Admin"}
            steps={steps}
            components={components}
            submitAction={submit_system_admin}
        />
    )
}

export default AddSystemAdmin
