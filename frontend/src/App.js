import { useEffect, useState } from "react";
import { useDispatch} from 'react-redux'
import { Container, Typography, Grow, Grid, AppBar } from "@material-ui/core";


import {getPosts} from './actions/posts'
import Form from './components/Form/Form'
import Posts from './components/Posts/Posts'
import memories from "./images/memories.png";
import useStyles from './styles'

function App() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [currentId, setCurrentId] = useState(null)

  useEffect(() => {
    dispatch(getPosts())
  
    
  }, [dispatch, currentId])

  
  return (
    <Container maxWidth="lg">
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img src={memories} alt="memories" height="60" className={classes.image} />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
            className={classes.mainContainer}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
