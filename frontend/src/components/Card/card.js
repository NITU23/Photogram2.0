import "./card.css";
import { PiHeart } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { useState } from "react";
import Name from "../Name/name";
import Comment from "../Comment/comment";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletePost } from "../../services/postService";
import user from "../../images/user.jpeg";
import Like from "../Like/like";
import { addComments } from "../../services/postService";
import Errorbar from "../../util/errorSnackbar";
import MessageBar from "../../util/snackbar";

function Card(props) {
  const {caption,location,file,username,profile,postid,realUser,socket,like,likedUsers} = props;
  const [showCommentComponent, setShowCommentComponent] = useState(false);
  const [showLikedComponent, setShowLikedComponent] = useState(false);
  const [liked,setLiked] = useState(like)
  const [comment,setComment] = useState('')
  const [showSnackbar,setShowSnackbar] = useState(false);
  const [message,setMessage] = useState('')
  const [error,setError] = useState('')
  const setClick = () => {
    socket.emit("like", { postid: postid, liked: !liked, user: realUser });
    liked=== true ? setLiked(false) : setLiked(true);
  };
  const setAddComments = () => {
     setShowCommentComponent(!showCommentComponent)
  };
  const getData = (data) => {
    setShowCommentComponent(data);
  };
  const deletePhoto = async () => {
    await deletePost(props.postid);
    props.load(true);
  };
  const viewLikes = () => {
    setShowLikedComponent(!showLikedComponent);
  };
  const setShowLikedDialog = () =>{
    setShowLikedComponent(!showLikedComponent);
  }
  const addComment = async(data) => {
   let body;
    if(data){
      body = JSON.stringify({postid,comment:data})
    }
    else{
      body = JSON.stringify({postid,comment})
    }
   let response =  await addComments(body)
   if(response.status===200){
    setError('')
    setShowSnackbar(true);
    setMessage(response.message.msg)
   }else {
    setShowSnackbar(true)
    setMessage('')
    setError(response.message.msg)
   }
     setComment('')
  }
  const handleComment = (event) =>{
    setComment(event.target.value)
  }
  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addComment();
    }
  };
  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  }

  return (
    <div>
      <div className="card">
        <div className="photoDetails">
          <div className="wrapper">
            <div className="mainDiv">
              <div className="deleteName">
                {props.realUser === props.username && (
                  <div className="deleteDiv" onClick={deletePhoto}>
                    <DeleteIcon />
                  </div>
                )}
                <Name
                  location={location}
                  username={username}
                  profilePic={profile}
                />
              </div>

              <img
                className="img"
                src={file ? "data:image/png;base64," + file : user}
                alt=""
                onDoubleClickCapture={setClick}
              />
              <div>
                {( !liked) ? (
                  <PiHeart className="like heart actions" onClick={setClick} />
                ) : (
                  <FaHeart className="liked actions" onClick={setClick} />
                )}
                <FaRegComment className="like comment actions" onClick={setAddComments} />
              </div>
              <div>
                <span className="viewComment" onClick={viewLikes}>
                  {showLikedComponent === true ? "Hide Likes" : "View Likes"}
                </span>
                <br />
                <span className="viewComment" onClick={setAddComments}>
                  {showCommentComponent === true
                    ? "Hide Comments"
                    : "View Comments"}
                </span>
                <div className="captionDiv">
                  <span className="caption">{caption}</span>
                </div>
                {!showCommentComponent && (
                  <div className="commentDiv">
                    <input
                      type="text"
                      name="comment"
                      className="commentBox"
                      placeholder="Add your comment"
                      onKeyDown={_handleKeyDown}
                      onChange={handleComment}
                      value ={comment}
                    />
                    <button className="post" onClick={()=>addComment(comment)}>Post</button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {showCommentComponent && (
            <div className="commentDialog">
              <Comment
                showDialog={showCommentComponent}
                getCommentVar={getData}
                postid={postid}
                addComment={addComment}
                username={realUser}
              />
            </div>
          )}
          {showLikedComponent && (
            <div className="commentDialog">
              <Like  likedUsers={likedUsers} showLikeDialog = {setShowLikedDialog}/>
            </div>
          )}
        </div>
      </div>
      <Errorbar open={error !== '' && showSnackbar} message={error} onClose={handleSnackbarClose} />
      <MessageBar open={showSnackbar && error === ''} message={message} onClose={handleSnackbarClose} />

    </div>
  );
}

export default Card;