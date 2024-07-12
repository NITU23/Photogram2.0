import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useState, useEffect } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import user from '../../images/user.jpeg'
import './comment.css'
import { deleteComments, getComments } from '../../services/postService'
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from "@mui/icons-material/Delete";
export default function Comment(props) {
  const [showComponent, setShowComponent] = useState(props.showDialog)
  const handleShowComponent = () => {
    props.getCommentVar(false);
    setShowComponent(false);
  }
  const [comment, setComment] = useState()
  const [postid] = useState(props.postid)
  const [apiCalled, setApiCalled] = useState(false)
  const [writeComment, setWriteComment] = useState('')
  useEffect(() => {
    const fetchComments = async () => {
      setApiCalled(true)
      let comments = await getComments(postid);
      setComment(comments)
      setApiCalled(false)
    };
    fetchComments();
  }, [postid]);

  const handleChange = (e) => {
    setWriteComment(e.target.value);
  }

  const submit = () => {
    props.addComment(writeComment)
    setWriteComment('')
  }
  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      submit();
    }
  };
  const deleteComment = async (id) =>{

    let response = await deleteComments(JSON.stringify({id:id}));
    console.log('er',response)
  }
  return (
    <div>
      {showComponent && <Card className='cardWidth' >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> <h3 style={{ marginLeft: '18px' }}>Comments</h3>
          <div className='closeButton'><IoCloseSharp onClick={handleShowComponent} /></div>
        </div>
        <CardContent>
          <div style={{maxHeight:'200px',overflow:'auto'}}>
            {comment?.comments.length > 0 && (apiCalled === false) && comment.comments.map((item, index) => (
              <div className='viewAllCommentDiv' key={index}>
                <span className='viewAllcomment' key={index}>
                  <img className='commentImg' src={item.profile ? `data:image/png;base64,${item.profile}` : user} alt='profile' />
                  <p style={{ marginTop: '1px', fontSize: '14px' }}><b> {item.username}</b> : {item.comment}</p>
                  <div className='comment_delete' onClick={()=>deleteComment(item.id)} >
                    <DeleteIcon />
                  </div>
                </span>
              </div>
            ))}
          </div>

          {!comment && (apiCalled === true) &&
            <div>
              <CircularProgress className="comment_spinner" />
              <p style={{ display: 'flex', justifyContent: 'center' }}> Loading Comments...</p>
            </div>}
          {comment?.comments.length === 0 && (apiCalled === false) &&
            <div>
              <p style={{ display: 'flex', justifyContent: 'center' }}>  No Comments found</p>
            </div>}
          {comment && (apiCalled === false) && <div className='commentDiv'>
            <input type="text" name="comment" className='commentBox' placeholder='Add your comment' onKeyDown={_handleKeyDown} value={writeComment} onChange={handleChange} />
            <button className='post' onClick={submit}>Post</button>
          </div>}
        </CardContent>
      </Card>
      }
    </div>
  );
}
