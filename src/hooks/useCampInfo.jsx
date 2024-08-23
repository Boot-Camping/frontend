import { useEffect, useState } from "react";
import { get } from "../utils/Api";

const useCampInfo = (campId) => {
  const [detailInfo, setDetailInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampInfo = async () => {
      try {
        const response = await get(`camp/${campId}`);
        setDetailInfo(response);
        setLoading(false);
      } catch (error) {
        console.error("캠핑장 정보 가져오기 실패:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchCampInfo();
  }, [campId]);

  return { detailInfo, loading, error };
};

export default useCampInfo;
