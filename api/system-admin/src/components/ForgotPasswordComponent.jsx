import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CustomizedSnackbars from './CustomSnackbar';
import { Slide } from '@mui/material';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ForgotPasswordComponent() {
  const [open, setOpen] = React.useState({self: false, snack: false, status: ''}); //cancelled, sending, success, fail

  // React.useEffect(() => {
  //   alert(open.snack ? '1' : 0);
  // }, [open.snack]);

  const handleClickOpen = () => {
    setOpen({...open, self: true, snack: false});
  };

  const handleCancel = () => {
    setOpen({self: false, snack: true, status: 'cancelled'});
  };

  const handleSend = () => {
    setOpen({self: false, snack: true, status: 'sending'});
    setTimeout(() => {
      setOpen({self: false, snack: true, status: 'success'});
    }, 6000);
  };

  return (
    <div>
      <span className='btn btn-link p-0 m-0' onClick={handleClickOpen}>
        Forgot Password?
      </span>
      <CustomizedSnackbars open={open} setOpen={setOpen}/>
      <Dialog open={open.self} onClose={handleCancel} sx={{top: '-20%'}} TransitionComponent={Transition}>
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
