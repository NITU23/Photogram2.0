import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import '../css/notification.css'
import flower from '../images/flower.jpeg'
export default function Notification() {
  return (
    <Card sx={{ minWidth: 275 }} >
      <CardContent >
        <ul className='notifications'>
          <li> <img  className='notificationImg'  src={flower} alt=''/><b>Nitin</b> Liked Your Photo </li>
          <li> <img  className='notificationImg'  src={flower} alt=''/>Nitin Commented on your photo</li>


        </ul>
      </CardContent>
    </Card>
  );
}
