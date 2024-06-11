import React,{useEffect, useState} from "react";
import Card from "./card"
import '../css/welcome.css'
import { fetchPosts } from "../services/postService";


function Welcome() {
   const [allPost,setAllPost] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      let allPosts = await fetchPosts();
      console.log('Hello I am allposts',allPosts)
      setAllPost(allPosts)
    };
  
    fetchData();
  }, []);
  console.log('Heyyyyy', allPost)
  return (
    <div>
      <div className='parent'>
        <div className='cards'>
        {allPost.map((item, index) => (
        <div key={index}>
         <Card  caption={item.caption} location={item.location} file={item.file}/>
        </div>
      ))}
        </div>
      </div>
      
    </div>
  );
}

export default Welcome;
