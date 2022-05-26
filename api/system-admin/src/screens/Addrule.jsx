import { Add, AppRegistrationRounded, Backup, CreateNewFolderRounded, Delete, Stairs } from '@mui/icons-material'
import { Button, Container, Grid, IconButton, Paper, Stack, TextField, Typography, Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import Ruleform from '../components/rule/Ruleform';
import Rules from '../components/rule/Rules';
import * as ruleactions from "../redux/actions/rulesaction";

const Addrule = () => {
    const [elemnts, setelemnts] = React.useState([]);
    const dispatch = useDispatch();
    const { fetch_rules, delete_rule } = bindActionCreators(ruleactions, dispatch);
    const { rules } = useSelector(state => state);
    useEffect(() => {
        fetch_rules();
    }, []);
    const handleRemoveform = () => {
        const tmpforms = [...elemnts];
        setelemnts(tmpforms.slice(0, tmpforms.length));
    }



    const el = (
        <Stack direction={"row"} columnGap={1} sx={{ my: 1 }}>
            <TextField size={"small"} label={"Arrest Type"} sx={{ flex: 5 }} required name={"type[]"} />
            <TextField size={"small"} label={"Amount"} sx={{ flex: 5 }} required name={"value[]"} />
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
        // dispatch(recordArrest({setloading, form: data}));
    }

    const generateData = () => {
        const tmp = [...rules];
        for (let j = 0; j < rules.length; j++) {
            var tmpFr = "";
            for (let i = 0; i < rules[j].frequent.length; i++) {
                tmpFr += rules[j].frequent[i].count + " - times and more --- " + rules[j].frequent[i].expected + "  ||  ";
            }
            tmp[j].frqnt = tmpFr;
        }
        return tmp;
    }

    const deleteRule = dt => {
        const formdata = new FormData();
        dt.data.forEach(element => {
            formdata.append("rules[]", rules[element.dataIndex]._id)
        });
        delete_rule(formdata);
    }
    return (
        <>
            <Stack direction={"row"}>
                <Box maxWidth={"sm"}>
                    <Ruleform />
                </Box>
                <Box ml={3} sx={{ flex: 1 }}>
                    <Rules
                    deleteRule={deleteRule}
                    data={generateData()} title={<Stack direction={"row"} gap={1}>
                        <AppRegistrationRounded sx={{ color: "primary.dark", width: "30px", height: "30px" }} />
                        <Typography color={"primary.dark"} variant={"h2"} fontSize={20} fontWeight={600}>Registered Rules</Typography>
                    </Stack>} />
                </Box>
            </Stack>
            <Box mt={3} sx={{ flex: 1 }}>
                <Rules
                deleteRule={deleteRule}
                data={generateData()} title={
                    <Stack direction={"row"} gap={1}>
                        <Stairs sx={{ color: "primary.dark", width: "25px", height: "25px" }} />
                        <Typography color={"primary.dark"} variant={"h2"} fontSize={20} fontWeight={600}>Frequency Related Rules</Typography>
                    </Stack>
                } />
            </Box>
        </>
    )
}

export default Addrule