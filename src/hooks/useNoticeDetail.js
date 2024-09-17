import { useEffect, useState } from "react";
import { get } from "../utils/api";

const useNoticeDetail = (id) => {
  const [notice, setNotice] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getNoticeDetailData = async () => {
      try {
        const response = await get(`admin/notice/${id}`);
        setNotice(response);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    getNoticeDetailData();
  }, [id]);

  return { notice, errorMessage };
};

export default useNoticeDetail;
