import React, { useEffect, useState } from "react";
import { get } from "../utils/api";

const useNotice = (page, size) => {
  const [noticeData, setNoticeData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getNoticeData = async () => {
      const customHeaders = {
        "Content-Type": "application/x-www-form-urlencoded",
      };

      const params = {
        page: page,
        size: size,
      };

      const queryString = new URLSearchParams(params).toString();

      try {
        const response = await get(
          `admin/notice/all?${queryString}`,
          customHeaders
        );
        setNoticeData(response.content);
        setTotalPages(response.totalPages);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    getNoticeData();
  }, [page, size]);

  return { noticeData, errorMessage, totalPages };
};

export default useNotice;
