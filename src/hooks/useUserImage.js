import { useCallback } from "react";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { post } from "../utils/api";

const useUserImage = (setError, setErrorMessage, onUpdate, MAX_FILE_SIZE) => {
  const { accessToken } = getUserIdFromToken();

  const postUserImage = useCallback(
    async (file) => {
      if (!file) return;

      if (file.size > MAX_FILE_SIZE) {
        setError(true);
        setErrorMessage("Message: 파일 크기는 1MB 이하이어야 합니다.");
        return;
      }

      const customHeaders = {
        Authorization: accessToken,
        "Content-Type": "multipart/form-data",
      };

      const formData = new FormData();
      formData.append("images", file);

      try {
        await post(`userprofile/images`, formData, customHeaders);
        onUpdate();
        setError(false);
        setErrorMessage("");
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
      }
    },
    [setError, setErrorMessage, onUpdate, MAX_FILE_SIZE]
  );

  return { postUserImage };
};

export default useUserImage;
