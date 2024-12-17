import axios from 'axios';

// Base API configuration
const API = axios.create({ baseURL: 'http://localhost:5000/api/posts' });




// API to create a new post
export const createPost = (postData,idToken) => API.post('/', postData,  {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

// API to get all posts
export const getAllPosts = (idToken) => API.get('/',  {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

// API to get a single post by ID
export const getPostById = (id) => API.get(`/${id}`);

// API to update the caption of a post
export const updatePostCaption = (id, updatedCaption) =>
  API.patch(`/${id}`, { caption: updatedCaption });
