import React from "react";
import Navbar from "./navbar";
import Card from "./card"
import '../css/welcome.css'

function Welcome() {
  return (
    <div>
      
      <Navbar />
      <div className='cards'>
      <Card />
      <Card />
      <Card />
      <Card />
      </div>    
    </div>
  );
}

export default Welcome;
