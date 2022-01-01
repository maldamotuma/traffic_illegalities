import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Identificationform from './Identificationform';
import Idphotoscomponent from './Idphotoscomponent';
import { styled } from '@mui/material/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Input = styled('input')({
    display: 'none',
});
export default function Addidscomponent() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} startIcon={<AddIcon />}>
                Add Identification card
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Add identification card
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <Grid container space={5} sx={{ pt: 5 }} justifyContent={'center'} >
                    <Grid item xs={4}>
                        <Identificationform />
                    </Grid>
                    <Divider orientation="vertical" flexItem variant="middle">
                        Photo's of Id's
                    </Divider>
                    <Grid item xs={3}>
                        <label htmlFor="icon-button-file">
                            <Input accept="image/*" id="icon-button-file" type="file" />
                            <IconButton color="secondary" aria-label="upload picture" component="span">
                                <AddAPhotoIcon />
                            </IconButton>
                        </label>
                        <Idphotoscomponent />
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
}
