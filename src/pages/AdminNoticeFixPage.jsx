import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../constants/svgCollection";
import { get, put, deleteRequest } from "../utils/api";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import AdminMainLink from "../components/admin-camping-register-page/AdminMainLink";
import AdminImgPlus from "../components/admin-camping-register-page/AdminImgPlus";
import EmptyContent from "../components/common/EmptyContent";
import "../components/notice-page/NoticePage.css";
import "../components/admin-camping-register-page/AdminCampingRegister.css";

const AdminNoticeFixPage = () => {
  const { id } = useParams();
  const { accessToken } = getUserIdFromToken();
  const [notice, setNotice] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [images, setImages] = useState([]); // 서버에서 가져온 이미지 URL
  const [updatedImages, setUpdatedImages] = useState([]); // 새로 업로드된 이미지
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getNoticeDetailData = async () => {
      try {
        const response = await get(`admin/notice/${id}`);
        setNotice(response);
        setTitle(response.title);
        setDescription(response.description);
        setImages(
          response.images ? response.images.map((url) => ({ src: url })) : []
        );
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

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const removeHandle = async () => {
    try {
      await deleteRequest(`admin/notice/${id}`);
      alert("공지사항이 삭제되었습니다.");
      navigate("/admin");
    } catch (error) {
      alert(
        `삭제 실패: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    const request = {
      title: title,
      description: description,
    };

    formData.append("request", JSON.stringify(request));

    // 기존 이미지와 새로 업로드된 이미지 모두 추가
    [...images, ...updatedImages].forEach((image) => {
      if (image.file) {
        formData.append("images", image.file); // 'images' 필드에 파일 추가
      }
    });

    const customHeaders = {
      Authorization: `${accessToken}`,
      "Content-Type": "multipart/form-data",
    };

    try {
      await put(`admin/notice/${id}`, formData, customHeaders);
      alert("공지사항이 성공적으로 수정되었습니다.");
      navigate(`/admin/notice-list`);
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
          <div className="camp-right-container">
            <button
              onClick={removeHandle}
              type="submit"
              className="camp-remove-btn"
            >
              삭제
            </button>
          </div>
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
            imageFiles={updatedImages} // 새로 업로드된 이미지
            setImages={setUpdatedImages} // 새로 업로드된 이미지를 설정
            onUploadSuccess={(files) => console.log("Upload success:", files)}
            onUploadError={(error) => console.error("Upload error:", error)}
          />

          <div className="img-previews">
            {notice.imageUrl && Array.isArray(notice.imageUrl) ? (
              notice.imageUrl.map((url, index) => (
                <div key={index} className="img-preview-container">
                  <img
                    className="img-preview"
                    key={index}
                    src={url}
                    alt={`Notice image ${index + 1}`}
                  />
                  <button
                    className="img-remove-btn"
                    onClick={() => handleRemoveImage(index)}
                  >
                    ×
                  </button>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
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
