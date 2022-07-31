import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import WriteNote from '../components/WriteNote';
import DeleteAllNotes from '../components/DeleteAllNotes';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import PropTypes from 'prop-types';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Toolbar from '@material-ui/core/Toolbar';
import SingleNote from '../components/SingleNote';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function Notes(props) {
  const classes = useStyles();

  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const fetchNotes = async () => {
      const storedData = JSON.parse(localStorage.getItem('user'));
      const res = await axios.get(`/api/note/?userId=${storedData.userId}`);
      setNotes(res.data);
    };
    fetchNotes();
  }, [notes]);

  return (
    <React.Fragment>
      <Toolbar id="back-to-top-anchor" />
      <CssBaseline />
      <WriteNote />
      <DeleteAllNotes />
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {notes.map((note, index) => (
            <SingleNote note={note} index={index}/>
          ))}
        </Grid>
      </Container>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}











// import React, { useEffect, useState } from 'react';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';
// import ViewNote from '../components/ViewNote';
// import EditNote from '../components/EditNote';
// import WriteNote from '../components/WriteNote';
// import DeleteAllNotes from '../components/DeleteAllNotes';
// import axios from 'axios';
// import DeleteNote from '../components/DeleteNote';
// import Fab from '@material-ui/core/Fab';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// import Zoom from '@material-ui/core/Zoom';
// import PropTypes from 'prop-types';
// import useScrollTrigger from '@material-ui/core/useScrollTrigger';
// import Toolbar from '@material-ui/core/Toolbar';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     position: 'fixed',
//     bottom: theme.spacing(2),
//     right: theme.spacing(2),
//   },
//   cardGrid: {
//     paddingTop: theme.spacing(8),
//     paddingBottom: theme.spacing(8),
//   },
//   card: {
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   cardContent: {
//     flexGrow: 1,
//   },
//   cardAction: {
//     justifyContent: 'flex-end',
//   },
// }));

// function ScrollTop(props) {
//   const { children, window } = props;
//   const classes = useStyles();
//   const trigger = useScrollTrigger({
//     target: window ? window() : undefined,
//     disableHysteresis: true,
//     threshold: 100,
//   });

//   const handleClick = (event) => {
//     const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

//     if (anchor) {
//       anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
//   };

//   return (
//     <Zoom in={trigger}>
//       <div onClick={handleClick} role="presentation" className={classes.root}>
//         {children}
//       </div>
//     </Zoom>
//   );
// }

// ScrollTop.propTypes = {
//   children: PropTypes.element.isRequired,
//   window: PropTypes.func,
// };

// export default function Notes(props) {
//   const classes = useStyles();

//   const [notes, setNotes] = useState([]);
//   useEffect(() => {
//     const fetchNotes = async () => {
//       const storedData = JSON.parse(localStorage.getItem('user'));
//       const res = await axios.get(`/api/note/?userId=${storedData.userId}`);
//       setNotes(res.data);
//     };
//     fetchNotes();
//   }, [notes]);

//   return (
//     <React.Fragment>
//       <Toolbar id="back-to-top-anchor" />
//       <CssBaseline />
//       <WriteNote />
//       <DeleteAllNotes />
//       <Container className={classes.cardGrid} maxWidth="md">
//         <Grid container spacing={4}>
//           {notes.map((note, index) => (
//             <Grid item key={index} xs={12} sm={6} md={4} >
//               <Card className={classes.card}>
//                 <CardContent className={classes.cardContent}>
//                   <Typography gutterBottom variant="h5" component="h2">
//                     {note.title}
//                   </Typography>
//                   <Typography>
//                     {note.content.slice(0, 150)}
//                     {
//                         note.content.length > 150
//                         &&
//                         "...."
//                     }
//                   </Typography>
//                 </CardContent>
//                 <CardActions className={classes.cardAction}>
//                   <ViewNote note={note} />
//                   <EditNote note={note} />
//                   <DeleteNote note={note} />
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//       <ScrollTop {...props}>
//         <Fab color="secondary" size="small" aria-label="scroll back to top">
//           <KeyboardArrowUpIcon />
//         </Fab>
//       </ScrollTop>
//     </React.Fragment>
//   );
// }