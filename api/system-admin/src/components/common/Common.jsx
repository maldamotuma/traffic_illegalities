import React from 'react'
import {
    Container,
    Card,
    Paper,
    Typography,
    Stepper
} from "@mui/material";

const Common = ({children}) => {
    return (
        <Container maxWidth={"lg"} sx={{ py: { xs: 2, md: 5 }, transitionDuration: "0.3s" }}>
            <Card>
                {children}
            </Card>
        </Container>
    )
}

export default Common