import React from 'react'
import { Snackbar, Alert } from '@mui/material'

const NotificationPopup = ({ open, messages, onClose }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
        >
            <Alert onClose={onClose} severity="warning" sx={{ width: '300px' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ marginBottom: '14px' }}>
                        {msg}
                    </div>
                ))}
            </Alert>
        </Snackbar>
    );
};

export default NotificationPopup
