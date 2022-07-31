import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(15, 0, 6),
    color: '#1976d2',
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
  },
});

export default function Home() {
  const classes = useStyles();
  let storedData = JSON.parse(localStorage.getItem('user'));

  return (
    <React.Fragment>
      <CssBaseline />
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" gutterBottom>
              GKeep
            </Typography>
            <div className={classes.heroButtons}>
                {
                  storedData 
                  ?
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                      <ThemeProvider theme={theme}>
                          <Button variant="contained" color='primary' href="/notes">
                            Notes
                          </Button>
                        </ThemeProvider>
                    </Grid>
                  </Grid>
                  :
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                      <ThemeProvider theme={theme}>
                        <Button variant="contained" color='primary' href="/login">
                          Login
                        </Button>
                      </ThemeProvider>
                    </Grid>
                    <Grid item>
                      <ThemeProvider theme={theme}>
                        <Button variant="outlined" color='primary' href="/register">
                          Register
                        </Button>
                      </ThemeProvider>
                    </Grid>
                  </Grid>
                }
            </div>
          </Container>
        </div>
    </React.Fragment>
  );
}