import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import { useState } from 'react';

function Errorbar(props) {
  const [open, setOpen] = useState(true); 

  const handleClose = () => {
    setOpen(false); 
  };

  const { vertical, horizontal } = { vertical: 'bottom', horizontal: 'center' };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={2000}
        key={vertical + horizontal}
        open={open && props.open} 
        onClose={handleClose}
      >
        <SnackbarContent
          style={{ backgroundColor: 'orangered', color: 'white' }}
          message={props.message}
        />
      </Snackbar>
    </div>)
}
export default Errorbar;