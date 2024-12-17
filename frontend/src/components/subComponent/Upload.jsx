import React, {useState} from 'react'

import { createPost } from "../../API/postService";
const Upload = () => {
  const [mediaFiles, setMediaFiles] = useState([]); // For storing selected files
    const [caption, setCaption] = useState(""); // For caption input
    
      const handleFileChange = (e) => {
    setMediaFiles(e.target.files); // Store selected files
  };
 
  const handleUpload = async () => {
    if (!mediaFiles.length || !caption) {
      alert("Please select files and enter a caption.");
      return;
    }
    try {
      const user = auth.currentUser;
      const idToken = await user.getIdToken(); // Get Firebase token

      // Prepare media URLs (In real case, upload to a storage like Firebase Storage/S3)
      const mediaUrls = Array.from(mediaFiles).map((file) =>
        URL.createObjectURL(file)
      );

      const postData = {
        userId: user.uid,
        mime: "image/video", // Set MIME type accordingly
        caption: caption,
        media: mediaUrls, // Replace with actual URLs after upload
      };

      const response = await createPost(postData, idToken); // Pass idToken for auth
      console.log("Post Created:", response.data);

      alert("Post uploaded successfully!");
      setMediaFiles([]); // Clear file input
      setCaption(""); // Clear caption
    } catch (error) {
      console.error("Error uploading post:", error.message);
      alert("Failed to upload post.");
    }
  };
  return (
    <div>Upload</div>
  )
}

export default Upload