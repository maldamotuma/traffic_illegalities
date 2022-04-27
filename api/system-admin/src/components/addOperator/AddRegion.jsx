import React, { useEffect, useState } from 'react';
import Mapfitun from '../mapcomponents/Mapfitun';
import {
  Stack,
  Box,
  Slider,
  TextField,
  FormControlLabel,
  Switch
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as operatorActionBinders from '../../redux/actions/operatoractions';

const AddRegion = () => {
  const dispatch = useDispatch();
  const { add_operator } = bindActionCreators( operatorActionBinders, dispatch);
  const operatorInfo = useSelector(state => state.newOperator.newOperator.region);

  const [region, setregion] = useState({
    coordinates: {
      lat: operatorInfo.coordinates?.lat, lng: operatorInfo.coordinates.lng
    },
    radius: operatorInfo.radius,
    show: true
  });


  useEffect(() => {
    add_operator({region: {coordinates: region.coordinates, radius: region.radius }});
  }, [region]);
  

  return (
    <Stack direction={"row"} alignItems={"start"} gap={1}>
      <Box sx={{ width: '500px', boxShadow: 3, px: 3, py: 2, borderRadius: 2 }}>
        <TextField
          label={"coordinates"}
          variant={"outlined"}
          size={"small"}
          sx={{ mb: 1 }}
          fullWidth
          value={region.coordinates.lat + " , " + region.coordinates.lng}
        />
        <Slider defaultValue={50} valueLabelDisplay={"auto"}
          onChange={e => setregion({ ...region, radius: e.target.value })}
        />
        <Stack direction={"row"} alignItems={"center"} gap={5}>
          <Box sx={{ bgcolor: "#A8CBEE", p: 1, borderRadius: 1 }}>{region.radius}Km</Box>
          <FormControlLabel
            control={<Switch checked={region.show} onChange={e => setregion({ ...region, show: e.target.checked })} />}
            label={"show on Map"} />
        </Stack>
      </Box>
      <Mapfitun setregion={setregion} region={region}/>
    </Stack>
  )
}

export default AddRegion