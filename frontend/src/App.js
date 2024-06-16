import React, {useEffect} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../src/components/navbar';
import Welcome from '../src/components/welcome';
import Profile from '../src/components/profile';
import './css/app.css';
import ViewMyPost from './components/viewMyPost';
import Chat from './components/chat';
import UpdateProfile from './components/updateProfile';
import Login from './components/login'
import CreatePost from './components/createPost';
import UploadProfilePic from './components/uploadProfilePic';
import { useDispatch, useSelector } from 'react-redux';
import { checkCookie } from './redux/checklogin';
function App() {
  const dispatch = useDispatch();
  const cookieExists = useSelector((state) => state.cookie.cookieExists);
  useEffect(() => {
    dispatch(checkCookie());
  }, [dispatch]);
  useEffect(() => {
    if ( cookieExists) {
      window.location.reload();
    }
  }, []);
  console.log('Hello',cookieExists)
  return (
    <div className="App">
    <Navbar />
    <main>
    <Routes>
          {cookieExists ? (
            <>
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/viewPost" element={<ViewMyPost />} />
              <Route path="/updateprofile" element={<UpdateProfile />} />
              <Route path="/createPost" element={<CreatePost />} />
              <Route path="/uploadProfile" element={<UploadProfilePic />} />
              <Route path="/" element={<Navigate to="/welcome" />} />
              <Route path="/login" element={<Navigate to="/welcome" />} />
              <Route path="*" element={<Navigate to="/welcome" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
    </main>
    {cookieExists && (
        <div className="chat">
          <Chat />
        </div>
      )}
  </div>
  );
}

export default App;
