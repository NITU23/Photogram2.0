import React, { useState,useEffect } from 'react';
import { Card, CardContent, CardHeader, TextField, Box } from '@mui/material';
import '../css/login.css';


const LoginComponent = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email:''
  });

  const [signUp,setSignUp] = useState(false)


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

 let data = {
  email:formData.email,password:formData.password
 }

var requestOptions = {
  method: 'POST',
 
  body: data,
  redirect: 'follow'
};
  const handleSubmit =  async(e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    });
    console.log('hello I a, respose',response)

  };

  const changeLogin = () => {
    signUp === true ? setSignUp(false):setSignUp(true)
  }

  

  return (
    <Box display="flex" justifyContent="center" marginTop="50px">
      <Card sx={{ maxWidth: 400, width: '100%' }} className="login-card">
        <CardHeader title={signUp===true?'Sign Up':'Login'} sx={{ textAlign: 'center' }} />
        <CardContent>
          <form onSubmit={handleSubmit}>
        { signUp && <Box mb={2}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Box>}
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
            </Box>
          </form>
         <p  className='question' onClick={changeLogin}>{signUp===true?'Already Have an Account?':'Don\'t Have An Account?'}</p>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginComponent;
