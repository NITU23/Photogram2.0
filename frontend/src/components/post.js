import   {useEffect,useState } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import '../css/post.css';
import { Link } from 'react-router-dom';
import { fetchUserPosts } from '../services/postService';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}));




function Post(props) {
  const [userPost,setUserPost] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      let allPosts = await fetchUserPosts(props.username);
      setUserPost(allPosts)
    };
    fetchData();
  },[]);

  return (
    <div className='posts'>
  <div className='grid-container'>
  {userPost?.map((item, index) => (
    <div key={index} className='grid-item'>
     <Item className='item'>
  <Link to="/viewPost">
      <img src={"data:image/png;base64," + item.file[0]} alt='post' className='postImg'/>
  </Link>
</Item>
    </div>
  ))}
</div>
    </div>
  );
}

export default Post;
