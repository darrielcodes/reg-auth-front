// import * as React from 'react';
import React, {useState} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../redux/userSlice';
import { validator } from '../lib/validator';

export default function Register() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const [pwdMatch, setPwdMatch] = useState({
    error: false,
    message: ''
  })

  const [isValid, setIsValid] = useState({
    firstname:{
      error: false,
      message: ''
    }, 
    lastname:{
      error: false,
      message: ''
    }, 
    username:{
      error: false,
      message: ''
    }, 
    email:{
      error: false,
      message: ''
    }, 
    password:{
      error: false,
      message: ''
    }, 
  })

  const handleSubmit = (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   firstname: data.get('firstName'),
    //   lastname: data.get('lastName'),
    //   username: data.get('username'),
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    let userObj = {
      firstname: data.get('firstName'),
      lastname: data.get('lastName'),
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    }
 
    userObj.password !== data.get('password1') ?
      setPwdMatch({
        error: true,
        message: "Passwords do not match"
      })
      :
      setPwdMatch({
        error: false,
        message: ''
      })
      
      const validObj = validator(userObj)
      let isErrors = false

      for (const key in validObj) {
        if (validObj[key].error) {
          isErrors = true
        }
      }
      
      isErrors ? setIsValid(validObj) 
      : 
      (userObj.password === data.get('password1')) 
      && dispatch(registerUser(userObj))
    

    // dispatch(registerUser({
    //   firstname: data.get('firstName'),
    //   lastname: data.get('lastName'),
    //   username: data.get('username'),
    //   email: data.get('email'),
    //   password: data.get('password'),
    // }))


  };

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoComplete="given-name"
                  autoFocus
                  error={isValid.firstname.error}
                  helperText={isValid.firstname.message}
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={isValid.lastname.error}
                  helperText={isValid.lastname.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='username'
                  label='Username'
                  name='username'
                  autoComplete='username'
                  error={isValid.username.error}
                  helperText={isValid.username.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={isValid.email.error}
                  helperText={isValid.email.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={isValid.password.error}
                  helperText={isValid.password.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password1"
                  label="Confirm Password"
                  type="password"
                  id="password1"
                  autoComplete="new-password"
                  error={pwdMatch.error}
                  helperText={pwdMatch.message}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}