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
import * as operatorActionBinders from '../../redux/actions/operatoractions';
import { bindActionCreators } from 'redux';
import Loading from '../common/Loading';
import Success from '../common/Success';
import FormStepper from '../commonForm/FormStepper';

export default function AddTrafficP() {
    const [screen, setscreen] = React.useState("form");

    const dispatch = useDispatch();
    const { submit_operator } = bindActionCreators(operatorActionBinders, dispatch);

    const steps = ["Traffic Info", "Traffic ID"];
    const components = [<Basicinfos />, <Idcards />];

    if (screen === "loading") return <Loading />;
    else if (screen === "success") return <Success />;
    return (
        <FormStepper
            title={"Add Traffic Police"}
            steps={steps}
            components={components}
        />
    );
}