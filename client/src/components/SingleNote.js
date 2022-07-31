import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ViewNote from './ViewNote';
import EditNote from './EditNote';
import DeleteNote from './DeleteNote';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  cardAction: {
    justifyContent: 'flex-end',
  },
}));

export default function SingleNote(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(props.note.checked);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    axios.put(`/api/note/checked/${props.note._id}`, {checked: event.target.checked});
  };
  return (
    <React.Fragment>
        <Grid item key={props.index} xs={12} sm={6} md={4} >
            <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                {props.note.title}
                </Typography>
                <Typography>
                {props.note.content.slice(0, 150)}
                {
                    props.note.content.length > 150
                    &&
                    "...."
                }
                </Typography>
            </CardContent>
            <CardActions className={classes.cardAction}>
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    style={{color: '#1976d2'}}
                />
                <ViewNote note={props.note} />
                <EditNote note={props.note} />
                <DeleteNote note={props.note} />
            </CardActions>
            </Card>
        </Grid>
    </React.Fragment>
  );
}