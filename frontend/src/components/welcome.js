import React from "react";

import Card from "./card"
import '../css/welcome.css'
import Chat from "./chat";

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
        <div className="chat">
          <Chat />
        </div>
      </div>

    </div>
  );
}

export default Welcome;
