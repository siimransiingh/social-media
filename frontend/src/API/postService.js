import axios from 'axios';

// Base API configuration
const API = axios.create({ baseURL: 'http://localhost:5000/api/posts' });




// API to create a new post
export const createPost = async (postData, idToken) => {
  try {
    const response = await API.post('/', postData, {
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};

// API to get all posts
export const getAllPosts = (idToken) => API.get('/',  {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
});
  
// API to get  post of one suer
export const getPostofUser = (uid, idToken) => API.get(`/post/${uid}`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

// API to get a single post by ID
export const getPostById = (id) => API.get(`/${id}`);

// API to update the caption of a post
export const updatePostCaption = (id, updatedCaption) =>
  API.patch(`/${id}`, { caption: updatedCaption });
