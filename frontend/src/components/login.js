import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, TextField, Box } from '@mui/material';
import '../css/login.css';
import { TailSpin } from "react-loader-spinner";
import MessageBar from '../util/snackbar';

const LoginComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email:'',
    firstName:'',
    lastName:''
  });
  const [signUp,setSignUp] = useState(false)
  const [loading, setLoading] = useState(false);
  const [showSnackbar,setShowsnackbar] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit =  async(e) => {
    setLoading(true)
    e.preventDefault();
    const url = signUp===true ? 'http://localhost:3001/api/user/signup' : 'http://localhost:3001/api/user/login';
    let body =  signUp===true ? JSON.stringify({ username: formData?.username,
      email: formData.email, password: formData.password,firstName:formData.firstName,lastName:formData.lastName}) :
      JSON.stringify({ email: formData.email, password: formData.password })
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body:body
    });
    if(response.status!==200){
      setShowsnackbar(true)
    }
    if(response.status===200){
      if(signUp===true){
        navigate('/uploadProfile')
      }
      else {
        navigate('/welcome')
      }
    }
    setTimeout(()=>{
      setShowsnackbar(false)
    },2000)
    setLoading(false)
    setFormData({username:'',email:'',password:'',firstName:'',lastName:''})
  };

  const changeLogin = () => {
    signUp === true ? setSignUp(false):setSignUp(true)
  }
  return (
    <div>
    <Box display="flex" justifyContent="center" marginTop="50px">
      <Card sx={{ maxWidth: 400, width: '100%' }} className="login-card">
        <CardHeader title={signUp===true?'Sign Up':'Login'} sx={{ textAlign: 'center' }} />
        <CardContent>
          <form onSubmit={handleSubmit}>
        { signUp &&<>
            <Box mb={2}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName }
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Box></> }
            <Box mb={2}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Box>
            <Box display="flex" justifyContent="center" mt={2}>
              <button type="submit" className='password'>
              {signUp===true?'Sign Up':'Login'}
              </button>
             <div className='spinnerDiv'>
           {loading && <TailSpin color="deepskyblue" radius={"1px"} />}</div>
            </Box>

          </form>
         <p  className='question' onClick={changeLogin}>{signUp===true?'Already Have an Account?':'Don\'t Have An Account?'}</p>
        </CardContent>
      </Card>
    </Box>
   {showSnackbar && <MessageBar  message="Invalid Credentials provided." />}
    </div>
  );
};

export default LoginComponent;
