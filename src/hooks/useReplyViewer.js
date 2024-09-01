import { useEffect, useState } from "react";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { get, deleteRequest } from "../utils/api";

const useReplyViewer = (reviewId) => {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken } = getUserIdFromToken();

  const fetchReplies = async () => {
    const customHeaders = {
      Authorization: `${accessToken}`,
    };

    try {
      console.log("요청하려는 reviewId:", reviewId);
      const response = await get(`reviews/${reviewId}/replies`, customHeaders);
      console.log("API 응답:", response);
      setReplies(response);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchReplies();
  }, [reviewId]);

  const deleteReply = async (replyId) => {
    const customHeaders = {
      Authorization: `${accessToken}`,
    };

    try {
      await deleteRequest(
        `reviews/${reviewId}/replies/${replyId}`,
        {},
        customHeaders
      );

      setReplies((prevReplies) =>
        prevReplies.filter((reply) => reply.id !== replyId)
      );
      console.log(`댓글 ID${replyId} 삭제에 성공했습니다!`);
    } catch (error) {
      console.error("댓글 삭제에 실패했습니다:", error);
      setError(error);
    }
  };

  const refreshReplies = () => {
    setLoading(true);
    fetchReplies();
  };

  return { replies, loading, error, deleteReply, refreshReplies };
};

export default useReplyViewer;
