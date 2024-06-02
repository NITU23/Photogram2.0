import '../css/profile.css';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import flower from '../images/flower.jpeg'
import { Link } from 'react-router-dom';
export default function Profile() {
  return (
    <div className="profileContainer">
      <Card className="profileCard">
        <CardContent>
            <div className='profileDetail'>

         <img src={flower} alt='' className='profilePicture'/>
         <p className='name'>Nitin Vyas</p>
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
                    <button className='button'><li className='listItem'>Connect</li></button>
                    <button className='button'> <li className='listItem'>Message</li></button>
                    </div>
         </div>
        </CardContent>
      </Card>
    </div>
  );
}
