import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Drawerlinks from '../components/navbar/Drawerlinks';
import Searchautocomplete from '../components/Searchautocomplete';
import Autocomplete from '@mui/material/Autocomplete';
import $ from 'jquery';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

const drawerWidth = 240;

const navigationLinks = [
  { label: 'Dashboard', year: 1994 },
  { label: 'Active Session', year: 1972 },
  { label: 'Add system Admin', year: 1974 },
  { label: 'Add Operator', year: 2008 },
  { label: 'Add Traffic Police', year: 1957 },
  { label: "Edit Operator", year: 1993 },
  { label: 'Delete Operator', year: 1994 }
]

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Mainpage(props) {
  const [open, setOpen] = React.useState(false);
  const [cname, setcname] = React.useState('/');
  const location = useLocation();

  React.useEffect(() => {
    setcname(location.pathname === "/active-session" ? "" : 'p-3');
  }, [location]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} elevation={0} xs={{ bgColor: '#fff' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              marginRight: '36px',
            }}
          >
            <MenuIcon />
          </IconButton>
          <Navbar />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} anchorOrigin="top">
        <div className='h-100'>
          {/* <h3 className="pl-2 position-absolute" style={{ textColor: '#1976d2', marginLeft: '10px', marginTop: '10px' }}>Choose action</h3> */}
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={navigationLinks}
            freeSolo
            renderInput={(params) => (
              <div ref={params.InputProps.ref} className={"position-absolute"}>
                <Searchautocomplete params={params.inputProps} />
              </div>
            )}
          />
          <DrawerHeader />
          <Divider />
          <OverlayScrollbarsComponent
            style={{
              height: 'calc(100vh - 68px)',
              padding: 0
            }}
            options={{
              overflowBehavior: {
                x: 'hidden'
              }
            }}
          >
            <Drawerlinks />
          </OverlayScrollbarsComponent>
        </div>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, backgroundColor: '#f5f5f5' }}>
        <DrawerHeader />
        {/* <Mapfitun /> */}
        <OverlayScrollbarsComponent
        style={{
          height: 'calc(100vh - 68px)'
        }}
        className={cname}
        >
          <Outlet />
        </OverlayScrollbarsComponent>
      </Box>
    </Box>
  );
}
