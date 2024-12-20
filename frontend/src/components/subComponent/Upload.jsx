import React, {useState} from 'react'

import { createPost } from "../../API/postService";
const Upload = () => {
  const [mediaFiles, setMediaFiles] = useState([]); // For storing selected files
    const [caption, setCaption] = useState(""); // For caption input
    
      const handleFileChange = (e) => {
    setMediaFiles(e.target.files); // Store selected files
  };
 

  return (
    <div>Upload</div>
  )
}

export default Upload