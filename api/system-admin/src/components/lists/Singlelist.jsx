import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom';

const Singlelist = ({ Icon, name, address }) => {
    return (
        <NavLink
            to={address}
            className={({isActive}) => "nav-link p-0 d-block " + (isActive ? 'bg_active' : 'text-dark')}
        >
            <ListItemButton>
                    <ListItemIcon>
                        <Icon sx={{color: "primary.main"}}/>
                    </ListItemIcon>
                    <ListItemText primary={name} />
            </ListItemButton>
        </NavLink>
    )
}

export default Singlelist
