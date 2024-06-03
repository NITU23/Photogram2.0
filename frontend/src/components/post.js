import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import '../css/post.css'; // Import external CSS file
import flower from '../images/flower.jpeg';
import { Link } from 'react-router-dom'
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Post() {
  return (
    <div className='posts'>
      <div className='grid-container'>
        {Array.from(Array(10)).map((_, index) => (
          <div key={index} className='grid-item'>
            <Item className='item'>
            <Link to="/viewPost"><img src={flower} alt='' className='postImg'/></Link>
            </Item>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Post;
