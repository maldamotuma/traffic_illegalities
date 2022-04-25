import React from 'react';
import {
  Stack
} from "@mui/material";
import DetailForm from './DetailForm';
import Mapfitun from '../mapcomponents/Mapfitun';

const AddSpeedInfo = () => {
  return (
    <Stack direction={"row"} gap={1} alignItems={"start"}>
      <DetailForm />
      <Mapfitun polygon/>
    </Stack>
  )
}

export default AddSpeedInfo