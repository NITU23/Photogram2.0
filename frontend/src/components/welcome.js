import React from "react";
import Card from "./card"
import '../css/welcome.css'


function Welcome() {
  return (
    <div>


      <div className='parent'>
        <div className='cards'>
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>

    </div>
  );
}

export default Welcome;
