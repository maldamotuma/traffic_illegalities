import React from 'react';
import SearchBox from "./SearchBox";
import {
    Box
} from "@mui/material";


const Search = ({ setloader }) => {
  return (
    <Box sx={{
        mb: 5
    }}>
        <SearchBox setloader={setloader}/>
    </Box>
  )
}

export default Search