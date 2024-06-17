import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import flower from '../../images/superman.jpeg';
import './message.css'
import { IoCloseSharp } from "react-icons/io5";
import { useState } from 'react';
import RecievedMsg from '../RecievedMsg/recievedMsg';
import SendMsg from '../SendMsg/sendMsg';
import { IoIosAttach } from "react-icons/io";
import { useRef } from 'react';

export default function Message(props) {
    const [viewDialog, setViewDialog] = useState(props.messageBox);
    const hiddenFileInput = useRef(null);
    const setShowDialog = () => {
        props.showMessageBoxState(false)
        setViewDialog(false)
    }

    const handleClick = event => {
        hiddenFileInput.current.click();
      };

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
                    <SendMsg />
                    <RecievedMsg />
                    <SendMsg />
                    <RecievedMsg />
                    <SendMsg />
                    <RecievedMsg />
                    <SendMsg />
                    <RecievedMsg />
                    <SendMsg />
                  </div>

                  <div className="sendDiv">
                    <IoIosAttach onClick={handleClick} className='attachFile' />
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
                    />
                    <button className="post">Send</button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
}
