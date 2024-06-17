import './card.css'
import { PiHeart } from 'react-icons/pi';
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { useState } from 'react';
import Name from '../Name/name'
import Comment from '../Comment/comment'
import DeleteIcon from '@mui/icons-material/Delete';
import { deletePost } from '../../services/postService';
import user from '../../images/user.jpeg'
function Card(props) {
  const {caption,location,file,username,profile} = props
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
  const deletePhoto = async () => {
    let response = await deletePost(props.postid)
    props.load(true)
}

  return (
    <div>
      <div className="card">
        <div className='photoDetails'>
          <div className='wrapper'>
            <div className='mainDiv'>
              <div className='deleteName'>
              {(props.realUser === props.username) && <div className='deleteDiv' onClick={deletePhoto}>
                <DeleteIcon />
              </div>}
              <Name location={location} username={username} profilePic = {profile}/>
              </div>

              <img className="img" src={file? "data:image/png;base64," + file: user}  alt='' onDoubleClickCapture={setClick} />
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