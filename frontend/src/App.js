import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/navbar';
import Welcome from '../src/components/welcome';
import Profile from '../src/components/profile';
import './css/app.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
