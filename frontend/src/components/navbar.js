import '../css/navbar.css'
import { Link } from 'react-router-dom'
import {useState} from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import flower from '../images/flower.jpeg'
import { IoIosNotificationsOutline } from "react-icons/io";
import Notification from './notification';
import { useNavigate } from "react-router-dom";

function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openNotification,setOpenNotification] = useState(false)
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
          <div className='notificationDiv'>
            <IoIosNotificationsOutline  className='notificationBell' onClick={getNotifications}/>
            </div>

            <img  className='profilePhoto'  onClick={handleClick} src={flower} alt=''/>
             <Menu anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
           <Link className="link" to="profile"> <MenuItem onClick={handleClose}>Profile</MenuItem></Link>
           <Link className="link" to="/updatepassword"> <MenuItem onClick={handleClose}>Update Password</MenuItem></Link>
           <Link className="link" to="/"> <MenuItem onClick={handleClose}>Logout</MenuItem></Link>
            </Menu>
          </div>
        </div>
                <div className='notificationSection'>
        {openNotification && <Notification />}
        </div>
      </div>
    );
}
export default Navbar

