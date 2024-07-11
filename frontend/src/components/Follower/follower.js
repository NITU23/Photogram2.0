import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { getConnectedPeople } from '../../services/userService';
import userimg from '../../images/user.jpeg';
import './follower.css';
import CircularProgress from '@mui/material/CircularProgress';

const Followers = ({ open, onClose, connections, username }) => {
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
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{capitalizeFirstLetter(connections)}</DialogTitle>
            <DialogContent>
                {loader ? (
                    <div><CircularProgress className="follower_spinner" /></div>
                ) : (
                    userDetails.length > 0 ? (
                        userDetails.map((user, index) => (
                            <div key={index} className="userContainer">
                                <div className="userPhoto">
                                    <img
                                        className="follower_photo"
                                        src={
                                            user.profile
                                                ? `data:image/png;base64,${user.profile}`
                                                : userimg
                                        }
                                        alt={user.username}
                                    />
                                </div>
                                <div className="userInfo">
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
            <DialogActions>
                <Button onClick={onClose} className=''>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Followers;
