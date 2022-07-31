import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  newNote: {
    textAlign: 'center',
    paddingTop: '10px',
  },
  icons: {
    fontSize: "30px"
  },
  customColor: {
    color: '#1976d2',
    borderColor: '#1976d2'
  },
  colorText: {
    color: '#1976d2',
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
  },
});

export default function WriteNote() {
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async () => {
    setSnackOpen(true);
    const storedData = JSON.parse(localStorage.getItem('user'));
    const newNote = {
      userId: storedData.userId,
      title: title,
      content: content
    };

    try {
      await axios.post('/api/note', newNote);
      setTitle("");
      setContent("");
      handleClose();
    } catch (error) {
      
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnckClose = () => {
    setSnackOpen(false);
  }

  return (
    <div className={classes.newNote}>
      <CssBaseline />
      <Button 
        variant="outlined" 
        className={classes.customColor} 
        onClick={handleClickOpen}
        startIcon={<NoteAddIcon />}
      >
        Note
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackOpen}
        autoHideDuration={2000}
        onClose={handleSnckClose}
        message="Note has been added!"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.colorText} >New Note</DialogTitle>
        <DialogContent>
          <ThemeProvider theme={theme}>
            <TextField
              margin="dense"
              fullWidth
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
              label="Heading"
              multiline
              autoFocus
            />
            <TextField
              margin="dense"
              fullWidth
              onChange={(e) => setContent(e.target.value)}
              variant="outlined"
              label="Content"
              multiline
            />
          </ThemeProvider>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleClose} color="secondary">
            <CloseIcon className={classes.icons} />
          </IconButton>
          <IconButton onClick={handleSubmit} color="action">
            <AddCircleIcon className={classes.icons} />
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
