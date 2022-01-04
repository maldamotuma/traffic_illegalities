import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Slide } from '@mui/material';
import {connect} from 'react-redux';
import { forgotPassword } from '../redux/actions/authactions';
import { notifyFixed } from '../redux/actions/helperActions';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ForgotPasswordComponent = ({sendResetMail, notifyFixed}) => {
  const [open, setOpen] = React.useState(false); //cancelled, sending, success, fail
  const [email, setEmail] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSend = () => {
    if(email !== '')
    {
      notifyFixed('info', 'sending email...');
      setOpen(false);
      sendResetMail(email);
    }
    // setOpen({self: false, snack: true, status: 'sending'});
    // setTimeout(() => {
    //   setOpen({self: false, snack: true, status: 'success'});
    // }, 6000);
  };

  return (
    <div>
      <span className='btn btn-link p-0 m-0' onClick={handleClickOpen}>
        Forgot Password?
      </span>
      <Dialog open={open} onClose={handleCancel} sx={{top: '-20%'}} TransitionComponent={Transition}>
        <DialogTitle>Password Reset</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reset your password, please enter your email address here. We
            will send you instructions to follow.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSend}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    sendResetMail: forgotPassword,
    notifyFixed: notifyFixed
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordComponent)