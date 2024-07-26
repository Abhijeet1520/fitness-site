import axios from 'axios';
import {
  Course,
  Week,
  Day,
  Exercise,
  Payment,
  Subscription,
  User,
  AuthResponse,
} from './interfaces';

import { ACCESS_TOKEN } from "./constants.ts"

export const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
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

export default api

// Courses
export const fetchCourses = async (): Promise<Course[]> => {
  const response = await api.get('/course/list');
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

export const handleStripeWebhook = async (payload: any): Promise<void> => {
  await api.post('/payment/stripe-webhook/', payload);
};

// Users
export const registerUser = async (userData: Partial<User>): Promise<User> => {
  const response = await api.post('/users/register/', userData);
  return response.data;
};

export const createAdminUser = async (userData: Partial<User>): Promise<User> => {
  const response = await api.post('/users/create_admin_user/', userData);
  return response.data;
};

export const fetchCurrentUserDetail = async (): Promise<User> => {
  const response = await api.get('/users/current_user_detail/');
  return response.data;
};

export const updateUser = async (userId: string, userData: Partial<User>): Promise<User> => {
  const response = await api.put(`/users/update/${userId}/`, userData);
  return response.data;
};

export const deleteUser = async (userId: string): Promise<void> => {
  await api.delete(`/users/delete/${userId}/`);
};

export const login = async (credentials: { username: string; password: string }): Promise<AuthResponse> => {
  const response = await api.post('/token/', credentials);
  localStorage.setItem('token', response.data.access);
  return response.data;
};

export const logout = (): void => {
  localStorage.removeItem('token');
};
