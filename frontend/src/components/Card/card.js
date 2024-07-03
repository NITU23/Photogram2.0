import "./card.css";
import { PiHeart } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { useState,useEffect } from "react";
import Name from "../Name/name";
import Comment from "../Comment/comment";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletePost } from "../../services/postService";
import user from "../../images/user.jpeg";
import Like from "../Like/like";
import { getLikes } from "../../services/postService";

function Card(props) {
  const {caption,location,file,username,profile,postid,realUser,socket,like} = props;
  const [showCommentComponent, setShowCommentComponent] = useState(false);
  const [showLikedComponent, setShowLikedComponent] = useState(false);
  const [liked,setLiked] = useState(like)
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
                <FiSend className="like comment" />
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
                    />
                    <button className="post">Post</button>
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
              />
            </div>
          )}
          {showLikedComponent && (
            <div className="commentDialog">
              <Like />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;