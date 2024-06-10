import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import SnackbarContent from '@mui/material/SnackbarContent';
function Errorbar (props) {
    const [state] = useState({
        vertical: 'bottom',
        horizontal: 'center',
      });
      const { vertical, horizontal } = state;
    return (
    <div>
  <Snackbar
    anchorOrigin={{ vertical, horizontal }}
    autoHideDuration={2000}
    key={vertical + horizontal}
    open={true}
>
    <SnackbarContent
        style={{ backgroundColor: 'orangered', color: 'white' }}
        message={props.message}
    />
</Snackbar>
    </div>)
}
export default Errorbar;