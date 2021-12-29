import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import { NavLink } from 'react-router-dom';

const Singlelist = ({ Icon, name, address }) => {
    return (
        <NavLink
            to={address}
            className={({isActive}) => "nav-link p-0 d-block " + (isActive ? 'bg-secondary text-light' : 'text-dark')}
        >
            <ListItemButton>
                    <ListItemIcon>
                        <Icon />
                    </ListItemIcon>
                    <ListItemText primary={name} />
            </ListItemButton>
        </NavLink>
    )
}

export default Singlelist
