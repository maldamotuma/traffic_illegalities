import React, { useState } from 'react'
import {
    Stack,
    Typography,
    Box,
    TextField
} from "@mui/material";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Moment from "react-moment";

const SingleInfoLabel = (props) => {
    const { data, edit, seteditparams } = props;
    const [datein, setdatein] = useState(data?.value);

    const handleDataChange = e => {
        if (data?.label === "Issued Date" || data?.label === "Expiry Date") {
            setdatein(e);
            seteditparams(prev => ({ ...prev, [data?.label]: e }));
        } else {
            seteditparams(prev => ({ ...prev, [data?.label]: e.target.value }));
        }
    }
    return (
        <Stack gap={0} sx={{ my: 1 }} alignItems={"start"}>
            {
                edit ?
                    data?.label === "Issued Date" || data?.label === "Expiry Date" ?
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label={data?.label}
                                name={data?.label}
                                inputFormat="dd/MM/yyyy"
                                value={datein ?? data?.value}
                                onChange={handleDataChange}
                                renderInput={(params) => <TextField {...params} size={"small"} sx={{ my: 1 }} />}
                            />
                        </LocalizationProvider>
                        :
                        <TextField
                            label={data?.label}
                            varvariant="outlined"
                            defaultValue={data?.value}
                            size={"small"}
                            fullWidth
                            sx={{ my: 1 }}
                            onChange={handleDataChange}
                        />
                    :
                    <>
                        <Typography fontWeight={800} color={"#00169c"}>
                            {data?.label}
                        </Typography>
                        <Box sx={{
                            // bgcolor: "#e6e9fc",
                            // px: 1,
                            borderRadius: 1,
                        }}>
                            <Typography fontWeight={400}>
                                {
                                    data?.label === "Issued Date" || data?.label === "Expiry Date" ?
                                        <>
                                            <Moment fromNow>
                                                {data?.value}
                                            </Moment>
                                            (
                                            <Moment format={"on DD-MM-YYYY, HH:MM"}>
                                                {data?.value}
                                            </Moment>
                                            )
                                        </>
                                        :
                                        data?.value
                                }
                            </Typography>
                        </Box>
                    </>
            }
        </Stack>
    )
}

export default SingleInfoLabel