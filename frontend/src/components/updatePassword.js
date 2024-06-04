
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, TextField, Box } from '@mui/material';
import '../css/updatePassword.css';

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    newpassword: '',
    cnewpassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <Box display="flex" justifyContent="center" marginTop="50px">
      <Card sx={{ maxWidth: 500, width: '100%' }}>
        <CardHeader title="Update Password" sx={{ textAlign: 'center' }} />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Current Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="New Password"
                name="newpassword"
                value={formData.newpassword}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Confirm New Password"
                name="cnewpassword"
                value={formData.cnewpassword}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Box>
            <Box display="flex" justifyContent="center" mt={2}>
              <button type="submit" className='password'>
                Update Password
              </button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UpdatePassword;
