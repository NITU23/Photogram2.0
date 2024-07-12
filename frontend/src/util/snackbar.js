import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';

function MessageBar({ message, open, onClose }) {
    const [state] = useState({
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal } = state;

    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            autoHideDuration={2000}
            message={message}
            key={vertical + horizontal}
            open={open}
            onClose={onClose}
        />
    );
}

export default MessageBar;
