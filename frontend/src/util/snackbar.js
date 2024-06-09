import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
function MessageBar (props) {
    const [state] = useState({
        vertical: 'top',
        horizontal: 'center',
      });
      const { vertical, horizontal } = state;
    return (
    <div>
   <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            autoHideDuration={2000}
            message={props.message}
            key={vertical + horizontal}
            open = {true}
          />
    </div>)
}
export default MessageBar;