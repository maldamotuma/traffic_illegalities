import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Basicinfos from './Basicinfo';
import Idcards from './Idcards';
import Card from '@mui/material/Card';
import { useDispatch, useSelector } from 'react-redux';
import * as trafficPlcActionBinders from '../../redux/actions/trafficpoliceactions';
import { bindActionCreators } from 'redux';
import Loading from '../common/Loading';
import Success from '../common/Success';
import FormStepper from '../commonForm/FormStepper';
import { validate } from '../car/formValidator';

export default function AddTrafficP() {
    const [screen, setscreen] = React.useState("form");
    const [errors, seterrors] = React.useState([]);
    const [vinfo, setvinfo] = React.useState({});

    const dispatch = useDispatch();
    const { submit_new_traffic_police } = bindActionCreators(trafficPlcActionBinders, dispatch);

    const steps = ["Traffic Info", "Traffic ID"];
    const components = [<Basicinfos errors={errors} setvinfo={setvinfo} />, <Idcards />];
    const validateForm = () => {
        const tmpErrors = validate(vinfo);
        seterrors(tmpErrors);
        return Object.keys(tmpErrors).length;
    }
    const validFinal = () => {
        alert("final malda");
    }

    if (screen === "loading") return <Loading />;
    else if (screen === "success") return <Success />;
    return (
        <FormStepper
            title={"Add Traffic Police"}
            steps={steps}
            components={components}
            submitAction={submit_new_traffic_police}
            validateForm={validateForm}
            validFinal={validFinal}
        />
    );
}