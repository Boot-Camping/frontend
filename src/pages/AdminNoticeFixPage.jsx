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
  const [imageUrls, setImageUrls] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updatedImages, setUpdatedImages] = useState([]);
  const navigate = useNavigate();

  // 공지사항 데이터를 가져오는 함수
  useEffect(() => {
    const getNoticeDetailData = async () => {
      try {
        const response = await get(`admin/notice/${id}`);
        setNotice(response);
        setTitle(response.title);
        setDescription(response.description);
        setImageUrls(response.imageUrls || []); // imageUrls가 있으면 설정
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    getNoticeDetailData();
  }, [id]);

  // 제목 변경 핸들러
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // 설명 변경 핸들러
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // 이미지 업로드 성공 핸들러
  const handleUploadSuccess = (uploadedImages) => {
    setUpdatedImages(uploadedImages);
  };

  // 이미지 업로드 실패 핸들러
  const handleUploadError = (errorMessage) => {
    console.error("Image upload failed:", errorMessage);
  };

  // 수정 버튼 클릭 시 호출되는 함수
  const handleUpdate = async () => {
    const updatedNotice = {
      title: title,
      description: description,
      imageUrls: updatedImages.length > 0 ? updatedImages : imageUrls,
    };

    try {
      await put(`admin/notice/${id}`, updatedNotice);
      alert("공지사항이 성공적으로 수정되었습니다.");
      navigate(`/admin/notice/${id}`);
    } catch (error) {
      console.error("Update failed:", error.message);
      alert("공지사항 수정에 실패했습니다.");
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
            initialImages={imageUrls}
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
