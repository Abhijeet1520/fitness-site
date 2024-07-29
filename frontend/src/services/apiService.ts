import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import {
  AuthResponse,
  Course,
  Day,
  Exercise,
  User,
  Week
} from './interfaces';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/token/refresh/`, { refresh: refreshToken });
          localStorage.setItem(ACCESS_TOKEN, response.data.access);
          originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
          return api(originalRequest);
        } catch (err) {
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);
          return Promise.reject(err);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Courses
export const fetchCourses = async (): Promise<Course[]> => {
  const response = await api.get('/course/list/');
  return response.data;
};

export const fetchCourseDetail = async (courseId: string): Promise<Course> => {
  const response = await api.get(`/course/detail/${courseId}/`);
  return response.data;
};

export const createCourse = async (courseData: Partial<Course>): Promise<Course> => {
  const response = await api.post('/course/create/', courseData);
  return response.data;
};

export const updateCourse = async (courseId: string, courseData: Partial<Course>): Promise<Course> => {
  const response = await api.put(`/course/update/${courseId}/`, courseData);
  return response.data;
};

export const deleteCourse = async (courseId: string): Promise<void> => {
  await api.delete(`/course/delete/${courseId}/`);
};

export const fetchUserSubscribedCourses = async (): Promise<Course[]> => {
  const response = await api.get('/course/subscribed/');
  return response.data;
};

// Weeks
export const fetchWeeks = async (courseId: string): Promise<Week[]> => {
  const response = await api.get(`/week/${courseId}/weeks/`);
  return response.data;
};

export const fetchWeekDetail = async (weekId: string): Promise<Week> => {
  const response = await api.get(`/week/${weekId}/`);
  return response.data;
};

export const createWeek = async (weekData: Partial<Week>): Promise<Week> => {
  const response = await api.post('/week/create/', weekData);
  return response.data;
};

export const updateWeek = async (weekId: string, weekData: Partial<Week>): Promise<Week> => {
  const response = await api.put(`/week/${weekId}/update/`, weekData);
  return response.data;
};

export const deleteWeek = async (weekId: string): Promise<void> => {
  await api.delete(`/week/${weekId}/delete/`);
};

// Days
export const fetchDays = async (weekId: string): Promise<Day[]> => {
  const response = await api.get(`/day/${weekId}/days/`);
  return response.data;
};

export const fetchDayDetail = async (dayId: string): Promise<Day> => {
  const response = await api.get(`/day/${dayId}/`);
  return response.data;
};

export const createDay = async (dayData: Partial<Day>): Promise<Day> => {
  const response = await api.post('/day/create/', dayData);
  return response.data;
};

export const updateDay = async (dayId: string, dayData: Partial<Day>): Promise<Day> => {
  const response = await api.put(`/day/${dayId}/update/`, dayData);
  return response.data;
};

export const deleteDay = async (dayId: string): Promise<void> => {
  await api.delete(`/day/${dayId}/delete/`);
};

// Exercises
export const fetchExercises = async (dayId: string): Promise<Exercise[]> => {
  const response = await api.get(`/exercise/${dayId}/exercises/`);
  return response.data;
};

export const fetchExerciseDetail = async (exerciseId: string): Promise<Exercise> => {
  const response = await api.get(`/exercise/${exerciseId}/`);
  return response.data;
};

export const createExercise = async (exerciseData: Partial<Exercise>): Promise<Exercise> => {
  const response = await api.post('/exercise/create/', exerciseData);
  return response.data;
};

export const updateExercise = async (exerciseId: string, exerciseData: Partial<Exercise>): Promise<Exercise> => {
  const response = await api.put(`/exercise/${exerciseId}/update/`, exerciseData);
  return response.data;
};

export const deleteExercise = async (exerciseId: string): Promise<void> => {
  await api.delete(`/exercise/${exerciseId}/delete/`);
};

// Payments
export const createPaymentIntent = async (courseId: string): Promise<{ clientSecret: string }> => {
  const response = await api.post('/payment/create-payment-intent/', { courseId });
  return response.data;
};

// Users
export const registerUser = async (userData: Partial<User>): Promise<User> => {
  const response = await api.post('/user/register/', userData);
  return response.data;
};

export const fetchCurrentUserDetail = async (): Promise<User> => {
  const response = await api.get('/user/current_user_detail/');
  return response.data;
};

export const updateUser = async (userId: number, userData: {username: string, password: string}): Promise<User> => {
  const response = await api.put(`/user/update/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId: number): Promise<void> => {
  await api.delete(`/user/delete/${userId}/`);
};

export const login = async (credentials: { username: string; password: string }): Promise<AuthResponse> => {
  const response = await api.post('/token/', credentials);
  localStorage.setItem(ACCESS_TOKEN, response.data.access);
  localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
  return response.data;
};

export const logout = (): void => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

export const resetPassword = async (email: string) => {
  // Your reset password logic here
};