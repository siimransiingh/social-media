import axios from 'axios';

const API = axios.create({ baseURL: 'https://social-media-q6j7.onrender.com/api/users' });

export const createUser = (userData) => API.post('/', userData);

export const getUser = (id, idToken) => {
  return API.get(`/${id}`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
};

export const editUser = (id, idToken, userData,) => {
  return API.patch(`/${id}`,  userData,{
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
   
};
