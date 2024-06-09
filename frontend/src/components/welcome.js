import React,{useEffect} from "react";
import Card from "./card"
import '../css/welcome.css'


function Welcome() {
  const fetchPosts = async() =>{
    let url = 'http://localhost:3001/api/post/allImage'
    let posts = await fetch(url,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'}
      )
      console.log('Hello I am response from api',posts)
  }
  useEffect(()=>{
    fetchPosts()
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
