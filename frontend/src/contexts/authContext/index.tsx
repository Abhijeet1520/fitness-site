import { User } from "@interfaces/user"; // Ensure the path and interface are correct
import { fetchCurrentUserDetail } from "@services/apiService"; // Ensure the path is correct
import React, { useContext, useEffect, useState } from "react";

interface AuthContextType {
  userLoggedIn: boolean;
  currentUser: User | null;
  verified: boolean;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = React.createContext<AuthContextType>({
  userLoggedIn: false,
  currentUser: null,
  verified: false,
  setCurrentUser: () => {}
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const user = await fetchCurrentUserDetail();
        setCurrentUser(user);
        setUserLoggedIn(true);
        setVerified(user.is_verified); // Assuming `is_verified` is the field indicating email verification
      } catch (error) {
        setCurrentUser(null);
        setUserLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  const value: AuthContextType = {
    userLoggedIn,
    currentUser,
    setCurrentUser,
    verified,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
