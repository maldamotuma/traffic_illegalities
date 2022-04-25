import * as React from 'react';
import { Typography, Box, Stack, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Idcards(props) {
  const {personId, children} = props;
  
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Identification cards
      </Typography>
      {
        personId &&
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} sx={{my: 1}}>
          <Box>
            <Typography fontWeight={"bold"} color={"#353535"}>
              {personId?.id_number}
            </Typography>
            <Typography variant={"subtitle2"} color={"#505050"}>
              {personId?.id_name}
            </Typography>
          </Box>
          <IconButton color={"secondary"}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      }
      
      <Grid container spacing={3}>
        <Grid item>
          {children}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}