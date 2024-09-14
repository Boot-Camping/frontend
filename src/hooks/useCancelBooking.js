import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { put } from "../utils/api";

const useCancelBooking = (setIsOpened, setErrorMessage, onUpdate) => {
  const { accessToken } = getUserIdFromToken();

  const putCancelBooking = async (bookId) => {
    const customHeaders = {
      Authorization: accessToken,
    };

    try {
      await put(`camps/bookings/${bookId}`, {}, customHeaders);
      setIsOpened(false);
      setErrorMessage("");
      onUpdate();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return { putCancelBooking };
};

export default useCancelBooking;
