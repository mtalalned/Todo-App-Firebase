import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 300,
  maxWidth: 550,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function LoginToContinue() {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate()
  const handleClose = () => {
    setOpen(false)
    navigate('/')
};

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Please login to conitnue !!!
          </Typography>
          <Box className='d-flex justify-content-end mt-2'>
          <Button variant="contained" onClick={handleClose}>login</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
