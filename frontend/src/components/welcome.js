import React,{useEffect, useState} from "react";
import Card from "./card"
import '../css/welcome.css'
import { fetchPosts } from "../services/postService";
import ShimmerLayout from "./shimmer";
function Welcome() {
   const [allPost,setAllPost] = useState([])
   const [reload,setReload] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      let allPosts = await fetchPosts();
      setAllPost(allPosts)
    };
    fetchData();
  }, []);


   const updateReload = async(value)=>{
    setReload(value)
    let allPosts = await fetchPosts();
    setAllPost(allPosts)
   }
  return (
  <div>
       { allPost.length===0 && <div className="parent"> <ShimmerLayout /> <ShimmerLayout /><ShimmerLayout /><ShimmerLayout /></div>}
     { allPost && <div className='parent'>
        <div className='cards'>
        {allPost.length>0 && allPost?.map((item, index) => (
        <div key={index}>
        <Card  caption={item.caption} location={item.location} file={item.file} username={item.username} profile={item.profilePic} postid={item.postid} realUser = {item.realUser} load={updateReload}/>
        </div>
      ))}
        </div>
      </div>}

    </div>
  );
}

export default Welcome;
