import './profile.css';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Post from '../Post/post';
import Snackbar from '@mui/material/Snackbar';
import { getUserProfile } from '../../services/userService';
import user from '../../images/user.jpeg';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Followers from '../Follower/follower'; 

export default function Profile() {
  const location = useLocation();
  const { pathname } = location;
  const email = pathname.split('/')[2];

  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const [detail, setDetail] = useState(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [realUser, setRealUser] = useState(false);
  const socket = useSelector((state) => state.socket.socket);
  const username = useSelector((state) => state.cookie.username);
  const [getDialog, setGetDialog] = useState(false);
  const [openConnections,setOpenConnections] = useState()

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getUserProfile(email);
      setDetail(userDetails.response);
      if (email === username.email) {
        setRealUser(true);
      } else {
        setRealUser(false);
      }
      setIsFollowing(userDetails.response.following);
    };
    fetchUserDetails();
  }, [email]);

  const handleClick = () => {
    const updatedFollowing = !isFollowing;
    const updatedDetail = { ...detail, username, following: updatedFollowing };
    setIsFollowing(updatedFollowing);

    socket.emit('followUser', updatedDetail);
    setState({ ...state, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const getTotalPosts = (postsLength) => {
    setTotalPosts(postsLength);
  };

  const openDialog = (item) => {
    if(item==='followers' || item==='followings'){
    setOpenConnections(item)
    }
    else {
      setOpenConnections('')
    }
    setGetDialog(!getDialog);
  };

  return (
    <div className="profileContainer">
      <Card className="profileCard">
        <CardContent>
          <div className='profileDetail'>
            <img src={detail?.profile ? `data:image/png;base64,${detail.profile}` : user} alt='' className='profilePicture' />
            <p className='names'>{detail?.firstName} {detail?.lastName}</p>
            <div className='tableDiv'>
              <table>
                <thead>
                  <tr>
                    <th scope="col"><center>{totalPosts}</center></th>
                    <th scope="col" style={{ cursor: 'pointer' }} onClick={()=>openDialog('followers')}><center>5</center></th>
                    <th scope="col" style={{ cursor: 'pointer' }} onClick={()=>openDialog('followings')}><center>5</center></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Posts</td>
                    <td style={{ cursor: 'pointer' }} onClick={()=>openDialog('followers')}>Followers</td>
                    <td style={{ cursor: 'pointer' }} onClick={()=>openDialog('followings')}>Followings</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {!realUser && <div className='connect'>
              <button className='button' onClick={handleClick}>
                <li className='listItem'>{isFollowing ? 'Following' : 'Follow'}</li>
              </button>
              <button className='button'>
                <li className='listItem'>Message</li>
              </button>
            </div>}
          </div>
          <hr />
          {detail && <Post username={detail?.email} totalPosts={getTotalPosts} />}
          <Snackbar
            anchorOrigin={{ vertical: state.vertical, horizontal: state.horizontal }}
            open={state.open}
            onClose={handleClose}
            autoHideDuration={1000}
            message={`You are now ${isFollowing ? 'following' : 'unfollowing'} this user.`}
            key={`${state.vertical},${state.horizontal}`}
          />
          {getDialog && <Followers open={getDialog} onClose={openDialog} connections={openConnections} />}
        </CardContent>
      </Card>
    </div>
  );
}
