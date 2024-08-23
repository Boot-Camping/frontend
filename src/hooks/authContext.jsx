import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => {
    const token = localStorage.getItem("accessToken");
    return token || null;
  });

  const getExpFromToken = (token) => {
    if (!token) return null;

    const parts = token.split(".");
    if (parts.length !== 3) {
      console.error("유효한 JWT가 아닙니다");
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
        } else {
          console.log("토큰유효");
        }
      }
    };

    const intervalid = setInterval(checkTokenExpiry, 60000);

    return () => clearInterval(intervalid);
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
