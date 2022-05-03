import React from 'react'
import {
    Stack,
    Typography,
    Box,
    Input
} from "@mui/material";
const SingleInfoLabel = (props) => {
    const { data, edit } = props;
    return (
        <Stack direction={"row"} gap={1} sx={{ my: 1 }} alignItems={"center"}>
            <Typography>
                {data?.label}:
            </Typography>
            {
                edit ?
                <Input defaultValue={data?.value} size={"small"}/>
                :
                <Box sx={{
                    bgcolor: "#d9deff",
                    px: 1,
                    borderRadius: 1
                }}>
                    <Typography color={"#00169c"} fontWeight={600}>
                        {data?.value}
                    </Typography>
                </Box>
            }
        </Stack>
    )
}

export default SingleInfoLabel