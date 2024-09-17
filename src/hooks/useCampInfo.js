import { useState, useEffect } from "react";
import { get } from "../utils/api";

const useCampInfo = (campId, infoType = "campInfo") => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampInfo = async () => {
      try {
        const response = await get(`camps/${campId}`);
        setInfo(response);
        setLoading(false);
      } catch (error) {
        console.error("캠핑장 정보 가져오기 실패:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchCampInfo();
  }, [campId]);

  return { [infoType]: info, loading, error };
};

export default useCampInfo;
