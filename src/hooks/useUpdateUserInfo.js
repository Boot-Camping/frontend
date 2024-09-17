import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { put } from "../utils/api";
import { resetModal } from "../utils/resetModal";

const useUpdateUserInfo = (
  setIsOpened,
  onUpdate,
  setPostcode,
  setError,
  setErrorMessage
) => {
  const { accessToken } = getUserIdFromToken();

  const closeModalHandle = () => {
    resetModal(setIsOpened, setError, setErrorMessage, setPostcode);
  };

  const putUserInfo = async (modalType, params, body) => {
    const customHeaders = {
      Authorization: accessToken,
    };

    if (modalType !== "password") {
      customHeaders["Content-Type"] = "application/x-www-form-urlencoded";
    }

    try {
      const endpoint =
        modalType === "password" ? "userprofile/password" : "userprofile";
      await put(
        endpoint,
        modalType === "password" ? JSON.stringify(body) : params.toString(),
        customHeaders
      );
      closeModalHandle();
      onUpdate();
      return true;
    } catch (error) {
      setErrorMessage(error.message);
      setError(true);
      setPostcode("");
      return false;
    }
  };

  return { putUserInfo };
};

export default useUpdateUserInfo;
