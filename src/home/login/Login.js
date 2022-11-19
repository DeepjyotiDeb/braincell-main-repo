import { forwardRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import axios from '../../api/axios';
import { Slide, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';

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

export default function Login(props) {
  let navigate = useNavigate();
  const { openLogin, setOpenLogin, setOpenSignUp } = props;
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState();
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleLoginSuccess = (res) => {
    localStorage.setItem('token', res.data.user.token);
    localStorage.setItem('id', res.data.user.id);
    navigate('/');
    handleClose();
    setError(null);
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    // console.log('test values are:', state.email, state.password);
    e.preventDefault();
    await axios
      .post('/login', {
        'username': state.email,
        'password': state.password,
      })
      .then(handleLoginSuccess)
      .catch((error) => {
        console.log({ error }, 'not working');
        setError(error.response.data.message);
      });
  };

  const handleClose = () => {
    setOpenLogin(false);
  };

  return (
    <div className='login-box'>
      <CustomDialog
        open={openLogin}
        onClose={handleClose}
        TransitionComponent={Transition}
        component='form'
        onSubmit={handleSubmit}
      >
        <DialogTitle sx={{ width: { xs: '65vw', md: '30vw' } }}>
          Login
        </DialogTitle>
        <DialogContent sx={{ mb: 0, pb: 0 }}>
          {/* <DialogContentText variant='h5'>Login</DialogContentText> */}
          <TextField
            autoFocus
            margin='dense'
            name='email'
            label='Email Address'
            type='email'
            fullWidth
            variant='filled'
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='password'
            label='Password'
            type='password'
            fullWidth
            variant='filled'
            onChange={handleChange}
            sx={{ mb: 0 }}
          />
        </DialogContent>
        <Box sx={{ width: { md: '30rem', mt: 0 } }}>
          {error && (
            <Typography
              sx={{
                ml: '1.5rem',
                lineBreak: 'auto',
                color: 'red',
                fontSize: 14,
              }}
            >
              {error}
            </Typography>
          )}
          <Typography sx={{ ml: '1.5rem' }}>
            Not a user? Click{' '}
            <Link
              onClick={() => {
                setOpenLogin(false);
                setOpenSignUp(true);
              }}
            >
              here
            </Link>{' '}
            to Sign Up!
          </Typography>
        </Box>
        <DialogActions sx={{ mb: 1 }}>
          <Button onClick={handleClose} variant='outlined'>
            Cancel
          </Button>
          <Button type='submit' variant='outlined'>
            Login
          </Button>
        </DialogActions>
      </CustomDialog>
    </div>
  );
}
