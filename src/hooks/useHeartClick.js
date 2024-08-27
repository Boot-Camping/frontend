import { useState } from "react";

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
  };
};

export default useHeartClick;
