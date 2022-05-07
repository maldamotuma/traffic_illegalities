import React from 'react';
import Summary from './cards/Summary';
import {
    Box, Stack
} from "@mui/material";

const Topsummary = () => {
  return (
    <Stack direction={"row"} justifyContent={"space-between"} sx={{width: "100%"}}>
        <Summary hover={true}/>
        <Summary />
        <Summary />
        <Summary />
    </Stack>
  )
}

export default Topsummary