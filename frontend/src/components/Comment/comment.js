import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import flower from '../../images/flower.jpeg'
import './comment.css'
export default function Comment(props) {
  const [showComponent, setShowComponent] = useState(props.showDialog)
  const handleShowComponent = () => {
    props.getCommentVar(false);
    setShowComponent(false);
  }
  return (
    <div>
      {showComponent && <Card className='cardWidth' >
        <div className='closeButton'><IoCloseSharp onClick={handleShowComponent} /></div>
        <CardContent>
          <div className='viewAllCommentDiv' >
            <span className='viewAllcomment'><img  className='commentImg'  src={flower} alt=''/><b>NitinV : </b></span>
           
          </div>
          <div className='commentDiv'>
            <input type="text" name="comment" className='commentBox' placeholder='Add your comment' />
            <button className='post'>Post</button>
          </div>
        </CardContent>
      </Card>
      }
    </div>
  );
}
