import flower from '../images/superman.jpeg'
import '../css/chatwithUser.css'
import {useState,useEffect} from 'react'
import { IoIosSearch } from "react-icons/io";
import { fetchUser } from '../services/userService';
function ChatwithUser (props) {
    const [showMessageDialog] = useState(false);
    const [users,setUsers] = useState([])
    const openMessage = () =>{
      showMessageDialog===true ? props.showChat(false) : props.showChat(true)
    }
  useEffect(()=>{
    const fetchUsers = async () => {
      let allUsers = await fetchUser();
      setUsers(allUsers)
    };
    fetchUsers();
  },[])
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
    </div>
)
}

export default ChatwithUser;