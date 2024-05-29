import flower from '../images/superman.jpeg'
import '../css/chatwithUser.css'
import {useState} from 'react'
import Message from './message';
function ChatwithUser () {
    const [showMessageDialog,setShowMessageDialog] = useState(false);
    const openMessage = () =>{
      setShowMessageDialog(true)
    }

return (
    <div>

      <div className='namePhotoDiv' onClick={openMessage}>
        <div>
      <img alt=''  src={flower} className='photo'/>
        </div>
        <div className='username'>
        <span>Nitin Vyas</span>
        </div>
      </div>





    </div>
)
}

export default ChatwithUser;