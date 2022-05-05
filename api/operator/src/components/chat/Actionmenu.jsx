import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, ListItemIcon } from '@mui/material';
import { BookmarkAddedRounded, CloseRounded, MoreVertRounded, VisibilityOffRounded } from '@mui/icons-material';

export default function ActionMenu(props) {
    const { removeMessageFromView } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRemove = () => {
        removeMessageFromView();
        handleClose();
    }

    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreVertRounded sx={{ color: '#aaffff' }} />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleRemove}>
                    <ListItemIcon>
                        <VisibilityOffRounded sx={{ color: 'primary.main' }} />
                    </ListItemIcon>
                    Hide
                </MenuItem>
                <MenuItem onClick={handleRemove}>
                    <ListItemIcon>
                        <BookmarkAddedRounded sx={{ color: 'secondary.main' }}/>
                    </ListItemIcon>
                    Close
                </MenuItem>
            </Menu>
        </div>
    );
}
