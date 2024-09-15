import { useEffect, useState } from "react";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { get } from "../utils/api";

const useMyPageUser = () => {
  const { accessToken, userId } = getUserIdFromToken();
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      const customHeaders = {
        Authorization: accessToken,
      };

      try {
        const response = await get(`userprofile/${userId}`, customHeaders);
        if (response.length > 0) {
          setUserImage(response[0].images[0]);
          setUserName(response[0].name);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    getUserData();
  }, [accessToken, userId]);

  return { userName, userImage, errorMessage, setErrorMessage };
};

export default useMyPageUser;
