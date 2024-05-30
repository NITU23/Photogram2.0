
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChatwithUser from './chatwithUser';
import Message from './message';
import '../css/chat.css'
import { useState } from 'react';
function Chat() {
    const [showMessageBox,setShowMessageBox] = useState('false');
     const showChatBox = (data)=>{
      console.log('hello this is called')
      setShowMessageBox(data)
     }
   return (
   <div>
    <div className='accordian-Message'>
    { showMessageBox && <div className='messageBox'><Message chatBox={showChatBox}/></div>}
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
          <ChatwithUser />
        </AccordionDetails>
      </Accordion>
      </div>
    </div>
   </div>)
}

export default Chat