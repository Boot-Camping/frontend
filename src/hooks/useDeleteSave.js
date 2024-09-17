import React, { useState } from "react";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { deleteRequest } from "../utils/api";
import { closeModal } from "../utils/closeModal";

const useDeleteSave = (setIsOpened, onUpdate) => {
  const { accessToken } = getUserIdFromToken();
  const [errorMessage, setErrorMessage] = useState("");

  const deleteSave = async (wishId) => {
    const customHeaders = {
      Authorization: accessToken,
    };

    try {
      await deleteRequest(
        `userprofile/wishlist/remove/${wishId}`,
        {},
        customHeaders
      );
      closeModal(setIsOpened)();
      setIsOpened(false);
      onUpdate();
    } catch (error) {
      setErrorMessage(error.message);
      console.log(errorMessage);
    }
  };

  return { deleteSave };
};

export default useDeleteSave;
