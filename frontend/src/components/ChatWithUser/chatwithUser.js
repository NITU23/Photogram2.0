import './chatwithUser.css'
import {useState,useEffect} from 'react'
import { IoIosSearch } from "react-icons/io";
import { fetchUser } from '../../services/userService';
import user from '../../images/user.jpeg'
import { useSelector } from 'react-redux';

function ChatwithUser (props) {
    const [showMessageDialog] = useState(false);
    const [users,setUsers] = useState('')
    const openMessage = details =>{
      showMessageDialog===true ? props.showChat(false) : props.showChat(true)
      props.userDetail(details)
    }
    const socket = useSelector((state) => state.socket.socket);
  useEffect(()=>{
    const fetchUsers = async () => {
      let allUsers = await fetchUser();
      setUsers(allUsers)
    };
    fetchUsers();
  },[])
  const getUsers = (event) => {
    let searchValue = event.target.value;
    if (searchValue.length > 3) {
      socket.emit('searchUserChat', searchValue);
      socket.on('searchedUsersChat', (users) => {
        if(users.length>0){
          setUsers(users);
        }
        else {
          setUsers('')
        }
      });
    }
    else {
      const fetchUsers = async () => {
        let allUsers = await fetchUser();
        setUsers(allUsers)
      };
      fetchUsers();
    }
  };
return (
    <div>
        <div className='searchBox'>
        <IoIosSearch />
        <input placeholder='Type Here To Search'  onChange={getUsers} className='searchBar' autoComplete="off"/>
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
    {!users &&
    <div>No Users Found</div>}
      <hr />
    </div>
)
}

export default ChatwithUser;