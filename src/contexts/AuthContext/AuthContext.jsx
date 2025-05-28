import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  const location = useLocation();
  const hasNavigated = useRef(false); // track if navigation happened

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);

      // Redirect only once to avoid navigation flood
      if (user && !hasNavigated.current) {
        if (location.pathname === '/login' || location.pathname === '/signup') {
          hasNavigated.current = true;
          navigate("/home");
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, location.pathname]);

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login after logout
      hasNavigated.current = false; // reset on logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value = { 
    currentUser, 
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
