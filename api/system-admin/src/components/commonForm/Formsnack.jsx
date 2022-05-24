import { Snackbar, Slide } from '@mui/material';
import React, { useState } from 'react'

const Formsnack = ({ status, setopen }) => {
    const handleClose = () => {
        setopen(false);
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={status}
            onClose={handleClose}
            message="Please Privide Information !!"
            sx={{
                top: "80px !important",
                zIndex: 99999999
            }}
        />
    )
}

export default Formsnack