import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "../../../api/axios"

export default function SignUp(props) {
    const { openSignUp, setOpenSignUp } = props;
    const handleClose = () => {
        setOpenSignUp(false);
      };
    const [values, setValues] = React.useState({
      username: "",
      email: "",
      password: "",
      password2: ""
    })
    const handleChange = (event) => {
      event.preventDefault()
      setValues({...values, [event.target.name]: event.target.value})
    }
    const handleSubmit = () => {
      console.log(values)
      axios.post('user',{'name':values.username, 'email':values.email, 'password':values.password2})
      .then(res => console.log(res))
    }

    return (
        <div>
            <Dialog open={openSignUp} onClose={handleClose} component = "form" onSubmit={handleSubmit}>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>          
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="enter your user name"
            name="username"
            type="text"
            fullWidth
            required
            variant="standard"
            onChange={handleChange}
            value={values.username}
          />
          <TextField
            autoFocus
            id="email"
            margin="dense"
            label="enter your email"
            type="email"
            name="email"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={values.email}
            required
          />            
          <TextField
            autoFocus
            id="password"
            margin="dense"
            label="enter new password"
            type="text"
            name="password"
            fullWidth
            required
            variant="standard"
            onChange={handleChange}
            value={values.password}
          />
          <TextField
            autoFocus
            id="password2"
            margin="dense"
            required
            label="retype password"
            type="password"
            name="password2"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={values.password2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create Account</Button>          
        </DialogActions>
        </Dialog>
        </div>
    )
}
