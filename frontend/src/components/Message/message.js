import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./message.css";
import { IoCloseSharp } from "react-icons/io5";
import RecievedMsg from "../RecievedMsg/recievedMsg";
import SendMsg from "../SendMsg/sendMsg";
import { IoIosAttach } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { checkCookie } from '../../redux/checklogin';
import user from '../../images/user.jpeg';
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5001";

const Message = (props) => {
  const [message, setMessage] = useState('');
  const [recievedMsg, setRecievedMsg] = useState([]);
  const [socket, setSocket] = useState(null);
  const [sendMsg,setSendMsg] = useState([])
  const hiddenFileInput = useRef(null);
  const receiverDetails = props.userDetails;
  const dispatch = useDispatch();
  const username = useSelector((state) => state.cookie.username);
  const [previousMessages,setPreviousMessages] = useState()
  useEffect(() => {
    dispatch(checkCookie());
  }, [dispatch]);

  useEffect(() => {
    if (!socket) {
      const newSocket = io(SOCKET_SERVER_URL);
      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, []);

  const setShowDialog = () => {
    props.showMessageBoxState(false);
  };

  const handleChange = (event) => {
    let value = event.target.value;
    setMessage(value);
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const sendMessage = () => {
    if (socket) {
      socket.emit('message', {
        text: message,
        username: username.email,
        receiver: receiverDetails.email,
        socketId : socket.id
      });
      setMessage('');
    }
  };

  useEffect(() => {
    if (socket) {
      socket.emit('authenticate', receiverDetails.email);
      socket.on('private message', ({ senderId, message, sender, receiver}) => {
        console.log('-------', { senderId, message,sender,receiver });
        if(receiverDetails.email===receiver){
          setSendMsg(prevSendMsg => [...prevSendMsg, message]);
        }
        else {
          setRecievedMsg(prevReceivedMsg => [...prevReceivedMsg, message]);
        }
    });

    socket.emit('getPreviousMessages',( {sender: username.email, receiver: receiverDetails.email}))
   socket.on('previousMessages',(previousMsg)=>{
      setPreviousMessages(previousMsg);
   })
      return () => {
        socket.disconnect();
      };
    }
  }, [socket, receiverDetails.email]);

  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
  console.log('Hello i am msg component',previousMessages)

  return (
    <div>
      {props.messageBox && (
        <Card sx={{ minWidth: 275 }}>
          <CardContent style={{ padding: "0px" }}>
            <div>
              <div className="messageDialog">
                <div className="closeButton">
                  <IoCloseSharp onClick={setShowDialog} />
                </div>
                <div className="profilePic">
                  <img
                    alt=""
                    src={receiverDetails?.profilePicture ? "data:image/png;base64," + receiverDetails?.profilePicture : user}
                    className="photo"
                  />
                  <h4>{receiverDetails.firstName} {receiverDetails.lastName}</h4>
                </div>
                <div className="chatBox">
                  {previousMessages && previousMessages.map((msg, index) => (
                    msg.sender === 'you' ? (
                      <SendMsg key={index} message={msg.message} />
                    ) : (
                      <RecievedMsg key={index} message={msg.message} />
                    )
                  ))}
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
