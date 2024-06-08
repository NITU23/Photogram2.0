import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import { GiConsoleController } from 'react-icons/gi';
function MessageBar (props) {
    const [state] = useState({
        vertical: 'top',
        horizontal: 'center',
      });
      const { vertical, horizontal } = state;
      console.log("hello I am props here",props)
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