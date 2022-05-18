import React from 'react';
import {
    Box,
    Typography
} from "@mui/material";

const InfoLabel = () => {
  return (
    <Box>
        <Typography fontWeight={900} color={"primary.dark"}>
            Label
        </Typography>
        <Typography color={"primary.light"}>
            Value
        </Typography>
    </Box>
  )
}

export default InfoLabel