import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import Badge from '@mui/material/Badge';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const theme = createTheme();


export default function Identificationform() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box
          sx={{
            // marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Badge
            sx={{ m: 1 }}
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <AddCardOutlinedIcon sx={{ bgcolor: '#fff', borderRadius: 1 }} />
            }
          >
            <Avatar sx={{ width: '80px', height: '80px' }} alt="Travis Howard" src="https://picsum.photos/600/600" />
          </Badge>
          <Typography component="h1" variant="h5">
            Malda Motuma
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="id_name"
                  label="ID number"
                  name="id_name"
                  autoComplete="id_name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DesktopDatePicker
                  label="Issued date"
                  inputFormat="MM/dd/yyyy"
                  // value={value}
                  // onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <DesktopDatePicker
                  label="Expiry date"
                  inputFormat="MM/dd/yyyy"
                  // value={value}
                  // onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="id_name"
                  label="Identification's Name"
                  name="id_name"
                  autoComplete="id_name"
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
        </LocalizationProvider>
      </Container>
    </ThemeProvider>
  );
}