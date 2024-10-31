import React from 'react'
import {Box , Button , TextField, Typography} from '@mui/material'

const TodoApp = () => {
  return (
    <Box className='d-flex flex-column w-100 justify-content-center align-items-center gap-4 pt-5'>
      <Button variant="contained" id='width-setup' className='fs-6 fw-bold'>Welcome to TODOAPP</Button>
      <Box className='input-field-box w-100 d-flex justify-content-center align-items-center gap-2'>
        <TextField id="standard-basic" label="Enter Todo" variant="standard" className='custom-textfield-input'/>
        <Button variant="contained" id='width-setup-1' className='custom-button-input fs-6 fw-bold' color='secondary'>Add Todo</Button>
      </Box>
      <Box className='input-field-box w-100 d-flex justify-content-center align-items-center gap-1'>
        <Typography variant='p' className='list-p'>1. Muhammad Talal daksndaksnd,d,asdasdkasd n</Typography>
        <Button variant="contained" id='width-setup-2' className='custom-button-delete' color='error'>Delete</Button>
        <Button variant="contained" id='width-setup-2' className='custom-button-edit' color='success'>Edit</Button>
      </Box>
    </Box>
  )
}

export default TodoApp
