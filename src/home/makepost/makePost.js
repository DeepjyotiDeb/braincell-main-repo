import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function MakePost() {
  let navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const userId = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const [values, setValues] = useState({});

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
    if (location.pathname.includes('edit-post')) {
      axios
        .patch(
          `/blog/${id}/update`,
          {
            'id': id,
            'title': values.title,
            'summary': values.summary,
            'description': values.body,
          },
          {
            headers: {
              'Authorization': token,
            },
          }
        )
        .then((res) => {
          console.log({ res });
          navigate('/');
        })
        .catch((err) => {});
      return;
    }
    axios
      .post(
        `/createBlog`,
        {
          'userId': userId,
          'title': values.title,
          'summary': values.summary,
          'description': values.body,
        },
        {
          headers: {
            'Authorization': token,
          },
        }
      )
      .then((res) => console.log(res))
      .then(() => navigate('/'));
  };

  useEffect(() => {
    if (location.pathname.includes('edit-post')) {
      console.log('true');
      setTimeout(() => {
        axios
          .get(`/blogs/${id}`)
          .then(function (response) {
            console.log('response', response);
            setValues({
              title: response.data.blog.title,
              summary: response.data.blog.summary,
              body: response.data.blog.description,
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }, 0);
    }
  }, [id, location.pathname]);

  // const editorConfig = {
  //   toolbar: ['Bold', 'Italic']
  // }
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
        width: { xs: '90%', sm: '60%' },
        margin: 'auto',
        gap: '5px',
      }}
    >

      <TextField
        placeholder='Title'
        name='title'
        multiline
        fullWidth
        value={values.title}
        onChange={handleChange}
      />

      <TextField
        placeholder='Summary'
        name='summary'
        fullWidth
        multiline
        value={values.summary}
        onChange={handleChange}
      />
      <div className="classes.richTextEditor"></div>
      <CKEditor
        // className='ck-content'
        editor={ClassicEditor}
        data={values.body}
        // config={editorConfig}
        onChange={(event, editor) => {
          const data = editor.getData();
          handleChange(data);
        }}
        // onReady={(editor) => {
        //   // You can store the "editor" and use when it is needed.
        //   // console.log('Editor is ready to use!', editor);
        //   editor.editing.view.change((writer) => {
        //     writer.setStyle(
        //       'min-width',
        //       'inherit',
        //       editor.editing.view.document.getRoot()
        //     );
        //     // writer.setStyle(
        //     //   'width',
        //     //   '100%',
        //     //   editor.editing.view.document.getRoot()
        //     // );
        //     // writer.setStyle(
        //     //   'min-height',
        //     //   '20rem',
        //     //   editor.editing.view.document.getRoot()
        //     // );
        //   });
        // }}
      />

      <Button
        variant='contained'
        color='primary'
        onClick={handleSubmit}
        sx={{ mb: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
}
