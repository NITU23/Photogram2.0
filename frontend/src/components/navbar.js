import '../css/navbar.css'
import { Link } from 'react-router-dom'
import {useState} from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import flower from '../images/flower.jpeg'
import { IoIosNotificationsOutline } from "react-icons/io";
import Notification from './notification';
import { useNavigate } from "react-router-dom";
import MessageBar from '../util/snackbar';
import { IoIosSearch } from 'react-icons/io';
function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openNotification,setOpenNotification] = useState(false)
    const [showSnackbar,setShowsnackbar] = useState(false)
    const navigate = useNavigate()
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
        navigate('/login')
      }
      setTimeout(()=>{
        setShowsnackbar(false);
      },2000)
    }

    return (
      <div>
        <div className="navbar">
          <div className="heading">
            <Link className="link" to="/welcome"> Photogram </Link>
          </div>
          <div className='profileMenu'>
          <div>
        <button className='button postButton' onClick={createPost} >Create A Post</button>
        </div>
        <div className='searchBox'>
        <IoIosSearch  style={{marginTop: "10px"}}/>
        <input placeholder='Type Here To Search Users' className='searchBar'/>

        </div>
          <div className='notificationDiv'>
            <IoIosNotificationsOutline  className='notificationBell' onClick={getNotifications}/>
            </div>

            <img  className='profilePhoto'  onClick={handleClick} src={flower} alt=''/>
             <Menu anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
           <Link className="link" to="profile"> <MenuItem>Profile</MenuItem></Link>
           <Link className="link" to="/updateprofile"> <MenuItem >Update Profile</MenuItem></Link>
           <Link className="link" > <MenuItem onClick={logout}>Logout</MenuItem></Link>
            </Menu>
          </div>
        </div>
                <div className='notificationSection'>
        {openNotification && <Notification />}
        {showSnackbar && <MessageBar message='Unable to logout'/>}
        </div>
      </div>
    );
}
export default Navbar

