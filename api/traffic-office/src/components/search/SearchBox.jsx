import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import Searchby from './Searchby';
import {
  useDispatch
} from "react-redux";
import {
  setsearch
} from "../../redux/slices/driver/driverslice";
import { driverinfo } from '../../redux/slices/driver/driverapi';

export default function SearchBox({ setloader }) {
  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(driverinfo(setloader));
  }
  const fillby = val => {
    dispatch(setsearch({ by: val }));
  }
  return (
    <Paper
      component="form"
      sx={{ p: '0px 4px', display: 'flex', alignItems: 'center', width: 800, m: "auto" }}
      onSubmit={handleSubmit}
    >
      <Searchby fillby={fillby}/>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="write something..."
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={e => dispatch(setsearch({ query: e.target.value }))}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
