import React,{useEffect} from "react";
import Card from "./card"
import '../css/welcome.css'
import { fetchPosts } from "../services/postService";


function Welcome() {

  useEffect(()=>{
   let resp= fetchPosts()
   console.log("Hello I am response",resp)
  },[])
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
