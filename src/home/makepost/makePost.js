import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function MakePost() {
  let navigate = useNavigate();
  const [values, setValues] = useState({});
  const editorConfig = {
    // toolbar: ['bold', 'italic'],
    width: '20vh',
    shouldNotGroupWhenFull: true,
  };

  const handleChange = (event) => {
    if (event.target) {
      setValues({ ...values, [event.target.name]: event.target.value });
    } else {
      setValues({ ...values, body: event });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('here are values', values);
    axios
      .post(
        `/createBlog`,
        {
          'userId': `${localStorage.getItem('id')}`,
          'title': values.title,
          'summary': values.summary,
          'description': values.body,
        },
        {
          headers: {
            'Authorization': `${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => console.log(res))
      .then(() => navigate('/'));
  };

  return (
    <Box
      component='form'
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit}
      sx={{
        pt: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '741px',
        margin: 'auto',
        gap: '5px',
      }}
    >
      <TextField
        onChange={handleChange}
        id='outlined-textarea'
        label='Title'
        name='title'
        multiline
        fullWidth
        value={values.title}
      />

      <TextField
        id='outlined-textarea2'
        onChange={handleChange}
        label='Summary'
        name='summary'
        fullWidth
        multiline
        value={values.summary}
      />
      <CKEditor
        className='ck-content'
        editor={ClassicEditor}
        config={editorConfig}
        onChange={(event, editor) => {
          const data = editor.getData();
          handleChange(data);
        }}
      />

      <Button variant='contained' color='primary' onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
}
