import React, { useState } from "react";
import DragDrop from "./dragDrop";
import { Card, CardContent, TextField } from "@mui/material";
import "../css/createPost.css";
import { createPosts  } from "../services/postService";
import CircularProgress from '@mui/material/CircularProgress';
import Errorbar from "../util/errorSnackbar";
import MessageBar from "../util/snackbar";
function CreatePost() {

  const [caption, setCaption] = useState("");
  const [file, setFiles] = useState([]);
  const [location,setLocation] = useState('')
  const [spinner,setSpinner] = useState(false);
  const [error,setError] = useState('');
  const [showSnackbar,setShowsnackbar] = useState(false)
  const [success,setSuccess] = useState(false)
  const handleChange = (e) => {
    setCaption(e.target.value);
  };
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  const clickPost = async () => {
    setSpinner(true)
    let body = { file, caption, location }; 
    
        const response = await createPosts(JSON.stringify(body)); 
        if(response.status!==200){
            setShowsnackbar(true)
           setError(response.message)
           setTimeout(()=>{
            setShowsnackbar(false)
           },2000)
        }
        else {
            setShowsnackbar(true)
            setFiles('')
            setCaption('')
            setLocation('')
            setSuccess(true)
            setTimeout(()=>{
             setShowsnackbar(false)
            },2000)
        }
    setSpinner(false)
}


  return (
    <div className="postCard">
      <Card sx={{ maxWidth: 430 }} >
        <CardContent>
           <DragDrop onFilesSelected={setFiles} />
          <TextField
            fullWidth multiline
            rows ={2}
            label="Caption"  name="Caption"  value={caption} onChange={handleChange} variant="outlined" className="captionBox" />
              <TextField
            fullWidth multiline
            rows ={2} label="Location" name="Location" value={location} onChange={handleLocation} variant="outlined" className="captionBox"/>
          <button className="postbtn" onClick={clickPost} >Post</button>
        </CardContent>
      </Card>
     { showSnackbar &&  <Errorbar message={error}/>}
     {(showSnackbar && success) && <MessageBar message='Post has been created Successfully.'/> }
    </div>
  );
}

export default CreatePost;
