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

const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
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

// Courses
export const fetchCourses = async (): Promise<Course[]> => {
  const response = await api.get('/courses/list/');
  return response.data;
};

export const fetchCourseDetail = async (courseId: string): Promise<Course> => {
  const response = await api.get(`/courses/detail/${courseId}/`);
  return response.data;
};

export const createCourse = async (courseData: Partial<Course>): Promise<Course> => {
  const response = await api.post('/courses/create/', courseData);
  return response.data;
};

export const updateCourse = async (courseId: string, courseData: Partial<Course>): Promise<Course> => {
  const response = await api.put(`/courses/update/${courseId}/`, courseData);
  return response.data;
};

export const deleteCourse = async (courseId: string): Promise<void> => {
  await api.delete(`/courses/delete/${courseId}/`);
};

export const fetchUserSubscribedCourses = async (): Promise<Course[]> => {
  const response = await api.get('/courses/subscribed/');
  return response.data;
};

// Weeks
export const fetchWeeks = async (courseId: string): Promise<Week[]> => {
  const response = await api.get(`/courses/${courseId}/weeks/`);
  return response.data;
};

export const fetchWeekDetail = async (weekId: string): Promise<Week> => {
  const response = await api.get(`/weeks/${weekId}/`);
  return response.data;
};

export const createWeek = async (weekData: Partial<Week>): Promise<Week> => {
  const response = await api.post('/weeks/create/', weekData);
  return response.data;
};

export const updateWeek = async (weekId: string, weekData: Partial<Week>): Promise<Week> => {
  const response = await api.put(`/weeks/${weekId}/update/`, weekData);
  return response.data;
};

export const deleteWeek = async (weekId: string): Promise<void> => {
  await api.delete(`/weeks/${weekId}/delete/`);
};

// Days
export const fetchDays = async (weekId: string): Promise<Day[]> => {
  const response = await api.get(`/weeks/${weekId}/days/`);
  return response.data;
};

export const fetchDayDetail = async (dayId: string): Promise<Day> => {
  const response = await api.get(`/days/${dayId}/`);
  return response.data;
};

export const createDay = async (dayData: Partial<Day>): Promise<Day> => {
  const response = await api.post('/days/create/', dayData);
  return response.data;
};

export const updateDay = async (dayId: string, dayData: Partial<Day>): Promise<Day> => {
  const response = await api.put(`/days/${dayId}/update/`, dayData);
  return response.data;
};

export const deleteDay = async (dayId: string): Promise<void> => {
  await api.delete(`/days/${dayId}/delete/`);
};

// Exercises
export const fetchExercises = async (dayId: string): Promise<Exercise[]> => {
  const response = await api.get(`/days/${dayId}/exercises/`);
  return response.data;
};

export const fetchExerciseDetail = async (exerciseId: string): Promise<Exercise> => {
  const response = await api.get(`/exercises/${exerciseId}/`);
  return response.data;
};

export const createExercise = async (exerciseData: Partial<Exercise>): Promise<Exercise> => {
  const response = await api.post('/exercises/create/', exerciseData);
  return response.data;
};

export const updateExercise = async (exerciseId: string, exerciseData: Partial<Exercise>): Promise<Exercise> => {
  const response = await api.put(`/exercises/${exerciseId}/update/`, exerciseData);
  return response.data;
};

export const deleteExercise = async (exerciseId: string): Promise<void> => {
  await api.delete(`/exercises/${exerciseId}/delete/`);
};

// Payments
export const createPaymentIntent = async (courseId: string): Promise<{ clientSecret: string }> => {
  const response = await api.post('/payments/create-payment-intent/', { courseId });
  return response.data;
};

export const handleStripeWebhook = async (payload: any): Promise<void> => {
  await api.post('/payments/stripe-webhook/', payload);
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
