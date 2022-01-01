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

const Input = styled('input')({
  display: 'none',
});

export default function Basicinfo() {
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
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="username"
            name="username"
            label="Username"
            fullWidth
            autoComplete="username"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} container alignItems={"center"}>
          <Badge
            sx={{ m: 1 }}
            overlap="circular"
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            badgeContent={
              <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file" />
                <IconButton color="secondary" aria-label="upload picture" component="span">
                  <AddAPhotoIcon sx={{ bgcolor: '#fff', borderRadius: 1 }} />
                </IconButton>
              </label>
            }
          >
            <Avatar sx={{ width: '80px', height: '80px' }} alt="Travis Howard" src="https://picsum.photos/600/600" />
          </Badge>
          <Alert severity="info">
            Click to choose a profile picture
          </Alert>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}