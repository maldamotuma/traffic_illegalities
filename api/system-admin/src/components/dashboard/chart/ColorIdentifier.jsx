import React from 'react';
import {
    Box,
    Stack,
    Typography
} from "@mui/material";

const ColorIdentifier = ({ color, clickHandler, title }) => {
    return (
        <Stack
        onClick={clickHandler}
        direction= {"row"} alignItems={"center"} gap={.5} sx={{
            cursor: "pointer"
        }}>
            <Box sx={{
                width: "25px",
                height: "10px",
                bgcolor: color
            }} />
            <Typography>
                {title}
            </Typography>
        </Stack>
    )
}

export default ColorIdentifier