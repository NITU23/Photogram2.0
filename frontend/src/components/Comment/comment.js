import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useState, useEffect, useRef } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import user from '../../images/user.jpeg';
import './comment.css';
import { deleteComments, getComments } from '../../services/postService';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from "@mui/icons-material/Delete";
import Errorbar from '../../util/errorSnackbar';
import MessageBar from '../../util/snackbar';

export default function Comment(props) {
  const [showComponent, setShowComponent] = useState(props.showDialog);
  const handleShowComponent = () => {
    props.getCommentVar(false);
    setShowComponent(false);
  };
  const [comment, setComment] = useState();
  const [postid] = useState(props.postid);
  const [apiCalled, setApiCalled] = useState(false);
  const [writeComment, setWriteComment] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState();
  const commentsEndRef = useRef(null);

  useEffect(() => {
    const fetchComments = async () => {
      setApiCalled(true);
      let comments = await getComments(postid);
      setProfile(comments.profile);
      setComment(comments.comments);
      setApiCalled(false);
    };
    fetchComments();
  }, [postid]);

  useEffect(() => {
    scrollToBottom();
  }, [comment]);

  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChange = (e) => {
    setWriteComment(e.target.value);
  };

  const submit = () => {
    let newComment = {
      comment: writeComment,
      profile: profile,
      username: props.username
    };
    setComment([...comment, newComment]);
    props.addComment(writeComment);
    setWriteComment('');
  };

  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      submit();
    }
  };

  const deleteComment = async (id) => {
    let response = await deleteComments(id, postid);
    if (response.status === 400) {
      setShowSnackbar(true);
      setError(response.message.msg);
    } else {
      setShowSnackbar(true);
      setComment(response.message.comments);
      setError('');
    }
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  return (
    <div>
      {showComponent && (
        <Card className='cardWidth'>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ marginLeft: '18px' }}>Comments</h3>
            <div className='closeButton'>
              <IoCloseSharp onClick={handleShowComponent} />
            </div>
          </div>
          <CardContent>
            <div style={{ maxHeight: '200px', overflow: 'auto' }}>
              {comment?.length > 0 && !apiCalled && comment.map((item, index) => (
                <div className='viewAllCommentDiv' key={index}>
                  <span className='viewAllcomment' key={index}>
                    <img className='commentImg' src={item.profile ? `data:image/png;base64,${item.profile}` : user} alt='profile' />
                    <p style={{ marginTop: '1px', fontSize: '14px' }}><b> {item.username}</b> : {item.comment}</p>
                    <div className='comment_delete' onClick={() => deleteComment(item.id)}>
                      <DeleteIcon />
                    </div>
                  </span>
                </div>
              ))}
              <div ref={commentsEndRef} />
            </div>

            {!comment && apiCalled && (
              <div>
                <CircularProgress className="comment_spinner" />
                <p style={{ display: 'flex', justifyContent: 'center' }}> Loading Comments...</p>
              </div>
            )}
            {comment?.length === 0 && !apiCalled && (
              <div>
                <p style={{ display: 'flex', justifyContent: 'center' }}>  No Comments found</p>
              </div>
            )}
            {comment && !apiCalled && (
              <div className='commentDiv'>
                <input
                  type="text"
                  name="comment"
                  className='commentBox'
                  placeholder='Add your comment'
                  onKeyDown={_handleKeyDown}
                  value={writeComment}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <button className='post' onClick={submit}>Post</button>
              </div>
            )}
            <Errorbar open={error !== '' && showSnackbar} message={error} onClose={handleSnackbarClose} />
            <MessageBar open={showSnackbar && error === ''} message={'Comment has been deleted.'} onClose={handleSnackbarClose} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
