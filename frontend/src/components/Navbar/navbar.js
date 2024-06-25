import './navbar.css'
import { Link } from 'react-router-dom'
import {useState, useEffect} from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoIosNotificationsOutline } from "react-icons/io";
import Notification from '../Notification/notification';
import { useNavigate } from "react-router-dom";
import MessageBar from '../../util/snackbar';
import { IoIosSearch } from 'react-icons/io';
import { checkCookie } from '../../redux/checklogin';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../services/userService';
import user from '../../images/user.jpeg'
import { io } from "socket.io-client";
const SOCKET_SERVER_URL = "http://localhost:5001";
function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openNotification,setOpenNotification] = useState(false)
    const [showSnackbar,setShowsnackbar] = useState(false)
    const [details,setDetail] = useState()
    const [socket, setSocket] = useState(null);
     const navigate = useNavigate()
    const dispatch = useDispatch();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const getNotifications = () => {
      setOpenNotification(true)
      openNotification ===true ? setOpenNotification(false) : setOpenNotification(true)
    }

    const createPost = () => {
     navigate('/createPost')
    }
    const logout = async () => {
      const url ='http://localhost:3001/api/user/logout' ;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      })
      if(response.status!==200){
        setShowsnackbar(true);
        setAnchorEl(null);
      }
      else {
        setAnchorEl(null);
        dispatch(checkCookie());
        navigate('/login')
      }
      setTimeout(()=>{
        setShowsnackbar(false);
      },2000)
    }
    const cookieExists = useSelector((state) => state.cookie.cookieExists);
  useEffect(() => {
    dispatch(checkCookie());
  }, [dispatch]);

  useEffect(()=>{
    if(cookieExists){
    const fetchUserDetails = async () => {
      let detail = await getUserProfile();
      if(detail){
       setDetail(detail.response)
      }
    };
    fetchUserDetails();
  }
  const newSocket = io(SOCKET_SERVER_URL);
      setSocket(newSocket);
      return () => {
        newSocket.disconnect();
      };
},[])

  const getUsers=(event)=>{

    let searchValue = event.target.value
    if(searchValue.length>3){
      socket.emit('searchUser',searchValue)
      console.log('I am changed',searchValue)
    }

  }

    return (
      <>
        <div className="navbar">
          <div className="heading">
            <Link className="link" to="/welcome"> Photogram </Link>
          </div>
        { cookieExists &&   <div className='profileMenu'>
          <div>
        <button className='button postButton' onClick={createPost} >Create A Post</button>
        </div>
        <div className='searchBox'>
        <IoIosSearch  style={{marginTop: "10px"}}/>
        <input placeholder='Type Here To Search Users' onChange={getUsers} className='searchBar'/>

        </div>
          <div className='notificationDiv'>
            <IoIosNotificationsOutline  className='notificationBell' onClick={getNotifications}/>
            </div>

            <img  className='profilePhoto'  onClick={handleClick} src={details?.profile ? "data:image/png;base64," + details?.profile: user} alt=''/>
             <Menu anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
           <Link className="link" to="profile"> <MenuItem>Profile</MenuItem></Link>
           <Link className="link" to="/updateprofile"> <MenuItem >Update Profile</MenuItem></Link>
           <Link className="link" > <MenuItem onClick={logout}>Logout</MenuItem></Link>
            </Menu>
          </div>}
        </div>
                <div className='notificationSection'>
        {openNotification && <Notification />}
        {showSnackbar && <MessageBar message='Unable to logout'/>}
        </div>
      </>
    );
}
export default Navbar

