import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/Korou2019">
        Hemant
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
  link: {
    color: '#1976d2',
    marginRight: '5px',
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth="sm" align="center">
          <Link variant="body1" href="https://github.com/Korou2019">
            <GitHubIcon className={classes.link} />
          </Link>
          <Link variant="body1" href="https://www.instagram.com/korounganba11/">
            <InstagramIcon className={classes.link} />
          </Link>
          <Link variant="body1" href="https://www.linkedin.com/in/heikham-korounganba-499a871b6/">
            <LinkedInIcon className={classes.link} />
          </Link>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}