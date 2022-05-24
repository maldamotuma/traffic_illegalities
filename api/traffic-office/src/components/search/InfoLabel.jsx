import React from 'react';
import {
  Box,
  Typography
} from "@mui/material";

const InfoLabel = (props) => {
  const { label, value } = props;
  return (
    <Box>
      <Typography fontWeight={900} color={"primary.dark"}>
        {label}
      </Typography>
      <Typography color={"primary.light"}>
        {value}
      </Typography>
    </Box>
  )
}

export default InfoLabel