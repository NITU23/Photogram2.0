import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { getConnectedPeople } from '../../services/userService';
import userimg from '../../images/user.jpeg';
import './follower.css';
import CircularProgress from '@mui/material/CircularProgress';
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Followers = ({ open, onClose, connections, username }) => {
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState([]);
    const [loader, setLoader] = useState(false);
    const [apiCalled, setApiCalled] = useState(false);

    useEffect(() => {
        const getConnections = async () => {
            setLoader(true);
            setApiCalled(false);
            let body = JSON.stringify({ connections, username });
            let response = await getConnectedPeople(body);
            setUserDetails(response.response);
            setLoader(false);
            setApiCalled(true);
        };
        getConnections();
    }, [connections, username]);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const viewProfile =(username) =>{
        onClose();
     navigate(`/profile/${username}`)
    }

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle style={{ marginTop: '10px' }}>
                {capitalizeFirstLetter(connections)}
                <Button onClick={onClose} style={{ float: 'right', color: 'black', minWidth:'max-content' }}>
                    <IoCloseSharp />
                </Button>
            </DialogTitle>
            <DialogContent>
                {loader ? (
                    <div><CircularProgress className="follower_spinner" /></div>
                ) : (
                    userDetails.length > 0 ? (
                        userDetails.map((user, index) => (
                            <div key={index} className="follower_userContainer">
                                <div className="userPhoto" onClick={()=>viewProfile(user.email)}>
                                    <img
                                        className="follower_photo"
                                        src={
                                            user.profile
                                                ? `data:image/png;base64,${user.profile}`
                                                : userimg
                                        }
                                        alt={user.email}
                                    />
                                </div>
                                <div className="userInfo" onClick={()=>viewProfile(user.email)}>
                                    <div className="like_username">
                                        <span>{user.firstName} {user.lastName}</span>
                                    </div>
                                </div>
                                <button className="follow">Follow</button>
                            </div>
                        ))
                    ) : apiCalled && (
                        <div>No {connections} found</div>
                    )
                )}
            </DialogContent>
        </Dialog>
    );
};

export default Followers;
