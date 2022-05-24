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
import Basicinfo from './Basicinfo';
import Idcards from './Idcards';
import Card from '@mui/material/Card';
import { useDispatch, useSelector } from 'react-redux';
import * as operatorActionBinders from '../../redux/actions/operatoractions';
import { bindActionCreators } from 'redux';
import AddRegion from './AddRegion';
import Loading from '../common/Loading';
import Success from '../common/Success';

const theme = createTheme();

export default function FormStepper(props) {
    const { title, steps, components, large, submitAction, validateForm, validFinal } = props;
    const [activeStep, setActiveStep] = React.useState(0);
    const [screen, setscreen] = React.useState("form");

    const dispatch = useDispatch();
    const { submit_operator } = bindActionCreators( operatorActionBinders, dispatch);

    const handleNext = () => {
        if (validateForm() === 0) {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleSubmit = e => {
        if (validFinal()) {
            setscreen("loading");
            submit_operator(setscreen);
            submitAction(setscreen);
        }
    }
    if(screen === "loading") return <Loading />;
    else if (screen === "success") return <Success />;
    return (
        <ThemeProvider theme={theme} sx={{transitionDuration: "0.3s"}}>
            <CssBaseline />
            <Container maxWidth={activeStep === 2 || large ? "lg" : "sm"} sx={{ py: { xs: 2, md: 5 }, transitionDuration: "0.3s" }}>
                <Card>
                    <Paper variant="" sx={{ p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            { title }
                        </Typography>
                        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}
                        // alternativeLabel
                        >
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <React.Fragment>
                            {activeStep === steps.length ? (
                                <React.Fragment>
                                    <Typography variant="h5" gutterBottom>
                                        All steps completed !
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        We are adding operator to the system. This takes a few minutes
                                        and wait for sometime
                                    </Typography>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {components[activeStep]}
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        {activeStep !== 0 && (
                                            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                                Back
                                            </Button>
                                        )}

                                        <Button
                                            variant="contained"
                                            onClick={ activeStep === steps.length - 1 ? handleSubmit : handleNext}
                                            sx={{ mt: 3, ml: 1 }}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </Box>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    </Paper>
                </Card>
            </Container>
        </ThemeProvider>
    );
}