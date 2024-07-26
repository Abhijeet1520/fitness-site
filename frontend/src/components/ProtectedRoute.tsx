import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from "../services/apiService";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../services/constants";

interface ProtectedRouteProps {
    children: ReactNode;
}

interface JwtPayload {
    exp: number;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        auth().catch(() => {
            setIsAuthorized(false);
        });
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", { refresh: refreshToken });

            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        if (!token) {
            setIsAuthorized(false);
            return;
        }

        // Decode the token and check the expiration date
        const decoded = jwtDecode<JwtPayload>(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000; // Convert to seconds

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? <>{children}</> : <Navigate to="/login" />;
}

export default ProtectedRoute;
