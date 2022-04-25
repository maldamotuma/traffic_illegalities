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
import Basicinfo from './BasicInfo.tsx';
import Card from '@mui/material/Card';
import { useDispatch } from 'react-redux';
import * as carActionBinders from '../../redux/actions/carActions';
import { bindActionCreators } from 'redux';
import CarOwner from './CarOwner';
import CarPhotos from './CarPhotos';

const steps = ['Basic Information', "Id's information", 'Region assignment'];

function getStepContent(step, carInfo, setcarInfo) {
    switch (step) {
        case 0:
            return <Basicinfo
            carInfo={carInfo}
            setcarInfo={setcarInfo}
            />;
        case 1:
            return <CarOwner />;
        case 2:
            return <CarPhotos />;
        default:
            throw new Error('Unknown step');
    }
}

const theme = createTheme();

export default function AddCar() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [carInfo, setcarInfo] = React.useState({
        name: "",
        type: "",
        platenumber: "",
        level: {
            community: "",
            level: ""
        }
    });

    const dispatch = useDispatch();
    const { register_car } = bindActionCreators( carActionBinders, dispatch);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
        // console.log(carInfo);
        // register_car(carInfo);
        
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <ThemeProvider theme={theme} sx={{transitionDuration: "0.3s"}}>
            <CssBaseline />
            <Container maxWidth={activeStep === 2 ? "lg" : "sm"} sx={{ py: { xs: 2, md: 5 }, transitionDuration: "0.3s" }}>
                <Card>
                    <Paper variant="" sx={{ p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            Add Car
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
                                    {getStepContent(activeStep, carInfo, setcarInfo)}
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        {activeStep !== 0 && (
                                            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                                Back
                                            </Button>
                                        )}

                                        <Button
                                            variant="contained"
                                            onClick={ activeStep === steps.length - 1 ? handleBack : handleNext}
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