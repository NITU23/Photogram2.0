import { useEffect, useState } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import './post.css';
import { fetchUserPosts } from '../../services/postService';
import ShimmerLayout from '../Shimmer/shimmer';
import user from '../../images/user.jpeg'
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
  const [userPost, setUserPost] = useState([])
  const [apiCalled, setApiCalled] = useState();
  useEffect(() => {
    const fetchData = async () => {
      setApiCalled(true);
      let allPosts = await fetchUserPosts(props.username);
      setUserPost(allPosts)
      setApiCalled(false)
      props.totalPosts(allPosts.length)
    };
    fetchData();
  }, [props.username]);

  return (
    <div className='posts'>
      <div className='grid-container'>
        {userPost.length === 0 && apiCalled && <> <ShimmerLayout /><ShimmerLayout /><ShimmerLayout /> </>}
        {userPost.length > 0 && userPost?.map((item, index) => (
          <div key={index} className='grid-item'>
            <Item className='item'>
              <img src={item?.file[0] ? "data:image/png;base64," + item?.file[0] : user} alt='post' className='postImg' />
            </Item>
          </div>
        ))}
        {userPost.length === 0 && !apiCalled && <div className="noPosts"> <h1>Hey there, looks like this feed could use a touch of your magic.</h1></div>}
      </div>
    </div>
  );
}

export default Post;
