// import { useEffect, useState } from "react";
// import { get } from "../utils/Api";

// const useAllCampInfo = () => {
//   const [campInfo, setCampInfo] = useState([]); // 초기 상태를 빈 배열로 설정
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCampInfo = async () => {
//       try {
//         const response = await get("camp"); // 모든 캠핑지 정보를 가져옴
//         setCampInfo(response.content); // 필요한 데이터를 추출하여 설정
//         setLoading(false);
//       } catch (error) {
//         console.error("캠핑장 정보 가져오기 실패:", error);
//         setError(error);
//         setLoading(false);
//       }
//     };

//     fetchCampInfo();
//   }, []);

//   return { campInfo, loading, error };
// };

// export default useAllCampInfo;
import { useEffect, useState } from "react";
import { get } from "../utils/Api";

const useAllCampInfo = () => {
  const [campInfos, setCampInfos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampInfo = async () => {
      const token = localStorage.getItem("authToken"); // 로컬 스토리지에서 토큰을 가져옴

      try {
        const response = await get("camp", {
          Authorization: `Bearer ${token}`, // 헤더에 토큰을 추가
        });
        setCampInfos(response);
        setLoading(false);
      } catch (error) {
        console.error("캠핑장 정보 가져오기 실패:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchCampInfo();
  }, []);

  return { campInfos, loading, error };
};

export default useAllCampInfo;
