import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from '../../api/axios';
import { forwardRef } from 'react';
import { Slide, styled } from '@mui/material';
import { useState } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    // padding: theme.spacing(2),
    // minWidth: { md: '100vw' },
    // width: { xs: '80vw', md: '60vw', lg: '80vw' },
    // minWidth: { sm: '80vw', md: '60vw' },
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function SignUp(props) {
  const { openSignUp, setOpenSignUp } = props;
  const handleClose = () => {
    setOpenSignUp(false);
  };
  const [values, setValues] = useState({
    username: '',
    email: '',
    password2: '',
  });
  const handleChange = (event) => {
    event.preventDefault();
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleSubmit = async () => {
    await axios
      .post('user', {
        'name': values.username,
        'email': values.email,
        'password': values.password2,
      })
      .then((res) => console.log(res));
  };

  return (
    <div>
      <Dialog
        open={openSignUp}
        onClose={handleClose}
        component='form'
        onSubmit={handleSubmit}
        TransitionComponent={Transition}
        maxWidth='xs'
        fullWidth={true}
      >
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
        >
          <TextField
            autoFocus
            label='Enter a username'
            name='username'
            type='text'
            required
            variant='filled'
            onChange={handleChange}
            value={values.username}
          />
          <TextField
            label='Enter your email'
            type='email'
            name='email'
            variant='filled'
            onChange={handleChange}
            value={values.email}
            required
          />
          <TextField
            required
            label='Create a password'
            type='password'
            name='password2'
            variant='filled'
            onChange={handleChange}
            value={values.password2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit'>Create Account</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
