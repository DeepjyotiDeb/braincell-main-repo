import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import SignUp from '../signup/SignUp';
// import axios from 'axios';
import axios from '../../../api/axios'
import { Typography } from '@mui/material';
// const textfield = styled('TextField')({
//   autoFocus: true,
//   margin:"dense",
//   id:"name",
//   label: "email",
//   fullWidth: true,
//   variant:"standard",
// })

export default function Login(props) {

  // const openLogin = props.openLogin;
  // const setOpenLogin = props.setOpenLogin;

  // const { openLogin = false, setOpenLogin = () => {} } = props;
  // const { openLogin: open, setOpenLogin: setOpen } = props;
  // const { openLogin: open = false, setOpenLogin: setOpen = () => {} } = props;
  let navigate = useNavigate()
  const { openLogin, setOpenLogin } = props;
  const [openSignUp, setOpenSignUp] = useState(false)
  // const [values, setValues] = useState({
  //   username: "tet",
  //   password:"",
  // })
  const[username, setUsername]=useState('');
  const[password, setPassword]=useState('');
  const[error, setError] = useState(null);
  // const handleChange = (event) => {
  //   setValues({...values, [event.target.name]: event.target.value})
  // }

  const handleLoginSuccess = (res) => {
    // if(console.log(res.statusText)=="success")
    if (console.log(res)!="")
    {localStorage.setItem('access_token', res.data.access_token);
    localStorage.setItem('user_id', res.data.user_details.user_id);
    navigate('/')
    handleClose()
    setError(null)
    // console.log("success",res.statusText,res.status.type)
    }    
    else {
      console.log("fail", res)
      // console.log(res.status)
    }
  }

  const handleSubmit = () => {
//     console.log('test values are:', username, password);
    axios.post('login', (`grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`),
     {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
    .then(handleLoginSuccess)
    // .then(() => navigate('/'))  
    .catch((error)=>{console.log(error, "not working"); setError(error)})
  }

  const handleClose = () => {
    setOpenLogin(false);
  };

  return (
    
    <div>      
      <Dialog open={openLogin} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>       
          <TextField            
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"            
            // onChange={handleChange}
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required={true}
          />          
          <TextField
            // onChange={handleChange}
            autoFocus
            margin="dense"
            id="password"
            label="password"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required={true}
          />{error && <Typography color="error">incorrect password</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Login</Button>          
        </DialogActions>
        <DialogContentText sx = {{position: 'absolute', left: '10px', bottom: '10px'}}>
            Sign up <Link to = "/" onClick={() => {
                    setOpenSignUp(true);
                    handleClose()}}>here</Link>
        </DialogContentText>
      </Dialog>
      <SignUp
      openSignUp={openSignUp}
      setOpenSignUp={setOpenSignUp}
      ></SignUp>
    </div>
  );
}
