import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
// import { connect } from 'react-redux';
// import { logout } from '../../redux/actions/authactions';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/auth/authapis';
import { useDispatch } from 'react-redux';

const AccountDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  }
  return (
    <React.Fragment>
      <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
        <Avatar sx={{ width: 32, height: 32, background: '#eeeeee', color: 'rgb(25 118 210)' }}>M</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <Link to="/create-new-password" className="text-decoration-none text-dark">
          <MenuItem>
            <Avatar /> Create new Password
          </MenuItem>
        </Link>
        <Divider />
        <Link to="/change-password" className="text-decoration-none text-dark">
          <MenuItem>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Change Password
          </MenuItem>
        </Link>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default AccountDropdown;