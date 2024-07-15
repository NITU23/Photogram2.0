import './navbar.css'
import { Link } from 'react-router-dom'
import {useState, useEffect} from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoIosNotificationsOutline, IoIosSearch } from 'react-icons/io';
import Notification from '../Notification/notification';
import { useNavigate } from 'react-router-dom';
import { checkCookie } from '../../redux/checklogin';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../services/userService';
import user from '../../images/user.jpeg';
import SearchUser from '../SearchUser/searchUser';
import Errorbar from '../../util/errorSnackbar';



function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openNotification, setOpenNotification] = useState(false);
  const [showSnackbar, setShowsnackbar] = useState(false);
  const [details, setDetail] = useState();
  const socket = useSelector((state) => state.socket.socket);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const [searchUser, setSearchUser] = useState([]);
  const cookieExists = useSelector((state) => state.cookie.cookieExists);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getNotifications = () => {
    setOpenNotification(true);
    setOpenNotification(prev => !prev);
  };

  const createPost = () => {
    navigate('/createPost');
  };
  const handleUsers = () =>{
    setSearchUser([])
  }

  const logout = async () => {
    const url = 'http://localhost:3001/api/user/logout';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (response.status !== 200) {
      setShowsnackbar(true);
      setAnchorEl(null);
    } else {
      setAnchorEl(null);
      socket.disconnect()
      dispatch(checkCookie());
      navigate('/login');
    }
  };

  useEffect(() => {
    dispatch(checkCookie());
  }, [dispatch]);

  useEffect(() => {
    if (cookieExists) {
      const fetchUserDetails = async () => {
        let detail = await getUserProfile();
        if (detail) {
          setDetail(detail.response);
        }
      };
      fetchUserDetails();
    }
  }, [cookieExists]);

  const getUsers = (event) => {
    let searchValue = event.target.value;
    if (searchValue.length > 3) {
      socket.emit('searchUser', searchValue);
      socket.on('searchedUsers', (users) => {
        setSearchUser(users);
      });
    }
    else (
      setSearchUser([])
    )
  };
  const handleSnackbar = () => {
    setShowsnackbar(false);
  };
  return (
    <>
      <div className="navbar">
        <div className="heading">
          <Link className="link" to="/welcome">Photogram</Link>
        </div>
        {cookieExists && (
          <div className='profileMenu'>
            <div>
              <button className='postButton' onClick={createPost}>Create A Post</button>
            </div>
            <div className='navbar_searchBox'>
              <IoIosSearch style={{ marginTop: "10px" }} />
              <input
                placeholder='Type Here To Search Users'
                onChange={getUsers}
                className='searchBar'
                autoComplete="off"
              />
            </div>
            {/* <div className='notificationDiv'>
              <IoIosNotificationsOutline className='notificationBell' onClick={getNotifications} />
            </div> */}
            <img
              className='profilePhoto'
              onClick={handleClick}
              src={details?.profile ? `data:image/png;base64,${details?.profile}` : user}
              alt=''
            />
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <Link className="link" to={`/profile/${details?.email}`}><MenuItem>Profile</MenuItem></Link>
              <Link className="link" to="/updateprofile"><MenuItem>Update Profile</MenuItem></Link>
              <Link className="link"><MenuItem onClick={logout}>Logout</MenuItem></Link>
            </Menu>
          </div>
        )}
      </div>
      {searchUser.length>0  && (
        <div className='searchResults'>
          <SearchUser users={searchUser} setUsers={handleUsers} />
        </div>
      )}
      <div className='notificationSection'>
        {openNotification && <Notification />}
         <Errorbar open = {showSnackbar} message='Unable to logout' onClose={handleSnackbar} />
      </div>
    </>
  );
}

export default Navbar;
