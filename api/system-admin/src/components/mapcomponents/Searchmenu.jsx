import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DirectionsCar from '@mui/icons-material/DirectionsCar';
import LocalPolice from "@mui/icons-material/LocalPoliceRounded";
import { IconButton, ListItemIcon } from '@mui/material';
import Person from '@mui/icons-material/Person';

export default function Searchmenu(props) {
    const { choice, setchoice } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuicons = {
        "car": <DirectionsCar />,
        "user": <Person />,
        "traffic_police": <LocalPolice />
    }

    const handleMenuChange = menu_item => {
        setchoice(menu_item);
        handleClose();
    }

    return (
        <div>
            <IconButton
                color={"primary"}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {
                    menuicons[choice]
                }
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                onChange={() => alert("Helo mlada")}
            >
                <MenuItem onClick={() => handleMenuChange("car")}>
                    <ListItemIcon>
                        <DirectionsCar fontSize="small" />
                    </ListItemIcon>
                    Car
                </MenuItem>
                <MenuItem onClick={() => handleMenuChange("user")}>
                    <ListItemIcon>
                        <Person fontSize="small" />
                    </ListItemIcon>
                    User / Driver
                </MenuItem>
                <MenuItem onClick={() => handleMenuChange("traffic_police")}>
                    <ListItemIcon>
                        <LocalPolice fontSize="small" />
                    </ListItemIcon>
                    Traffic Police
                </MenuItem>
            </Menu>
        </div>
    );
}
