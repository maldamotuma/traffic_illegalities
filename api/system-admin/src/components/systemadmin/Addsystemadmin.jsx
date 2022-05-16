import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Basicinfo from '../addOperator/Basicinfo';
import Idcards from '../addOperator/Idcards';
import { Card, Container } from '@mui/material';
import Mapfitun from '../mapcomponents/Mapfitun';

const steps = [
    {
        label: 'Basic information',
        description: <Basicinfo />,
    },
    {
        label: "Id's information",
        description: <Idcards />
    },
    {
        label: 'Region assignment',
        // description: <Review />
        description: <Mapfitun />
    },
];

export default function Addsystemadmin() {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Container maxWidth="lg">
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (

                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === 2 ? (
                                    <Typography variant="caption">Last step</Typography>
                                ) : null
                            }
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            <Box maxWidth={activeStep === 2 ? "lg" : "sm"} sx={{ transitionDuration: "0.3s" }}>
                                <Card >
                                    <Paper variant="" sx={{ p: { xs: 2, md: 3 } }}>
                                        {step.description}
                                    </Paper>
                                </Card>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}

            </Stepper>

            {activeStep === steps.length && (
                <Paper square elevation={1} sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        All steps completed !
                    </Typography>
                    <Typography variant="subtitle1">
                        We are adding operator to the system. This takes a few minutes
                        and wait for sometime
                    </Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button>
                </Paper>
            )}
        </Container>
    );
}
