import React from 'react'
import {
    Stack,
    Typography,
    Box
} from "@mui/material";
const SingleInfoLabel = (props) => {
    const { data } = props;
    return (
        <Stack direction={"row"} gap={1} sx={{ my: 1 }} alignItems={"center"}>
            <Typography>
                {data?.label}:
            </Typography>
            <Box sx={{
                bgcolor: "#d9deff",
                px: 1,
                borderRadius: 1
            }}>
                <Typography color={"#00169c"} fontWeight={600}>
                    {data?.value}
                </Typography>
            </Box>
        </Stack>
    )
}

export default SingleInfoLabel