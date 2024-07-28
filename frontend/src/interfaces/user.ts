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
    last_login?: string;
}
