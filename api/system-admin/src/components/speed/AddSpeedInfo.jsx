import React, { useState } from 'react';
import {
  Stack
} from "@mui/material";
import DetailForm from './DetailForm';
import Mapfitun from '../mapcomponents/Mapfitun';

const AddSpeedInfo = () => {
  const [show, setshow] = useState(true)
  return (
    <Stack direction={"row"} gap={1} alignItems={"start"}>
      <DetailForm setshow={setshow} show={show}/>
      <Mapfitun polygon={{show}}/>
    </Stack>
  )
}

export default AddSpeedInfo