import flower from '../images/superman.jpeg'
import '../css/chatwithUser.css'
import {useState} from 'react'
import { IoIosSearch } from "react-icons/io";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
function ChatwithUser (props) {
    const [showMessageDialog,setShowMessageDialog] = useState(false);
    const openMessage = () =>{
      showMessageDialog===true ? props.showChat(false) : props.showChat(true)
    }

return (
    <div>
        <div className='searchBox'>
        <IoIosSearch />
        <input placeholder='Type Here To Search' className='searchBar'/>
     
        </div>
      <div className='namePhotoDiv' onClick={openMessage}>
        <div>
      <img alt=''  src={flower} className='photo'/>
        </div>
        <div className='username'>
        <span>Nitin Vyas</span>
        </div>
      </div>
      <hr />
      <div className='namePhotoDiv' onClick={openMessage}>
        <div>
      <img alt=''  src={flower} className='photo'/>
        </div>
        <div className='username'>
        <span>Nitin Vyas</span>
        </div>
      </div>
      <hr />
      <div className='namePhotoDiv' onClick={openMessage}>
        <div>
      <img alt=''  src={flower} className='photo'/>
        </div>
        <div className='username'>
        <span>Nitin Vyas</span>
        </div>
      </div>
      <hr />
    </div>
)
}

export default ChatwithUser;