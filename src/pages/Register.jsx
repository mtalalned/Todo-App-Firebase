import React, { useState } from 'react'
import { Box, TextField , Button , Typography} from '@mui/material'
import { auth } from '../Config/firebaseconfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import EmailRegisterFailureModal from '../components/EmailRegisterFailureModal'
import EmailAlreadyInUse from '../components/EmailAlreadyInUse'
import RegistrationSuccessful from '../components/RegistrationSuccessful'


const Register = () => {
  
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [emailError , setEmailError] = useState(false)
  const [passwordError , setPasswordError] = useState(false)
  const [failureModal , setfailureModal] = useState (false)
  const [emailCheckModal , setEmailCheckModal] = useState (false)
  const [registrationSuccessfullModal , setregistrationSuccessfullModal] = useState (false)

  const registerEmail = () => {
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|yahoo)\.com$/;

    setEmailError (false)
    setPasswordError (false)
    setfailureModal(false)
    setEmailCheckModal (false)
    setregistrationSuccessfullModal (false)

    if (!emailRegex.test(email) && password.length < 8) {
        setEmailError (true)
        setPasswordError (true)
    } else if (!emailRegex.test(email) || password.length < 8){
      !emailRegex.test(email) ? setEmailError (true) : setPasswordError (true)
    } else {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setregistrationSuccessfullModal(true)
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
          setEmailCheckModal (true)
        } else {
          setfailureModal (true)
        }
      });
    }
  }

  return (
    <Box className='d-flex flex-column w-100 justify-content-center align-items-center gap-3 pt-5'>
      <Button variant="contained" id='width-setup' className='fs-5 fw-bold'>SIGNUP TO USE TODOAPP</Button>
      <TextField sx={{"& .MuiFormHelperText-root": {
      color: "red",}}} helperText={emailError ? 'Enter correct email' : null} onChange={(e)=>setEmail(e.target.value)} value={email} id="standard-basic-1" label="Enter Your Email" variant="standard" type='text' className='custom-textfield'/>
      <TextField sx={{"& .MuiFormHelperText-root": {
      color: "red",}}} helperText={passwordError ? 'Password should be at least 8 characters' : null} onChange={(e)=>setPassword(e.target.value)} value={password} id="standard-basic-2" label="Enter Your Password" variant="standard" type='password' className='custom-textfield'/>
      <Box className='d-flex gap-2 align-items-center'>
      <Button variant="contained" onClick={registerEmail}>SIGN UP</Button>
      </Box>
      {failureModal ? <EmailRegisterFailureModal /> : null}
      {emailCheckModal ? <EmailAlreadyInUse /> : null}
      {registrationSuccessfullModal ? <RegistrationSuccessful /> : null}
    </Box>
  )
}

export default Register
