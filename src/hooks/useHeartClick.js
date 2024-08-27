import { useState } from "react";
import heart from "/src/assets/svg/heart.svg";

export const heartIcon = {
  heart,
};

const useHeartClick = () => {
  const [heartClick, setHeartClick] = useState([]);

  const heartClickHandler = (index) => {
    const newHeartClick = [...heartClick];
    newHeartClick[index] = !newHeartClick[index];
    setHeartClick(newHeartClick);
  };

  return {
    heartClick,
    heartClickHandler,
    heartIcon,
  };
};

export default useHeartClick;
