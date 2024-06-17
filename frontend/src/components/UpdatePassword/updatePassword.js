
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, TextField, Box } from '@mui/material';
import './updatePassword.css';
import { updatePassword } from '../../services/userService';
import Errorbar from '../../util/errorSnackbar';
import MessageBar from '../../util/snackbar'
const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    newpassword: '',
    cnewpassword: ''
  });
   const [showSnackbar,setShowSnackbar] = useState(false)
   const [error,setError] = useState('')
   const [success,setSuccess] = useState('')
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(formData.newpassword!==formData.cnewpassword){
         setShowSnackbar(true)
         setError('New Password Does not match')
         setTimeout(()=>{
          setShowSnackbar(false)
         },2000)
    }
    else {
      let body = {password:formData.password,newpassword:formData.newpassword,cnewpassword:formData.cnewpassword}
      const response = await updatePassword(JSON.stringify(body))
      console.log('Hello Password',response)
      if(response.status!==200){
        setShowSnackbar(true)
        setSuccess('')
        setError(response.response.message)
         setTimeout(()=>{
          setShowSnackbar(false)
         },2000)
      }
      else {
        setShowSnackbar(true)
        setError('')
        setSuccess(response.response.message)
         setTimeout(()=>{
          setShowSnackbar(false)
         },2000)
      }
    }
  };

  return (
    <>
    <Box display="flex" justifyContent="center" marginTop="50px">
      <Card sx={{ maxWidth: 500, width: '100%' }}>
        <CardHeader title="Update Password" sx={{ textAlign: 'center' }} />
        <CardContent>
          <form >
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
              <button type="submit" className='password' onClick={handleSubmit}>
                Update Password
              </button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
    {(showSnackbar && error!=='' && success==='') && <Errorbar message={error} />}
    {(showSnackbar && error==='' && success!=='' ) && <MessageBar message={success} />}
    </>
  );
};

export default UpdatePassword;
