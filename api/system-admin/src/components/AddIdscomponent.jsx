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
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as operationActionBinders from "../redux/actions/Operationactions";
import * as operatorActionBinders from '../redux/actions/operatoractions';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Input = styled('input')({
    display: 'none',
});
export default function Addidscomponent() {
    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch();
    const { add_operator } = bindActionCreators(operatorActionBinders, dispatch);
    const { notify } = bindActionCreators(operationActionBinders, dispatch);
    const personId = useSelector(state => state?.newOperator.newOperator.identificationCard);
    const {IDphotos} = useSelector(state => state?.newOperator.newOperator);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (personId) {
            if (!personId.id_number) {
                dispatch(notify({
                    type: "warning",
                    msg: "Please Provide ID Number"
                }));
            } else if(!personId.id_name) {
                dispatch(notify({
                    type: "warning",
                    msg: "Please Provide ID Issuer"
                }));
            }else if(!personId.expiryDate) {
                dispatch(notify({
                    type: "warning",
                    msg: "Please Provide Expiry date"
                }));
            }else if(!personId.issuedDate) {
                dispatch(notify({
                    type: "warning",
                    msg: "Please Provide Issued date"
                }));
            }else if(!IDphotos) {
                dispatch(notify({
                    type: "warning",
                    msg: "Please Provide ID photos"
                }));
            }else {
                setOpen(false);
            }
        } else {
            dispatch(notify({
                type: "warning",
                msg: "Please fill the form !"
            }));
        }
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
                <form action="" onSubmit={handleSubmit}>
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
                            <Button autoFocus color="inherit" type={"submit"}>
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
                                <Input
                                    accept="image/*"
                                    id="icon-button-file"
                                    type="file"
                                    multiple={true}
                                    onChange={e => add_operator({ IDphotos: [...e.target.files] })}
                                />
                                <IconButton color="secondary" aria-label="upload picture" component="span">
                                    <AddAPhotoIcon />
                                </IconButton>
                            </label>
                            <Idphotoscomponent />
                        </Grid>
                    </Grid>
                </form>
            </Dialog>
        </div>
    );
}
