import React from 'react'
import {
    Stack,
    Typography,
    Box,
    TextField
} from "@mui/material";
const SingleInfoLabel = (props) => {
    const { data, edit } = props;

    const handleDataChange = e => {
        // alert("blurred !!");
    }
    return (
        <Stack gap={0} sx={{ my: 1 }} alignItems={"start"}>
            {
                edit ?
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
                                {data?.value}
                            </Typography>
                        </Box>
                    </>
            }
        </Stack>
    )
}

export default SingleInfoLabel