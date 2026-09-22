import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, 
});

export const register = async (username, email, password, idToken) => {
    const response = await api.post('/api/auth/register', {
        username,
        email,
        password,
        idToken,
    });
    return response.data;
}

export const verifyEmail = async (idToken) => {
    const response = await api.post('/api/auth/verify-email', {
        idToken,
    });
    return response.data;
}

export const login = async (idToken) => {
    const response = await api.post('/api/auth/login', {
        idToken,
    });
    return response.data;
};

export const getMe = async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
}