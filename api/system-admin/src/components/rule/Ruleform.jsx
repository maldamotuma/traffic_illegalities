import { Add, Backup, Close, CreateNewFolderRounded, Delete } from '@mui/icons-material'
import { Button, Container, Grid, IconButton, Paper, Stack, TextField, Typography, Box, Alert, AlertTitle, alertTitleClasses, Collapse } from '@mui/material'
import React, { useRef } from 'react'
import { validate } from '../car/formValidator';
import * as rulesactions from "../../redux/actions/rulesaction";
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingButton from '@mui/lab/LoadingButton';

const rules = {
    title: /^[A-Za-z]{3,}/,
    article: /^[A-Za-z0-9\.]+$/,
    description: /^[A-Za-z]{3,}/,
}

const messages = {
    title: "Please Provide the right title",
    article: "Please Provide the right article",
    description: "Please Provide the right description",
}
const Ruleform = () => {
    const [elemnts, setelemnts] = React.useState([]);
    const [errors, seterrors] = React.useState([]);
    const [open, setopen] = React.useState(false);
    const [loading, setloading] = React.useState(false);
    const ref = useRef();

    const dispatch = useDispatch();
    const { add_new_rule } = bindActionCreators(rulesactions, dispatch);
    const handleRemoveform = () => {
        const tmpforms = [...elemnts];
        setelemnts(tmpforms.slice(0, tmpforms.length));
    }

    const el = (
        <Stack direction={"row"} columnGap={1} sx={{ my: 1 }}>
            <TextField size={"small"} label={"Frequency"} sx={{ flex: 5 }} required name={"count[]"} />
            <TextField size={"small"} label={"Expected Consequence"} sx={{ flex: 5 }} required name={"expected[]"} />
            <IconButton sx={{ flex: 1 }} color={"secondary"} onClick={handleRemoveform}>
                <Delete />
            </IconButton>
        </Stack>
    );
    const handleAddForm = () => {
        setelemnts([...elemnts, el]);
    }
    const handleSubmit = e => {
        e.preventDefault();
        const data = new FormData(e.target);
        const tmpErrors = validate({ rules, messages, ref });
        seterrors(tmpErrors);
        if (!Object.keys(tmpErrors).length) {
            dispatch(add_new_rule({
                form: data,
                alert: setopen,
                loading: setloading,
                ref,
                elmnts: setelemnts
            }));
        }
        // dispatch(recordArrest({setloading, form: data}));
    }
    return (
        <Paper sx={{ p: 3 }} elevation={0}>
            <Typography variant={"h1"} fontSize={30} fontWeight={800} color={"primary.dark"}>
                <CreateNewFolderRounded sx={{
                    width: "35px",
                    height: "35px",
                    mb: .8
                }} /> Add Rule
            </Typography>
            <Collapse in={open}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setopen(false);
                            }}
                        >
                            <Close fontSize="inherit" />
                        </IconButton>
                    }
                    severity="success" onClose={() => { }}>
                    <AlertTitle>Success</AlertTitle>
                    Insertion Successfully Added — <strong>Rule sibmitted!</strong>
                </Alert>
            </Collapse>
            <Grid container sx={{ mt: 1 }} columnSpacing={2} rowSpacing={2} component={"form"} onSubmit={handleSubmit} ref={ref}>
                <Grid item xs={6}>
                    <TextField label={"Rule title"} size={"small"} fullWidth name={"title"}
                        error={errors?.title}
                        helperText={errors?.title} />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label={"Article"}
                        size={"small"}
                        fullWidth
                        name={"article"}
                        error={errors?.article}
                        helperText={errors?.article}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label={"Description"}
                        size={"small"}
                        fullWidth
                        multiline
                        rows={5}
                        name={"description"}
                        error={errors?.description}
                        helperText={errors?.description}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Stack direction={"row"} columnGap={1}>
                        <TextField size={"small"} label={"Frequency"} sx={{ flex: 5 }} required name={"count[]"} />
                        <TextField size={"small"} label={"Expected Consequence"} sx={{ flex: 5 }} required name={"expected[]"} />
                        <IconButton sx={{ flex: 1 }} color={"primary"} onClick={handleAddForm}>
                            <Add />
                        </IconButton>
                    </Stack>
                    {
                        elemnts
                    }
                </Grid>
                <Grid item xs={12} sx={{ mt: 1 }}>
                <LoadingButton loading={loading} variant={"contained"} startIcon={<Backup sx={{ mb: .5 }} />} type={"submit"}>Submit</LoadingButton>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Ruleform