import { closeModal } from "./closeModal";

export const resetModal = (
  setIsOpened,
  setError = null,
  setErrorMessage = null,
  setPostcode = null
) => {
  closeModal(setIsOpened)();

  if (setError) {
    setError(false);
  }

  if (setErrorMessage) {
    setError("");
  }

  if (setPostcode) {
    setPostcode("");
  }
};
