
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChatwithUser from './chatwithUser';
import Message from './message';
import '../css/chat.css'
function Chat() {
   return (
   <div>
    <div className='accordian-Message'>
     <div className='messageBox'><Message/></div> 
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