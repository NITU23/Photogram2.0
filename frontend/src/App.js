import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/navbar';
import Welcome from '../src/components/welcome';
import Profile from '../src/components/profile';
import './css/app.css';
import ViewMyPost from './components/viewMyPost';
import Chat from './components/chat';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/viewPost" element={<ViewMyPost />} />
        </Routes>
      </main>
      <div className="chat">
          <Chat />
        </div>
    </div>
  );
}

export default App;
