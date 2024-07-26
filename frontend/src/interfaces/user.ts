export interface CourseSubscribed {
    id: number;
    name: string;
    images: string;
    description: string;
    price: string;
    created_at: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    is_verified: boolean;
    date_joined: string;
    last_login?: string;
    courses_subscribed: CourseSubscribed[];
}
