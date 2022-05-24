import { Slide, Snackbar } from '@mui/material';
import React from 'react';
import MuiAlert from '@mui/material/Alert';
import { connect } from 'react-redux';
import { cancelNotifyFixed } from '../redux/actions/helperActions'


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props}/>;
});


const Generalnotification = ({notification, cancel}) => {
  const handleClose = () => {
    cancel();
  }

  return (
    <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={pr => <Slide {...pr} direction="down" />}
      >
        <Alert
        onClose={handleClose}
        severity={notification.type}
        sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
  )
}

const mapStateToProps = (state) => ({
    notification: state.helper.fixedNotification
})

const mapDispatchToProps = {
  cancel: cancelNotifyFixed
}

export default connect(mapStateToProps, mapDispatchToProps)(Generalnotification)