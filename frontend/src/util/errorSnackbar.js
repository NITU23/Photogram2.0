import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';


function Errorbar({ open, message, onClose }) {
  const { vertical, horizontal } = { vertical: 'bottom', horizontal: 'center' };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={2000}
      key={vertical + horizontal}
      open={open}
      onClose={onClose}
    >
      <SnackbarContent
        style={{ backgroundColor: 'orangered', color: 'white' }}
        message={message}
      />
    </Snackbar>
  );
}

export default Errorbar;
