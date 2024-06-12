import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle, AiOutlineCloudUpload } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import '../css/dragDrop.css';
import '../css/uploadProfilePic.css'

function UploadProfilePic() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result.split(',')[1];
          setFile(base64)
          setPreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      if (droppedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(droppedFile);
      } else {
        setPreview(null);
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="parentSection">
    <section className="drag-drop dragDrop " style={{ width: '600px' }}>
      <div
        className={`document-uploader ${
          file ? "upload-box active" : "upload-box"
        }`}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        {!file && (
          <>
            <div className="upload-info">
              <AiOutlineCloudUpload />

              <div>
                <p>Select Media to Upload</p>
              </div>
            </div>
            <input
              type="file"
              hidden
              id="browse"
              onChange={handleFileChange}
              accept=".jpeg,.jpg,.png,.mp4"
            />
            <label htmlFor="browse" className="browse-btn">
              Browse files
            </label>
          </>
        )}

        {file && (
          <div className="file-list">
            <div className="file-list__container">
              <div className="file-item">
                <div className="file-info">
                 {preview && <img src={preview} alt="Preview" className="image-preview" />}
                  <p>{file.name}</p>
                </div>
                <div className="file-actions">
                  <MdClear onClick={handleRemoveFile} />
                </div>
              </div>
            </div>
            <div className="success-file">
              <AiOutlineCheckCircle
                style={{ color: "black", marginRight: 1 }}
              />
              <p style={{ color: "black", marginRight: 1 }}>1 file selected</p>
            </div>
          </div>
        )}
      </div>
    </section>
    </div>
  );
}

export default UploadProfilePic;
