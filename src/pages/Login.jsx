import React from 'react'
import { Box, TextField , Button , Typography} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import InvalidEmail_Password from '../components/InvalidEmail&Password'
import { auth } from '../Config/firebaseconfig'
import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {
  
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [emailError , setEmailError] = useState(false)
  const [passwordError , setPasswordError] = useState(false)
  const navigate = useNavigate()
  const [invalidEmailModal , setinvalidEmailModal] = useState (false)


  const loginEmail = () => {
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|yahoo)\.com$/;

    setEmailError (false)
    setPasswordError (false)
    setinvalidEmailModal(false)

    if (!emailRegex.test(email) && password.length < 8) {
        setEmailError (true)
        setPasswordError (true)
    } else if (!emailRegex.test(email) || password.length < 8){
      !emailRegex.test(email) ? setEmailError (true) : setPasswordError (true)
    } else {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate ('todoapp')
        })
      .catch((error) => {
        const errorMessage = error.message;
        setinvalidEmailModal(true)
      });
    }
  }
  
  return (
    <Box className='d-flex flex-column w-100 justify-content-center align-items-center gap-3 pt-5'>
      <Button variant="contained" id='width-setup' className='fs-5 fw-bold'>LOGIN TO USE TODOAPP</Button>
      <TextField sx={{"& .MuiFormHelperText-root": {
      color: "red",}}} helperText={emailError ? 'Enter correct email' : null} onChange={(e)=>setEmail(e.target.value)} value={email} id="standard-basic-1" label="Enter Your Email" variant="standard" type='text' className='custom-textfield'/>
      <TextField sx={{"& .MuiFormHelperText-root": {
      color: "red",}}} helperText={passwordError ? 'Password should be at least 8 characters' : null} onChange={(e)=>setPassword(e.target.value)} value={password} id="standard-basic-2" label="Enter Your Password" variant="standard" type='password' className='custom-textfield'/>
      <Box className='d-flex gap-2 align-items-center'>
      <Button variant="contained"onClick={loginEmail}>LOGIN</Button>
      <Typography variant='p'>OR</Typography>
      <Button variant="contained"><Link to={'sign up'} className='text-white text-decoration-none'>SIGN UP</Link></Button>
      </Box>
      {invalidEmailModal ? <InvalidEmail_Password /> : null}
    </Box>
  )
}

export default Login
