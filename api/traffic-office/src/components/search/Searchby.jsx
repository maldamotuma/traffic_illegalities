import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const options = [
    {label: "Search by", db: ""},
    {label: "Licsence", db: "drivinglicense.licsence_number"},
    {label: "ID number", db: "identificationCards.id_number"},
    {label: "name", db: "name.first"},
    {label: "mobile", db: "phoneNumber"},
    {label: "username", db: "username"},
    {label: "email", db: "email"},
];

export default function Searchby({ fillby }) {
    const [search, setsearch] = React.useState("licsence");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index, db) => {
        setSelectedIndex(index);
        setAnchorEl(null);
        fillby(db);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <List
                component="nav"
                aria-label="Device settings"
                sx={{ bgcolor: 'background.paper' }}
            >
                <ListItem
                    button
                    id="lock-button"
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    aria-label="when device is locked"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickListItem}
                    sx={{
                        p: "0 10px",
                        m: 0,
                        height: '40px'
                    }}
                >
                    <ListItemText
                    sx={{
                        p: 0,
                        m: 0
                    }}
                        primary="Search By"
                        secondary={options[selectedIndex].label}
                    />
                </ListItem>
            </List>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'lock-button',
                    role: 'listbox',
                }}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={option}
                        disabled={index === 0}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index, option.db)}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
