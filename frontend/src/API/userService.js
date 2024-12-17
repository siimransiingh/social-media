import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/users' });

export const createUser = (userData) => API.post('/', userData);
export const getUser = (id, idToken) => {
  return API.get(`/${id}`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
};
