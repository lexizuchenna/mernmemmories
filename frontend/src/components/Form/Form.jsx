import { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import {useDispatch, useSelector} from 'react-redux'

import { createPost, updatePost } from '../../actions/posts'
import useStyles from './styles'

function Form({currentId, setCurrentId}) {
  const dispatch = useDispatch()
    const classes = useStyles()
    const [postData, setPostData] = useState({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    })

    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId): null)

    useEffect(() => {
      if(post) setPostData(post)
    
    }, [post])
    

    const {creator, title, message, tags} = postData

    const handleSubmit = (e) => {
      e.preventDefault()
      if(currentId) {
        dispatch(updatePost(currentId, postData))
        clear()
      } else {
        dispatch(createPost(postData))
        clear()
      }

      
    }
    const clear = () => {
      setCurrentId(null)
      setPostData({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
      })
    }
    const handleChange = (e) => {
      setPostData((prevState) => ({...prevState, [e.target.name]: e.target.value}))
      // setPostData({name: e.target.value})
    }
    const handleTagChange = (e) => {
      setPostData((prevState) => ({...prevState, [e.target.name]: e.target.value.split(',')}))
      // setPostData({name: e.target.value})
    }

  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
        <Typography variant='h6'> {currentId ? 'Editing' : 'Creating'} a memory</Typography>
          <TextField name='creator' variant='outlined' fullWidth label='Creator' value={creator} onChange={handleChange}/>

          <TextField name='title' variant='outlined' fullWidth label='Title' value={title} onChange={handleChange}/>

          <TextField name='message' variant='outlined' fullWidth label='Message' value={message} onChange={handleChange}/>

          <TextField name='tags' variant='outlined' fullWidth label='Tags' value={tags} onChange={handleTagChange}/>
          <div className={classes.fileInput}>
            <FileBase 
              type='file'
              multiple={false}
              onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
            />
          </div>
          <Button className={classes.buttonSubmit} variant='contained' color='primary'size='large' type='submit' fullWidth>Submit</Button>
          <Button variant='contained' color='secondary'size='large' onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form