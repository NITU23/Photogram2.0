import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import flower from '../images/superman.jpeg';
import '../css/message.css'
import { IoCloseSharp } from "react-icons/io5";
import { useState } from 'react';


export default function Message(props) {
    const [viewDialog, setViewDialog] = useState(props.messageBox);

    const setShowDialog = () => {
        props.showMessageBoxState(false)
        setViewDialog(false)
    }
  
    return (
        <div>
        { viewDialog && <Card sx={{ minWidth: 275 }}>
                <CardContent style={{ padding: '0px' }}>
                    
                    <div>
                        <div className='messageDialog'>
                            <div className='closeButton'>
                                <IoCloseSharp onClick={setShowDialog} />
                            </div>
                            <div className='profilePic'>
                                <img alt='' src={flower} className='photo' />
                                <h4>Nitin Vyas</h4>
                            </div>
                            <div className='chatBox'>
                            </div>
                            <div className='sendDiv'>
                                <input type="text" name="comment" className='commentBox' placeholder='Write a message' />
                                <button className='post'>Send</button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>}
        </div>

    );
}
