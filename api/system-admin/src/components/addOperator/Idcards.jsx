import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Addidscomponent from '../AddIdscomponent';

export default function Idcards() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Identification cards
      </Typography>
      <Grid container spacing={3}>
        <Grid item>
          <Addidscomponent />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}