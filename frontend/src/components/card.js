import img from '../images/flower.jpeg'
import '../css/card.css'
import { PiHeart } from 'react-icons/pi';
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { useState } from 'react';
import Name from './name'
function Card() {
  const [isClicked, setIsClicked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const setClick = () => {
    isClicked === true ? setIsClicked(false) : setIsClicked(true)
  }
  const setComment = () => {
    showComments === true ? setShowComments(false) : setShowComments(true)
  }
  return (
    <div>
      <div className="card">
        <div className='photoDetails'>
          <Name />
          <img className="img" src={img} alt='' />
          <div className="img">
            {!isClicked && <PiHeart className="like heart actions  " onClick={setClick} />}
            {isClicked && <FaHeart className="liked actions" onClick={setClick} />}
            <FaRegComment className="like comment actions" />
            <FiSend className="like comment" />
          </div>
          <div className='captionDiv'>
            <span className='caption'>Hello My first Pic aptions redis-cluster-alpha2-new4 Captions redis-cluster-alpha2-new4 chlyvs ng 0001 use2 cache amazonaws comCaptions redis-cluster-alpha2-new4 chlyvs ng 0001 use2 cache amazonaws com</span>
          </div>
          <div className='commentDiv'>
            <span style={{ textDecoration: "underline", marginBottom: '8px' }}>Comments</span>
            <span className='comments'><b>Nitin : </b>Captions redis-cluster-alpha2-new4.chlyvs.ng.0001.use2.cache.amazonaws.com</span>
            {showComments && <div className='viewAllCommentDiv' >
              <span className='viewAllcomment'><b>NitinV : </b>Captions redis-cluster-alpha2-new4 chlyvs ng 0001 use2 cache amazonaws com Captions redis-cluster-alpha2-new4 chlyvs ng 0001 use2 cache amazonaws com</span>
              <span className='viewAllcomment'><b>NitinV : </b>Captions Captions redis-cluster-alpha2-new4 chlyvs ng 0001 use2 cache amazonaws com</span>
              <span className='viewAllcomment'><b>NitinV : </b>Captions Captions redis-cluster-alpha2-new4 chlyvs ng 0001 use2 cache amazonaws com Captions redis-cluster-alpha2-new4 chlyvs ng 0001 use2 cache amazonaws com</span>
            </div>}
            {<span className='viewComment' onClick={setComment} > {showComments ? 'Show Less Comments' : 'View More Comments'}</span>}


          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;