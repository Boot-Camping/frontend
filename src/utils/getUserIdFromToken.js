export const decodeToken = (token) => {
  if (!token) {
    return null;
  }
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (error) {
    return null;
  }
};

export const getUserIdFromToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return { accessToken: null, userId: null };
  }

  const payload = decodeToken(accessToken);
  const userId = payload ? payload.userId || null : null;

  return { accessToken, userId };
};
