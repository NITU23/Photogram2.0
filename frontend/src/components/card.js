import img from '../images/flower.jpeg'
import '../css/card.css'
import { PiHeart } from 'react-icons/pi';
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { useState } from 'react';
import Name from './name'
import Comment from './comment'
function Card() {
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
            <div >
              <Name />
              <img className="img" src={img} alt='' onDoubleClickCapture={setClick} />
              <div className="img">
                {!isClicked && <PiHeart className="like heart actions" onClick={setClick} />}
                {isClicked && <FaHeart className="liked actions" onClick={setClick} />}
                <FaRegComment className="like comment actions" onClick={setAddComments} />
                <FiSend className="like comment" />
              </div>
            </div>
             <div className='commentDialog'>
             { showCommentComponent &&  <Comment showDialog={showCommentComponent} getCommentVar={getData}  /> }
            </div>
          </div>
          <div className='captionDiv'>
            <span className='caption'>Hello My first Pic aptions redis-cluster-alpha2-new4 Captions redis-cluster-alpha2-new4 chlyvs ng 0001 use2 cache amazonaws comCaptions redis-cluster-alpha2-new4 chlyvs ng 0001 use2 cache amazonaws com</span>
          </div>
         { !showCommentComponent && <div className='commentDiv'>
            <input  type="text" name="comment" className='commentBox' placeholder='Add your comment' />
            <button className='post'>Post</button>
          </div> }
        </div>
      </div>
    </div>
  );
}

export default Card;