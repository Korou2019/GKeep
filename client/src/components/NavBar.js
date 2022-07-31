import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { AuthContext } from '../context/auth-context';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: '#1976d2',
    color: '#fff',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function NavBar() {
  const classes = useStyles();
  
  const auth = useContext(AuthContext);

  let storedData = JSON.parse(localStorage.getItem('user'));
  
  const handleClick = () => {
    auth.logout();
    storedData = JSON.parse(localStorage.getItem('user'));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll>
        <AppBar color="default" elevation={0} className={classes.appBar}>
          <Toolbar>
            <Typography variant="h4" color="inherit" className={classes.toolbarTitle}>
              GKeep
            </Typography>
            <nav>
              <Link variant="button" color="inherit" href="/" className={classes.link}>
                Home
              </Link>
              <Link variant="button" color="inherit" href="/notes" className={classes.link}>
                Notes
              </Link>
            </nav>
            {
              storedData 
              ?
              <Link 
                variant="button" 
                color="inherit" 
                href="/" 
                className={classes.link}
                onClick={handleClick}
              >
                Logout
              </Link>
              :
              <Link 
                variant="button" 
                color="inherit" 
                href="/login" 
                className={classes.link}
              >
                Login
              </Link>
            }
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </React.Fragment>
  );
}