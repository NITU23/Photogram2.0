import '../css/card.css'
import { PiHeart } from 'react-icons/pi';
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { useState } from 'react';
import Name from './name'
import Comment from './comment'
function Card(props) {
  const {caption,location,file,username} = props
  const [isClicked, setIsClicked] = useState(false);
  const [showCommentComponent, setShowCommentComponent] = useState(false);
  const setClick = () => {
    isClicked === true ? setIsClicked(false) : setIsClicked(true)
  }
  const setAddComments = () => {
    showCommentComponent===true ? setShowCommentComponent(false) : setShowCommentComponent(true) 
  }
  const getData = (data) =>{
    setShowCommentComponent(data)
  }

  return (
    <div>
      <div className="card">
        <div className='photoDetails'>
          <div className='wrapper'>
            <div className='mainDiv'>
              <Name location={location} username={username}/>
              <img className="img" src={"data:image/png;base64," + file}  alt='' onDoubleClickCapture={setClick} />
              <div >
                {!isClicked && <PiHeart className="like heart actions" onClick={setClick} />}
                {isClicked && <FaHeart className="liked actions" onClick={setClick} />}
                <FaRegComment className="like comment actions" onClick={setAddComments} />
                <FiSend className="like comment" />
              </div>
              <div> 
                <span className='viewComment' onClick={setAddComments}>{ showCommentComponent===true?'Hide Comments' : 'View Comments'}</span>
            <div className='captionDiv'>
            <span className='caption'>{caption}</span>
          </div>
         { !showCommentComponent && <div className='commentDiv'>
            <input  type="text" name="comment" className='commentBox' placeholder='Add your comment' />
            <button className='post'>Post</button>
          </div> }
          </div>
            </div>
          
          </div>
          { showCommentComponent &&  <div className='commentDialog'>
          <Comment showDialog={showCommentComponent} getCommentVar={getData}  /> 
            </div>}
         
            
         
        </div>
        
      </div>
    </div>
  );
}

export default Card;