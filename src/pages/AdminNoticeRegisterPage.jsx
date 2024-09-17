import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/admin-notice-register/AdminNoticeRegister.css";
import { post } from "../utils/api";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import AdminImgPlus from "../components/admin-camping-register-page/AdminImgPlus";
import AdminMainLink from "../components/admin-camping-register-page/AdminMainLink";

const AdminNoticeRegisterPage = () => {
  const { accessToken } = getUserIdFromToken();
  const [title, setTitle] = useState("");
  const [images, setImageUrl] = useState([]); // 이미지 파일 배열
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    // request를 문자열로 변환
    const request = {
      title: title,
      description: description,
    };

    formData.append("request", JSON.stringify(request)); // 문자열로 변환하여 추가

    // 이미지 파일을 배열로 추가
    images.forEach((image) => {
      if (image.file) {
        formData.append("images", image.file); // 'images' 필드에 파일 추가
      }
    });

    try {
      await post("admin/notice", formData, {
        Authorization: `${accessToken}`,
        "Content-Type": "multipart/form-data",
      });
      alert("공지사항이 성공적으로 등록되었습니다.");
      navigate("/admin/notice-list");
    } catch (error) {
      console.error("등록 실패:", error.response || error.message);
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
      <AdminImgPlus imageFiles={images} setImages={setImageUrl} />

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
