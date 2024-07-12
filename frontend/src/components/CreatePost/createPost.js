import React, { useState } from "react";
import DragDrop from "../DragDrop/dragDrop";
import { Card, CardContent, TextField } from "@mui/material";
import "./createPost.css";
import { createPosts } from "../../services/postService";
import CircularProgress from '@mui/material/CircularProgress';
import Errorbar from "../../util/errorSnackbar";
import MessageBar from "../../util/snackbar";

function CreatePost() {
  const [caption, setCaption] = useState("");
  const [file, setFiles] = useState([]);
  const [location, setLocation] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setCaption(e.target.value);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  const clickPost = async () => {
    setSpinner(true);
    let body = { file, caption, location };

    const response = await createPosts(JSON.stringify(body));
    if (response.status !== 200) {
      setShowSnackbar(true);
      setError(response.posts.message);
      setSuccess(false);
    } else {
      setShowSnackbar(true);
      setCaption('');
      setLocation('');
      setError('');
      setSuccess(true);
    }
    setSpinner(false);
  }

  return (
    <div className="postCard">
      <Card sx={{ maxWidth: 700 }} >
        <CardContent>
          <DragDrop onFilesSelected={setFiles} />
          <TextField
            fullWidth multiline
            rows ={2}
            label="Caption (Optional)"  name="Caption"  value={caption} onChange={handleChange} variant="outlined" className="captionBox" />
              <TextField
            fullWidth multiline
            rows ={2} label="Location (Optional)" name="Location" value={location} onChange={handleLocation} variant="outlined" className="captionBox"/>
          <div className="spinnerButton"> <button className="postbtn" onClick={clickPost} >Post</button>
            { spinner && <CircularProgress className="spinner" />}</div>
        </CardContent>
      </Card>
      <Errorbar open={error !== '' && showSnackbar} message={error} />
      <MessageBar open={showSnackbar && error === ''} message='Post has been created Successfully.' />
    </div>
  );
}

export default CreatePost;
