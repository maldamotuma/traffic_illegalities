import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { NavLink } from 'react-router-dom';

export default function Dropdownist({ title, submenus, Icon }) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    //   subheader={
    // <ListSubheader component="div" id="nested-list-subheader">
    //   Operator related Operations
    // </ListSubheader>
    //   }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            submenus.map(smenu => (
              <NavLink
                to={smenu.address}
                className={({ isActive }) => "nav-link p-0 d-block " + (isActive ? 'bg-secondary text-light' : 'text-dark')}
              >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary={smenu.title} />
                </ListItemButton>
              </NavLink>
            ))
          }
        </List>
      </Collapse>
    </List>
  );
}
