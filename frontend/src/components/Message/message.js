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
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const hiddenFileInput = useRef(null);
  const receiverDetails = props.userDetails;
  const dispatch = useDispatch();
  const username = useSelector((state) => state.cookie.username);
  const [previousMessages, setPreviousMessages] = useState([]);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    dispatch(checkCookie());
  }, [dispatch]);

  useEffect(() => {

      const newSocket = io(SOCKET_SERVER_URL);
      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
  }, [receiverDetails.email]);
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, previousMessages, props.messageBox]);

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
        socketId: socket.id
      });
      setMessage('');
    }
  };

  useEffect(() => {
    if (socket) {
      socket.emit('authenticate', receiverDetails.email);

      socket.on('private message', ({ sender, message }) => {
        setMessages(prevMessages => [
          ...prevMessages,
          { sender, message }
        ]);
      });

      socket.emit('getPreviousMessages', {
        sender: username.email,
        receiver: receiverDetails.email
      });

      socket.on('previousMessages', (previousMsg) => {
        setPreviousMessages(previousMsg);
      });

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

  return (
    <div>
      {props.messageBox && (
        <Card sx={{ minWidth: 275 }}>
          <CardContent style={{ padding: "0px" }}>
            <div>
              <div className="messageDialog">
                <div className="closeButtonMessage">
                  <IoCloseSharp onClick={setShowDialog} />
                </div>
                <div className="profilePic">
                  <img
                    alt=""
                    src={receiverDetails?.profilePicture ? "data:image/png;base64," + receiverDetails?.profilePicture : user}
                    className="photo"
                  />
                  <p>{receiverDetails.firstName} {receiverDetails.lastName}</p>
                </div>
                <div className="chatBox" ref={chatBoxRef}>
              
                  {previousMessages && previousMessages.length > 0 ? (
                    previousMessages.map((msg, index) => (
                      msg.sender === 'receiver' ? (
                        <SendMsg key={index} message={msg.message} time={msg.time} />
                      ) : (
                        <RecievedMsg key={index} message={msg.message} time={msg.time} />
                      )
                    ))
                  ) : (
                    <p className="noChat">There are no messages to show. Start a new chat to connect!</p>
                  )}


                  {messages.map((msg, index) => (
                    msg.sender !== username.email ? (
                      <RecievedMsg key={index} message={msg.message} />
                    ) : (
                      <SendMsg key={index} message={msg.message}  />
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
