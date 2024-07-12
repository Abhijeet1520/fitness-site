// So we are going to create an inteceptor so that it will automatically
// add the correct headers to any request that we send.(Authorization)

import axios from "axios"
import { ACCESS_TOKEN } from "./constants"


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(
    // So using axios we'll intercept the request and it will check if we have 
    // a access token and then add it to the authorization header in the request.
    // TODO: Implement CSRF tokens to prevent CSRF attacks. Have a look if this is necessary.
    // try {
    //     const response = await axios.get('http://your-django-backend/api/auth/csrf/');
    //     const csrfToken = response.data.csrfToken;
    //     axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
    // } catch (error) {
    //     console.error('Failed to fetch CSRF token:', error);
    // }
    (config)=>{
        const token = localStorage.getItem(ACCESS_TOKEN)

        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

// So now we'll use the api request directly that has the authorization header built in 
// rather than using axios itself.
export default api