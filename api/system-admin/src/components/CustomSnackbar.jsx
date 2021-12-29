import { Slide, Snackbar } from '@mui/material';
import React from 'react';
import MuiAlert from '@mui/material/Alert';



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props}/>;
});


const CustomizedSnackbars = ({setOpen, open}) => {
  const config = {
    cancelled: {
      type: 'warning',
      message: 'Email not sent'
    },
    sending: {
      type: 'info',
      message: 'Sending email...'
    },
    success: {
      type: 'success',
      message: 'Email Successfully sent'
    },
    fail: {
      type: 'error',
      message: 'Your Email do not much our record'
    }
  }
  const handleClose = () => {
    if (open.status !== "sending") {
      setOpen({...open, snack: false});
    }
  }

  return (
    <Snackbar
        open={open.snack}
        autoHideDuration={6000}
        // onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={pr => <Slide {...pr} direction="down" />}
      >
        <Alert
        onClose={ open.status === 'sending' ? null : handleClose}
        severity={config[open.status]?.type}
        sx={{ width: '100%' }}
        >
          {config[open.status]?.message}
        </Alert>
      </Snackbar>
  )
}

export default CustomizedSnackbars;