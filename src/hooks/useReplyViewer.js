import { useEffect, useState } from "react";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { get } from "../utils/api";
import { deleteRequest } from "../utils/api";

const useReplyViewer = (reviewId) => {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken } = getUserIdFromToken();

  useEffect(() => {
    const fetchReplies = async () => {
      const customHeaders = {
        Authorization: `${accessToken}`,
      };

      try {
        console.log("요청하려는 reviewId:", reviewId);
        const response = await get(
          `reviews/${reviewId}/replies`,
          customHeaders
        );
        console.log("API 응답:", response);
        setReplies(response);
        setLoading(false);
      } catch (error) {}
    };

    fetchReplies();
  }, [reviewId]);

  const deleteReply = async (replyId) => {
    const customHeaders = {
      Authorization: `${accessToken}`,
    };

    try {
      await deleteRequest(
        `review/${reviewId}/replies/${replyId}`,
        {},
        customHeaders
      );
      // 삭제된 댓글을 목록에서 제거
      setReplies((prevReplies) =>
        prevReplies.filter((reply) => reply.id !== replyId)
      );
      console.log(`댓글 ID${replyId} 삭제에 성공했습니다!`);
    } catch (error) {
      console.error("댓글 삭제에 실패했습니다:", error);
      setError(error);
    }
  };

  return { replies, loading, error, deleteReply };
};

export default useReplyViewer;
