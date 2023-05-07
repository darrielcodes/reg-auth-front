import React, {useEffect} from 'react'
import { Box, Button, Container, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { authFailure, authLogout, authSuccess } from '../redux/authSlice';
import {checkAuthToken} from '../lib/checkAuthToken'

const Home = () => {
    const dispatch = useDispatch()
    const user = useSelector( state => state.user )
    const auth = useSelector( state => state.auth.isAuth )

    useEffect(() => {
      let authy = checkAuthToken()
      authy ? dispatch(authSuccess())
      :
      dispatch(authFailure())
    }, [])
    

  return (
    <Container 
        maxWidth='lg'
    >
    <Box 
      maxWidth='xs' 
      m={3} 
      >
        <Typography variant='h1'>
          Please Login
        </Typography>
    </Box>
    {
      auth ? 
      <Button variant='contained' onClick={() => dispatch(authLogout())}>Logout</Button>
      :
      <>
        <Button variant='contained' href='/login'>Login</Button>
        <Button variant='contained' href='/register'>Register</Button>
      </>
    }
  </Container>
  )
}

export default Home