import '../css/profile.css';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import flower from '../images/flower.jpeg'
import Post from './post';
import Snackbar from '@mui/material/Snackbar';
export default function Profile() {
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;
  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  return (
    <div className="profileContainer">
      <Card className="profileCard">
        <CardContent>
          <div className='profileDetail'>
            <img src={flower} alt='' className='profilePicture' />
            <p className='names'>Nitin Vyas</p>
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
          <div><Post /></div>
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
