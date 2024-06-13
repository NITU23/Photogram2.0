import '../css/profile.css';
import React, { useEffect,useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Post from './post';
import Snackbar from '@mui/material/Snackbar';
import { getUserProfile } from '../services/userService';
export default function Profile() {
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const [detail,setDetail] = useState()
  const { vertical, horizontal, open } = state;
  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      let details = await getUserProfile();
      setDetail(details.response)
    };
    fetchUserDetails();
  }, []);
  return (
    <div className="profileContainer">
      <Card className="profileCard">
        <CardContent>
          <div className='profileDetail'>
            <img src={"data:image/png;base64," + detail?.profile}  alt='' className='profilePicture' />
            <p className='names'>{detail?.firstName}  {detail?.lastName}</p>
            <div className='tableDiv'>
              <table  >
                <thead>
                  <tr>
                    <th scope="col"><center>10</center></th>
                    <th scope="col"><center>5</center></th>
                    <th scope="col"><center>5</center></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Posts</td>
                    <td>Followers</td>
                    <td>Followings</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='connect'>
              <button className='button' onClick={handleClick({ vertical: 'top', horizontal: 'center' })}><li className='listItem'>{open===true ? 'Following':'Follow'}</li></button>
              <button className='button'> <li className='listItem'>Message</li></button>
            </div>
          </div>
          <hr />
         { detail && <div><Post username={detail?.email}/></div>}
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            autoHideDuration={1000}
            message="Connection Request has been sent."
            key={vertical + horizontal}
          />
        </CardContent>
      </Card>
    </div>
  );
}
