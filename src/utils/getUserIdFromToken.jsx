export const decodeToken = (token) => {
  if (!token) {
    console.error("토큰이 없습니다");
    return null;
  }
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (error) {
    console.error("토큰 디코딩 오류", error);
    return null;
  }
};

export const getUserIdFromToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    console.error("엑세스 토큰이 없습니다");
    return { accessToken: null, useId: null };
  }

  const payload = decodeToken(accessToken);
  const userId = payload ? payload.userId || null : null;

	if (userId) {
		console.log("추출된 userId", userId);
	} else {
		console.error("userId를 추출할 수 없습니다");
	}

  return { accessToken, userId };
};
