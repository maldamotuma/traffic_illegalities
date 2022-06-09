import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {
    Typography
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Confirmationdialogue(props) {
    const { open, setOpen } = props;
    const handleClose = () => {
        setOpen({open: false});
    };

    const handleAgree = () => {
        open.delete_id_photos(open.photo, open.user?._id);
        handleClose();
    }

    return (
        <div>
            <Dialog
                open={open.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Are you sure to delete?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        The process won't reversed, and It will not wait you to click the save button to delete.
                        It automatically deleted If you click <Typography color={"primary"} fontWeight={"bold"} display={"inline"}>Agree</Typography> option
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleAgree}>Agree</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
