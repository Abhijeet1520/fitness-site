import axios from 'axios';

const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchCourses = async () => {
  const response = await api.get('/course/list/');
  return response.data;
};

export const fetchCourseDetail = async (courseId: string) => {
  const response = await api.get(`/course/detail/${courseId}/`);
  return response.data;
};

export const createCourse = async (courseData: any) => {
  const response = await api.post('/course/create/', courseData);
  return response.data;
};

export const updateCourse = async (courseId: string, courseData: any) => {
  const response = await api.put(`/course/update/${courseId}/`, courseData);
  return response.data;
};

export const deleteCourse = async (courseId: string) => {
  const response = await api.delete(`/course/delete/${courseId}/`);
  return response.data;
};

export const fetchUserSubscribedCourses = async () => {
  const response = await api.get('/course/subscribed/');
  return response.data;
};

export const login = async (credentials: { username: string; password: string }) => {
  const response = await api.post('/token/', credentials);
  localStorage.setItem('token', response.data.access);
  return response.data;
};

export const register = async (userData: any) => {
  const response = await api.post('/users/', userData);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};
