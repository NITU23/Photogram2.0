import React, {useEffect} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import Welcome from '../src/components/Welcome/welcome';
import Profile from '../src/components/Profile/profile';
import './css/app.css';
import ViewMyPost from './components/ViewMyPost/viewMyPost';
import Chat from './components/Chat/chat';
import UpdateProfile from './components/UpdateProfile/updateProfile';
import Login from './components/Login/login'
import CreatePost from './components/CreatePost/createPost';
import UploadProfilePic from './components/UpdateProfilePic/uploadProfilePic';
import { useDispatch, useSelector } from 'react-redux';
import { checkCookie } from './redux/checklogin';
import { io } from "socket.io-client";
const socket = io("http://localhost:5001");
function App() {
  const dispatch = useDispatch();
  const cookieExists = useSelector((state) => state.cookie.cookieExists);
  useEffect(() => {
    dispatch(checkCookie());
  }, [dispatch]);
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
          <Chat socket={socket} />
        </div>
      )}
  </div>
  );
}

export default App;
