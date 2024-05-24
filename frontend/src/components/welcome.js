import React from "react";
import Navbar from "./navbar";
import Card from "./card"
import '../css/welcome.css'

function Welcome() {
  return (
    <div className="Welcome">
      <Navbar />
      <Card />
      <Card />
      <Card />
      <Card />
      
    </div>
  );
}

export default Welcome;
