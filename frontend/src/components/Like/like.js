import { Card, CardContent, Typography } from "@mui/material";
import userimg from "../../images/user.jpeg";
import "./like.css";
import { IoCloseSharp } from "react-icons/io5";

function Like(props) {
  const closeDialog = () => {
    props.showLikeDialog(false);
  };
  return (
    <div>
      <Card>
        <CardContent>
          {props.likedUsers.length > 0 && (
            <Typography variant="h8" component="h5">
              Liked By
            </Typography>
          )}
          <div className="like_closeButton">
            <IoCloseSharp onClick={closeDialog} />
          </div>
          {props.likedUsers.length > 0 &&
            props.likedUsers.map((user, index) => (
              <div key={index} className="userContainer">
                <div className="userPhoto">
                  <img
                    className="like_photo"
                    src={
                      user.profilePicture
                        ? `data:image/png;base64,${user.profilePicture}`
                        : userimg
                    }
                    alt={user.username}
                  />
                </div>
                <div className="userInfo">
                  <div className="like_username">
                    <span>{user.username}</span>
                  </div>
                </div>

                <button className="follow">Follow</button>
              </div>
            ))}
          {props.likedUsers.length === 0 && (
            <p style={{ display: "flex", justifyContent: "center" }}>
              No Likes Found
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Like;
