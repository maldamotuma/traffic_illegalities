import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '5px',
    backgroundColor: alpha('#1976d2', 0.15),
    '&:hover': {
        backgroundColor: alpha('#1976d2', 0.25),
    },
    marginTop: '12px',
    left: '8px',
    marginLeft: '0',
    width: '92%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: '100%',
    },
}));

const Searchautocomplete = ({params}) => {
    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon style={{ color: '#999' }}/>
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search navigation..."
                inputProps={{ 'aria-label': 'search' }}
                {...params}
            />
        </Search>
    )
}

export default Searchautocomplete
