export interface Course {
    id: number;
    name: string;
    images: string; // comma-separated URLs
    description: string;
    price: number;
    created_at: string;
  }

  export interface Week {
    id: number;
    course: number;
    week_number: number;
    created_at: string;
  }

  export interface Day {
    id: number;
    description: string;
    week: number;
  }

  export interface Exercise {
    id: number;
    title: string;
    type: string;
    sets: number;
    reps: number;
    duration: string;
    description: string;
    video_url: string;
    created_at: string;
  }

  export interface Payment {
    id: number;
    user: number;
    course: number;
    payment_intent_id: string;
    amount: number;
    currency: string;
    status: string;
    created_at: string;
  }

  export interface Subscription {
    id: number;
    user: number;
    course: number;
    subscribed_at: string;
  }

  export interface User {
    id: number;
    username: string;
    email: string;
  }

  export interface AuthResponse {
    access: string;
    refresh: string;
  }
