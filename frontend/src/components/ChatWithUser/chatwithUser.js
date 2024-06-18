import './chatwithUser.css'
import {useState,useEffect} from 'react'
import { IoIosSearch } from "react-icons/io";
import { fetchUser } from '../../services/userService';
import user from '../../images/user.jpeg'
function ChatwithUser (props) {
    const [showMessageDialog] = useState(false);
    const [users,setUsers] = useState('')
    const openMessage = details =>{
      showMessageDialog===true ? props.showChat(false) : props.showChat(true)
      props.userDetail(details)
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
    {users && users.map((item, index) => (
      <div key={index} className='namePhotoDiv' onClick={() => openMessage(item)}>
        <div>
          <img alt='userprofile' className='photo'
            src={item.profilePicture ? `data:image/png;base64,${item.profilePicture}` : user} />
        </div>
        <div className='username'>
          <span>{item.firstName} {item.lastName}</span>
        </div>
      </div>
    ))}
      <hr />
    </div>
)
}

export default ChatwithUser;