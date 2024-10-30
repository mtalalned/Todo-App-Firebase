import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../Config/firebaseconfig';
import { useState } from 'react';

const navItems = ['login', 'sign up', 'todoapp' , 'signout'];

function DrawerAppBar() {

  const navigate = useNavigate()

  const NavButtonClick = (item) => {
    item === 'login' ? navigate('/') : item === 'signout' ? (
      signOut(auth).then(() => {
        // Sign-out successful.
        if(auth.currentUser)
        console.log ('signout successful')
      }).catch((error) => {
        // An error happened.
        console.log ('signout unsuccessful')
      })
    ): navigate (item)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: {xs: 'none' , sm:'block'}}}
          >
            TODO APP
          </Typography>
          <Box>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }} onClick={()=> NavButtonClick(item)}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />

      {/* Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="body1">
        </Typography>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
