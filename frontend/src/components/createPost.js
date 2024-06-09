import React, { useState } from "react";
import DragDrop from "./dragDrop";
import { Card, CardContent, TextField } from "@mui/material";
import "../css/createPost.css";
import { createPosts  } from "../services/postService";
function CreatePost() {

  const [caption, setCaption] = useState("");
  const [files, setFiles] = useState([]);
  const [location,setLocation] = useState('')

  const handleChange = (e) => {
    setCaption(e.target.value);
  };
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

   const clickPost = async() => {
    let body = {files,caption,location}
    let formData = new FormData()
    formData.append('file', files);
    formData.append('location', location);
    formData.append('caption', caption);
     let response = await createPosts(JSON.stringify(body))
     console.log('Hello I am response',response)


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
    </div>
  );
}

export default CreatePost;
