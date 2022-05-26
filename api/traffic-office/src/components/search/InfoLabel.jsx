import React from 'react';
import {
  Box,
  Typography
} from "@mui/material";

const InfoLabel = (props) => {
  const { label, value } = props;
  return (
    <Box sx={{my: 1}}>
        <Typography fontWeight={800} color={"#00169c"}>
          {label}
        </Typography>
        <Box sx={{
          // bgcolor: "#e6e9fc",
          // px: 1,
          borderRadius: 1,
        }}>
          <Typography fontWeight={400}>
            {value}
          </Typography>
        </Box>
    </Box>
  )
}

export default InfoLabel