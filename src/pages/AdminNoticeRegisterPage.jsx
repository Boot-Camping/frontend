import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../components/admin-notice-register/AdminNoticeRegister.css";
import { post } from "../utils/api";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import AdminImgPlus from "../components/admin-camping-register-page/AdminImgPlus";
import AdminMainLink from "../components/admin-camping-register-page/AdminMainLink";

const AdminNoticeRegisterPage = () => {
  const { id } = useParams();
  const { accessToken } = getUserIdFromToken();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState([]);
  const [updatedImages, setUpdatedImages] = useState([]);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

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

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    const updatedNotice = {
      title,
      description,
      imageUrl,
    };
    const customHeaders = {
      Authorization: `${accessToken}`,
    };

    console.log("Updated Notice Data:", updatedNotice);

    try {
      await post(`admin/notice`, updatedNotice, customHeaders);
      alert("공지사항이 성공적으로 등록되었습니다.");
      navigate(`/admin/notice-list`);
    } catch (error) {
      console.error("Update failed:", error.response || error.message);
      alert(
        `공지사항 등록에 실패했습니다. 서버 응답: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  return (
    <div>
      <AdminMainLink />
      <div className="notice-title">공지사항 등록</div>
      <div className="camping-notice-title">제목</div>
      <div>
        <input
          id="notice-title"
          name="notice-title"
          type="text"
          value={title}
          onChange={handleTitle}
          className="input-notice-title"
          required
        />
      </div>

      <div className="camping-notice">내용</div>
      <AdminImgPlus
        images={imageUrl}
        setImages={setImageUrl}
        onUploadSuccess={handleUploadSuccess}
        onUploadError={handleUploadError}
      />

      <textarea
        className="input-notice"
        id="input-notice"
        name="input-notice"
        value={description}
        onChange={handleDescription}
        rows="30"
        cols="50"
        placeholder="입력하세요."
      />

      <div className="notice-center-container">
        <button onClick={handleSubmit} className="camp-notice-regi">
          등록
        </button>
      </div>
    </div>
  );
};

export default AdminNoticeRegisterPage;
