import React, { useState } from "react";
import DragDrop from "./dragDrop";

function CreatePost() {
    const [uploadBox, setUploadBox] = useState(false);

    const changeState = () => {
        setUploadBox(true);
    };
    const [files, setFiles] = useState([]);
    return (
        <div>
        
            <div className='section'>
                {!uploadBox && <p>Hello welcome to upload File Section</p>}
                {uploadBox && <DragDrop  onFilesSelected={setFiles} />}
                <button onClick={changeState}>Hello</button>
            </div>
        </div>
    );
}

export default CreatePost;
