import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import UpdateIcon from '@material-ui/icons/Update';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
  },
});

export default function EditNote(props) {
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [title, setTitle] = useState(props.note.title);
  const [content, setContent] = useState(props.note.content);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    setSnackOpen(true);
    axios.put(`/api/note/${props.note._id}`, {email: props.note.email, title, content});
    handleClose();
  };

  const handleSnckClose = () => {
    setSnackOpen(false);
  }

  return (
    <div>
      <Tooltip title="Edit">
        <IconButton style={{color: '#1976d2', marginRight: '-15px'}} onClick={handleClickOpen} >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackOpen}
        autoHideDuration={2000}
        onClose={handleSnckClose}
        message="Note has been updated!"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Note</DialogTitle>
        <DialogContent>
          <ThemeProvider theme={theme}>
            <TextField
              margin="dense"
              fullWidth
              variant="outlined"
              label="Heading"
              multiline
              autoFocus
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <TextField
              margin="dense"
              fullWidth
              variant="outlined"
              label="Content"
              multiline
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </ThemeProvider>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleClose} color="secondary">
            <CloseIcon style={{fontSize: '30px'}} />
          </IconButton>
          <IconButton onClick={handleUpdate} color="action">
            <UpdateIcon style={{fontSize: '30px'}} />
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
