import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom"
import axios from "../../api/axios"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "./styles.css"
// Create POST URL
// When form is submitted submit the details to that POST url. 
// Create that post in database
// Once endpoint is successful, return back to home page

// clicking on braincell should bring back to home

export default function MakePost() {
  let navigate = useNavigate()
  let uid = localStorage.getItem('user_id')
  const [values, setValues] = useState({
    title: "",
    summary: "",
    // body: ""
  })
  const [body, setBody] = useState("")

  const handleChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('here are values', values, body);
    axios.post(`create-posts/${uid}`, { 'title': values.title, 'summary': values.summary, 'body': body},
    { headers:
       {"Authorization" : `Bearer ${localStorage.getItem('access_token')}`}})
    .then(res => console.log(res))
    .then(() => navigate('/'))
  }

return (
  <Box
    component="form"
    noValidate
    autoComplete="off"
  >
    <div>
      <div>
    <TextField
          onChange={handleChange}
          id="outlined-textarea"
          label="title"
          name="title"
          multiline
          value={values.title}
          sx = {{float: 'left',m:1}}
        /></div>
        <div>
    <TextField
          id="outlined-textarea2"
          onChange={handleChange}
          label="Summary"
          name="summary"
          multiline
          value={values.summary}
          sx = {{float: 'left', m:1, width:'60ch' }}
        /></div>
        <div>
        <div className='editor'>
        <div className="cke">
        <CKEditor 
        editor={ ClassicEditor }        
        onChange={ ( event, editor ) => {
            const data = editor.getData();         
            setBody(data)          
          } }
        
    /></div></div>
    </div></div><div>
      <Button 
        variant = "contained"
        color = "primary"
        onClick={handleSubmit}
        sx = {{float: 'left',m:1}}>Submit</Button>
    </div>  
  </Box>)}
