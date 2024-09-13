import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { post } from "../utils/api";

const useLogout = () => {
  const postLogout = async (setErrorMessage, setError) => {
    const { accessToken } = getUserIdFromToken();

    const customHeaders = {
      Authorization: accessToken,
    };

    try {
      await post("user/logout", {}, customHeaders);
      return true;
    } catch (error) {
      setErrorMessage(error.message);
      setError(true);
      return false;
    }
  };

  return { postLogout };
};

export default useLogout;
