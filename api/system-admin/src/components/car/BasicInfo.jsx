import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as carActionCreators from "../../redux/actions/carActions";

const Input = styled('input')({
  display: 'none',
});

export default function Basicinfo(props) {
  const { setvinfo, errors } = props;
  const ref = React.useRef();
  const dispatch = useDispatch();
  const { add_car_info } = bindActionCreators(carActionCreators, dispatch);
  const carInfo = useSelector(state => state.newCar?.newCar);
  const rules = {
    name: /^[A-Za-z]{3,}$/,
    type: /^[A-Za-z]{3,}$/,
    Plate: /^[A-Z]{2}-[12345]-[A-Z][0-9]{4,5}$/,
    community: /^[A-Za-z]{3,}$/,
    Level: /^[0-9]{1,3}$/
  }

  const messages = {
    name: "Please Provide the right car name",
    type: "Please Provide the right car type",
    Plate: "Please Provide the right car plate",
    community: "Please Provide the right car community",
    Level: "Please Provide the right car level"
  }

  React.useEffect(() => {
    setvinfo({rules, messages, ref})
  }, [])
  
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Basic Information
      </Typography>
      <Grid
        component={"form"}
        ref={ref}
        container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Car Name"
            fullWidth
            variant="standard"
            value={carInfo?.name}
            onChange={e => add_car_info({ name: e.target.value })}
            error={errors?.name}
            helperText={errors?.name ? messages.name : ""}
          />
        </Grid>
        <Grid item xs={12} sm={12} >
          <TextField
            required
            id="type"
            name="type"
            label="Car Type"
            fullWidth
            variant="standard"
            value={carInfo?.type}
            onChange={e => add_car_info({ type: e.target.value })}
            error={errors?.type}
            helperText={errors?.type ? messages.type : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="plate"
            name="Plate"
            label="Plate"
            fullWidth
            variant="standard"
            value={carInfo?.platenumber}
            onChange={e => add_car_info({ platenumber: e.target.value })}
            error={errors?.Plate}
            helperText={errors?.Plate ? messages.Plate : ""}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="community"
            name="community"
            label="Community"
            fullWidth
            variant="standard"
            value={carInfo?.level?.community}
            onChange={e => add_car_info({ level: { ...carInfo.level, community: e.target.value } })}
            error={errors?.community}
            helperText={errors?.community ? messages.community : ""}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="Level"
            name="Level"
            label="Level"
            fullWidth
            variant="standard"
            value={carInfo?.level?.level}
            onChange={e => add_car_info({ level: { ...carInfo.level, level: e.target.value } })}
            error={errors?.Level}
            helperText={errors?.Level ? messages.Level : ""}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}