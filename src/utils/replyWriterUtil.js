import React from "react";
import { post } from "./api";
import { getUserIdFromToken } from "./getUserIdFromToken";

const replyWriterUtil = async (reviewId, replyContent) => {
  const { userId, accessToken } = getUserIdFromToken();

  const data = {
    userId,
    comment: replyContent,
  };

  const customHeaders = {
    Authorization: `${accessToken}`,
  };

  try {
    const response = await post(
      `reviews/${reviewId}/replies`,
      data,
      customHeaders
    );
    console.log("댓글 작성 성공:", response);
    return response;
  } catch (error) {
    console.error("댓글 작성 실패:", error);
    throw error;
  }
};

export default replyWriterUtil;
