import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import Grid from '@mui/material/Grid';
import ImageListItem from '@mui/material/ImageListItem';
import Showdialogueimage from '../Showdialogueimage';
import { useSelector } from 'react-redux';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function Idphotoscomponent(props) {
  const { newOperator } = props;
  const [open, setOpen] = React.useState({ status: false, image: null });

  return (
    <Grid container
      // sx={{ width: 500, mt: 2, pl: 3 }}
      // variant="quilted"
      // cols={4}
      spacing={3}
    >
      {
        newOperator &&
        newOperator.IDphotos?.map((item) => (
          <Grid item xs={6}>
            <img
              src={URL.createObjectURL(item)}
              alt={""}
              loading="lazy"
              width={"100%"}
              onClick={e => setOpen({ status: true, image: URL.createObjectURL(item) })}
            />
          </Grid>
        ))
      }
      <Showdialogueimage open={open} setOpen={setOpen} />
    </Grid>
  );
}
