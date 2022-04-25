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

export default function Basicinfo() {

  const dispatch = useDispatch();
  const { add_operator } = bindActionCreators( operatorActionBinders, dispatch);
  const operatorInfo = useSelector(state => state.newOperator);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Basic Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={operatorInfo.name.first}
            onChange={e => add_operator({name: {...operatorInfo.name, first: e.target.value}})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={operatorInfo.name.last}
            onChange={e => add_operator({name: {...operatorInfo.name, last: e.target.value}})}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            variant="standard"
            value={operatorInfo.email ? operatorInfo.email : ''}
            onChange={e => add_operator({email: e.target.value})}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="phone"
            name="phone"
            label="Phone number"
            fullWidth
            autoComplete="phone"
            variant="standard"
            value={operatorInfo.phoneNumber ? operatorInfo.phoneNumber : ''}
            onChange={e => add_operator({phoneNumber: e.target.value})}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="username"
            name="username"
            label="Username"
            fullWidth
            autoComplete="username"
            variant="standard"
            value={operatorInfo.username ? operatorInfo.username : ''}
            onChange={e => add_operator({username: e.target.value})}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="password"
            name="password"
            label="password"
            fullWidth
            autoComplete="password"
            variant="standard"
            type="password"
            value={operatorInfo.password ? operatorInfo.password : ''}
            onChange={e => add_operator({password: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} container alignItems={"center"}>
          <Badge
            sx={{ m: 1 }}
            overlap="circular"
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            badgeContent={
              <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file" onChange={e => add_operator({profilePicture: e.target.files[0]})}/>
                <IconButton color="secondary" aria-label="upload picture" component="span">
                  <AddAPhotoIcon sx={{ bgcolor: '#fff', borderRadius: 1 }} />
                </IconButton>
              </label>
            }
          >
            <Avatar sx={{ width: '80px', height: '80px' }} alt="Travis Howard"
            src={operatorInfo.profilePicture ? URL.createObjectURL(operatorInfo.profilePicture) : "https://picsum.photos/600/600"} />
          </Badge>
          <Alert severity="info">
            Click to choose a profile picture
          </Alert>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}