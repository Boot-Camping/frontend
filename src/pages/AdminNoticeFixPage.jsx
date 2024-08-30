import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../constants/svgCollection";
import { get, put } from "../utils/api";
import AdminMainLink from "../components/admin-camping-register-page/AdminMainLink";
import AdminImgPlus from "../components/admin-camping-register-page/AdminImgPlus";
import EmptyContent from "../components/common/EmptyContent";

const AdminNoticeFixPage = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [imageUrl, setImageUrl] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updatedImages, setUpdatedImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getNoticeDetailData = async () => {
      try {
        const response = await get(`admin/notice/${id}`);
        setNotice(response);
        setTitle(response.title);
        setDescription(response.description);
        setImageUrl(response.imageUrl || []);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    getNoticeDetailData();
  }, [id]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleUploadSuccess = (uploadedImages) => {
    // File 객체 대신 URL로 처리되어야 할 경우
    const uploadedImageUrls = uploadedImages.map((file) =>
      URL.createObjectURL(file)
    );
    setUpdatedImages(uploadedImageUrls);
  };

  const handleUploadError = (errorMessage) => {
    console.error("Image upload failed:", errorMessage);
  };

  const handleUpdate = async () => {
    const updatedNotice = {
      title,
      description,
      imageUrl: updatedImages.length > 0 ? updatedImages : imageUrl,
    };

    console.log("Updated Notice Data:", updatedNotice);

    try {
      await put(`admin/notice/${id}`, updatedNotice);
      alert("공지사항이 성공적으로 수정되었습니다.");
      navigate(`/admin/notice/${id}`);
    } catch (error) {
      console.error("Update failed:", error.response || error.message);
      alert(
        `공지사항 수정에 실패했습니다. 서버 응답: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  return (
    <div>
      <AdminMainLink />
      {notice ? (
        <>
          <div className="notice-title">공지사항 수정</div>
          <ReactSVG
            src={svgCollection.prev}
            className="notice-move-prev"
            onClick={() => navigate(-1)}
          />
          <div className="camping-notice-title">제목</div>
          <div>
            <input
              id="notice-title"
              name="notice-title"
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="input-notice-title"
              required
            />
          </div>

          <div className="camping-notice">내용</div>
          <AdminImgPlus
            initialImages={imageUrl}
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
          />
          <form>
            <textarea
              className="input-notice"
              id="input-notice"
              name="input-notice"
              value={description}
              onChange={handleDescriptionChange}
              rows="30"
              cols="50"
              placeholder="입력하세요."
            />
          </form>
          <div className="notice-center-container">
            <button className="camp-notice-fix" onClick={handleUpdate}>
              수정
            </button>
          </div>
        </>
      ) : (
        <EmptyContent errorMessage={errorMessage} />
      )}
    </div>
  );
};

export default AdminNoticeFixPage;
