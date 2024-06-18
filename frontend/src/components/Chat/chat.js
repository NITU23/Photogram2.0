
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChatwithUser from '../ChatWithUser/chatwithUser';
import Message from '../Message/message';
import './chat.css'
import { useState } from 'react';
function Chat() {

    const [showMessageBox,setShowMessageBox] = useState(false);
    const [userDetail,setUserDetail] = useState('')
     const showChatBox = (data)=>{
      setShowMessageBox(data) 
     }
     const getUserDetails=(data)=>{
      setUserDetail(data)
     }
   return (
   <div>
    <div className='accordian-Message'>
    { showMessageBox && <div className='messageBox'><Message messageBox={showMessageBox} showMessageBoxState={setShowMessageBox}  userDetails={userDetail} /></div>}
     <div className='accordianWidth'>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
        Messages
        </AccordionSummary>
        <AccordionDetails className='accordianHeight'>
          <ChatwithUser showChat = {showChatBox} userDetail={getUserDetails}  />
        </AccordionDetails>
      </Accordion>
      </div>
    </div>
   </div>)
}

export default Chat