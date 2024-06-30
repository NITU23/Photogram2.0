import React,{useEffect, useState} from "react";
import Card from "../Card/card"
import './welcome.css'
import { fetchPosts } from "../../services/postService";
import ShimmerLayout from "../Shimmer/shimmer";
import { useDispatch, useSelector } from 'react-redux';
import { setSocket } from '../../redux/socket';
function Welcome() {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket.socket);
  console.log('I am socket',socket)
  useEffect(() => {
    dispatch(setSocket());
  }, [dispatch]);
   const [allPost,setAllPost] = useState([])
   const [reload,setReload] = useState(false)
   const [apiCalled,setApiCalled] = useState();

   useEffect(() => {
    const fetchData = async () => {
      setApiCalled(true)
      let allPosts = await fetchPosts();
      setAllPost(allPosts)
      setApiCalled(false)
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
       { allPost.length===0 && apiCalled && <div className="parent"> <ShimmerLayout /> <ShimmerLayout /><ShimmerLayout /><ShimmerLayout /></div>}
     { allPost && <div className='parent'>
        <div className='cards'>
        {allPost.length>0 && allPost?.map((item, index) => (
        <div key={index}>
        <Card  caption={item.caption} location={item.location} file={item.file} username={item.username} profile={item.profilePic} postid={item.postid} realUser = {item.realUser} load={updateReload} socket={socket}/>
        </div>
      ))}
        </div>
      </div>}
      { allPost.length===0 && !apiCalled && <div className="notFound"> <h1>Oops! No Feed to display, Please connect people to view feed.</h1></div>}

    </div>
  );
}

export default Welcome;
