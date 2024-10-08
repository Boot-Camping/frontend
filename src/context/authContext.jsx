import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => {
    const token = localStorage.getItem("accessToken");
    return token || null;
  });

  const navigate = useNavigate();

  const getExpFromToken = (token) => {
    if (!token) return null;

    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    const payload = parts[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload.exp;
  };

  useEffect(() => {
    const checkTokenExpiry = () => {
      if (accessToken) {
        const currentTime = Math.floor(Date.now() / 1000);
        const exp = getExpFromToken(accessToken);

        if (exp && exp < currentTime) {
          console.log("토큰만료");
          localStorage.removeItem("accessToken");
          setAccessToken(null);
          navigate("/login");
        }
      }
    };

    const intervalid = setInterval(checkTokenExpiry, 60000);

    return () => clearInterval(intervalid);
  }, [accessToken, navigate]);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
