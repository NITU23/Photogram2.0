import React, { useState } from "react";
import DragDrop from "./dragDrop";
import { Card, CardContent, TextField } from "@mui/material";
import "../css/createPost.css";
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
  return (
    <div className="postCard">
      <Card sx={{ maxWidth: 470 }} >
        <CardContent>
           <DragDrop onFilesSelected={setFiles} />
          <TextField
            fullWidth
            label="Caption"  name="Caption"  value={caption} onChange={handleChange} variant="outlined" className="captionBox" />
              <TextField
            fullWidth
            label="Location" name="Location" value={location} onChange={handleLocation} variant="outlined" className="captionBox"/>
          <button className="postbtn" >Post</button>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreatePost;
