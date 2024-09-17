import { useState, useEffect } from "react";
import { post } from "../utils/api";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";

const useWishlist = (campingPlaces) => {
  const { accessToken } = getUserIdFromToken();
  const [isSaved, setIsSaved] = useState([]);

  useEffect(() => {
    if (campingPlaces.length > 0) {
      setIsSaved(Array(campingPlaces.length).fill(false));
    }
  }, [campingPlaces]);

  const toggleWishlist = async (index, campingPlace) => {
    const customHeaders = {
      Authorization: `${accessToken}`,
    };

    try {
      await post(
        `userprofile/wishlist/add/${campingPlace.id}`,
        {},
        customHeaders
      );
      setIsSaved((prevState) => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      });
    } catch (error) {
      console.error("찜하기 요청 오류🥲:", error);
    }
  };

  return { isSaved, toggleWishlist };
};

export default useWishlist;
