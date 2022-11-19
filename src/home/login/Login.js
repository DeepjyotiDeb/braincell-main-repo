import { forwardRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import axios from '../../api/axios';
import { Slide, styled, Typography } from '@mui/material';

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
  // const [values, setValues] = useState({
  //   username: "tet",
  //   password:"",
  // })
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  // const handleChange = (event) => {
  //   setValues({...values, [event.target.name]: event.target.value})
  // }

  const handleLoginSuccess = (res) => {
    localStorage.setItem('token', res.data.user.token);
    localStorage.setItem('id', res.data.user.id);
    navigate('/');
    handleClose();
    setError(null);
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    //     console.log('test values are:', username, password);
    e.preventDefault();
    await axios
      .post('/login', {
        'username': username,
        'password': password,
      })
      .then(handleLoginSuccess)
      // .then(() => navigate('/'))
      .catch((error) => {
        console.log(error, 'not working');
        setError(error);
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
      >
        <DialogTitle sx={{ width: { xs: '65vw', md: '30vw' } }}>
          Login
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText variant='h5'>Login</DialogContentText> */}
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Email Address'
            type='email'
            fullWidth
            variant='filled'
          />
          <TextField
            margin='dense'
            id='password'
            label='Password'
            type='password'
            fullWidth
            variant='filled'
          />
        </DialogContent>
        <Typography sx={{ ml: '1.5rem' }}>
          Not a user? Click <Link>here</Link> to Sign Up!
        </Typography>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Login</Button>
        </DialogActions>
      </CustomDialog>
    </div>
  );
}
