import React, { useState, useRef, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import flower from "../../images/superman.jpeg";
import "./message.css";
import { IoCloseSharp } from "react-icons/io5";
import RecievedMsg from "../RecievedMsg/recievedMsg";
import SendMsg from "../SendMsg/sendMsg";
import { IoIosAttach } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { checkCookie } from '../../redux/checklogin';
import { io } from "socket.io-client";
const socket = io("http://localhost:5001");

const Message = (props) => {
  const [viewDialog, setViewDialog] = useState(props.messageBox);
  const [message,setMessage] = useState('')
  const [recievedMsg,setRecievedMsg] = useState('')
  const hiddenFileInput = useRef(null);
   const receiverDetails = props.userDetails
  const setShowDialog = () => {
    props.showMessageBoxState(false);
    setViewDialog(false);
    socket.off("welcome");
  };
  const dispatch = useDispatch();
  const username = useSelector((state) => state.cookie.username);
  useEffect(() => {
    dispatch(checkCookie());
  }, [dispatch]);
  const handleChange = (event) =>{
    let value = event.target.value
   setMessage(value);
  }
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const sendMessage = () => {
    socket.emit('message',{
      text:message,
      username:username.email,
      receiver: receiverDetails.email
    })
    setMessage('')
  };

  useEffect(() => {
    socket.on("Response", (data) => {
      console.log("Response from Server:", data);
      setRecievedMsg(data)
    });
    return () => {
      socket.off("welcome");
    };
  }, []);
 
 const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  return (
    <div>
      {viewDialog && (
        <Card sx={{ minWidth: 275 }}>
          <CardContent style={{ padding: "0px" }}>
            <div>
              <div className="messageDialog">
                <div className="closeButton">
                  <IoCloseSharp onClick={setShowDialog} />
                </div>
                <div className="profilePic">
                  <img alt="" src={flower} className="photo" />
                  <h4>Nitin Vyas</h4>
                </div>
                <div className="chatBox">
                  <RecievedMsg />
                  <SendMsg  message={recievedMsg} />
                </div>

                <div className="sendDiv">
                  <IoIosAttach onClick={handleClick} className="attachFile" />
                  <input
                    type="file"
                    ref={hiddenFileInput}
                    style={{ display: "none" }}
                  />
                  <input
                    type="text"
                    name="comment"
                    className="commentBox"
                    placeholder="Write a message"
                    value={message}
                    onChange={handleChange}
                    onKeyDown={_handleKeyDown}
                  />
                  <button className="post" onClick={sendMessage}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Message;
