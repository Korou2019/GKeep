import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(() => ({
    newNote: {
      textAlign: 'center',
      paddingTop: '10px',
    },
    customColor: {
      color: '#1976d2',
      borderColor: '#1976d2'
    },
    colorText: {
      color: '#1976d2',
    },
  }));

export default function DeleteAllNotes() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleDelete = async () => {
    setOpen(true);
    try {
      const storedData = JSON.parse(localStorage.getItem('user'));
      await axios.delete(`/api/note/?userId=${storedData.userId}`);
    } catch (error) {
        
    }
  };

  return (
    <div className={classes.newNote}>
      <Tooltip title="Delete All Notes">
        <Button 
          variant="outlined" 
          className={classes.customColor} 
          onClick={handleDelete} 
          startIcon={<DeleteIcon />}
        >
            Delete Notes
        </Button>
      </Tooltip>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Notes have been deleted!"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
