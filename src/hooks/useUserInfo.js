import { useCallback } from "react";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { get } from "../utils/api";

const useUserInfo = (setUserDataArray, setErrorMessage, setLoading) => {
  const { accessToken, userId } = getUserIdFromToken();

  const getUserData = useCallback(async () => {
    const customHeaders = {
      Authorization: accessToken,
    };

    try {
      const response = await get(`userprofile/${userId}`, customHeaders);
      setUserDataArray(response);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, [accessToken, userId, setUserDataArray, setErrorMessage, setLoading]);

  return { getUserData };
};

export default useUserInfo;
