// FollowersDialog.jsx

import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { getConnectedPeople } from '../../services/userService';
const Followers= ({ open, onClose,connections }) => {
    console.log('I am connections',connections)
    useEffect(()=>{
        const getConnections = async()=>{
        let peoples = await getConnectedPeople(connections)
        }
        getConnections();
    },[])
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Followers</DialogTitle>
      <DialogContent>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Followers;
