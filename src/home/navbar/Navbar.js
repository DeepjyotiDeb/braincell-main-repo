import React, { useState } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import { Button, ListItemButton } from '@mui/material';
import Login from '../login/Login';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import SignUp from '../signup/SignUp';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  backgroundColor: 'inherit',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const StyledButton = styled(Button)(() => ({
  backgroundColor: '#a2a1a2',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#fff',
    color: '#000000',
  },
}));

export default function Navbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar
        position='static'
        sx={{ backgroundColor: '#7d7d7d' }}
        // color='secondary'
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant='h6' component='div'>
              Braincell
            </Typography>
          </Link>
          {token ? (
            <StyledButton
              color='inherit'
              variant='outlined'
              sx={{ position: 'absolute', right: '5px' }}
              onClick={() => {
                localStorage.removeItem('id');
                localStorage.removeItem('token');
                navigate('/');
              }}
            >
              Logout
            </StyledButton>
          ) : (
            <>
              <StyledButton
                color='inherit'
                variant='outlined'
                sx={{ position: 'absolute', right: '10px' }}
                onClick={() => setOpenLogin(true)}
              >
                Login
              </StyledButton>
              <StyledButton
                color='inherit'
                variant='outlined'
                sx={{ position: 'absolute', right: '110px' }}
                onClick={() => setOpenSignUp(true)}
              >
                SignUp
              </StyledButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='temporary'
        anchor='left'
        open={open}
        onClose={handleDrawerClose}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem>
            <ListItemButton
              onClick={() => {
                navigate('/');
                handleDrawerClose();
              }}
            >
              <HomeIcon />
              <ListItemText primary='Home' sx={{ pl: 1 }} />
            </ListItemButton>
          </ListItem>
          {token && (
            <>
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    navigate('/create-post');
                    handleDrawerClose();
                  }}
                >
                  <CreateIcon />
                  <ListItemText primary='Create Post' sx={{ pl: 1 }} />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    navigate('/my-posts');
                    handleDrawerClose();
                  }}
                >
                  <PersonSharpIcon />
                  <ListItemText primary='My Posts' sx={{ pl: 1 }} />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
        <Divider />
        <List></List>
      </Drawer>
      <Login openLogin={openLogin} setOpenLogin={setOpenLogin}></Login>
      <SignUp openSignUp={openSignUp} setOpenSignUp={setOpenSignUp}></SignUp>
    </Box>
  );
}
