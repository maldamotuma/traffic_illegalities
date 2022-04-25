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
import * as operatorActionBinders from '../../redux/actions/operatoractions';

const Input = styled('input')({
  display: 'none',
});

export default function Basicinfo({carInfo, setcarInfo}) {

  const dispatch = useDispatch();
  const { add_operator } = bindActionCreators( operatorActionBinders, dispatch);
  const operatorInfo = useSelector(state => state.newOperator);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Basic Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Car Name"
            fullWidth
            variant="standard"
            value={carInfo.name}
            onChange={e => setcarInfo(prev => ({...prev, name: e.target.value}))}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="type"
            name="type"
            label="Car Type"
            fullWidth
            variant="standard"
            value={carInfo.type}
            onChange={e => setcarInfo(prev => ({...prev, type: e.target.value}))}
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
            value={carInfo.platenumber}
            onChange={e => setcarInfo(prev => ({...prev, platenumber: e.target.value}))}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="community"
            name="community"
            label="Community"
            fullWidth
            variant="standard"
            value={carInfo.level.community}
            onChange={e => setcarInfo(prev => ({...prev, level: {...carInfo.level, community: e.target.value}}))}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="Level"
            name="Level"
            label="Level"
            fullWidth
            variant="standard"
            value={carInfo.level.level}
            onChange={e => setcarInfo(prev => ({...prev, level: {...carInfo.level, level: e.target.value}}))}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}