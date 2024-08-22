import React, { useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { noticeDetailData } from "../constants/notice";
import { saveIcon } from "../constants/save";

const AdminNoticeFixPage = () => {
  const { id } = useParams();
  const notice = noticeDetailData.find((data) => data.id === parseInt(id));

  const [selectedCategory, setSelectedCategory] = useState(notice.noticeStatus);
  const [images, setImages] = useState(notice.images || []);
  const [explanaion, setExplanaion] = useState(notice.noticeRequest || "");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // 카테고리 선택 핸들러
  const toggleCategory = (category) => {
    setSelectedCategory(category);
  };

  // 이미지 변경 핸들러
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const fileReaders = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(fileReaders)
      .then((urls) => {
        setImages((prevImages) => [...prevImages, ...urls]);
      })
      .catch((error) => {
        console.error("Error reading files:", error);
      });
  };

  // 이미지 제거 핸들러
  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // 텍스트 변경 핸들러
  const handleChange = (event) => {
    setExplanaion(event.target.value);
  };

  return (
    <div>
      <Link to={"/admin"}>
        <ReactSVG
          className="admin-home-icon"
          src="../../src/assets/svg/home.svg"
          alt=""
        />
      </Link>
      <ReactSVG
        src={saveIcon.prev}
        className="notice-move-prev"
        onClick={() => navigate(-1)}
      />
      <div className="notice-title">공지사항 수정</div>
      <div className="notice-category">
        <div className="notice-category-title">카테고리</div>
        <button
          className={`regi-category-notice ${
            selectedCategory === "공지사항" ? "selected" : ""
          }`}
          onClick={() => toggleCategory("공지사항")}
        >
          공지사항
        </button>
        <button
          className={`regi-category-event ${
            selectedCategory === "이벤트" ? "selected" : ""
          }`}
          onClick={() => toggleCategory("이벤트")}
        >
          이벤트
        </button>
      </div>

      <div className="camping-notice-title">제목</div>
      <div>
        <input
          id="notice-title"
          name="notice-title"
          type="text"
          value={notice.title}
          className="input-notice-title"
          required
        />
      </div>

      <div className="camping-notice">내용</div>
      <div className="notice-img-uploader-container">
        <button
          className="notice-img-input"
          onClick={() => fileInputRef.current.click()}
        >
          + 이미지
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="notice-img-input-hidden"
          accept="image/png, image/jpeg, image/gif"
          multiple
          onChange={handleImageChange}
        />
        <div className="notice-img-previews">
          {images.map((src, index) => (
            <div key={index} className="notice-img-preview-container">
              <div
                className="notice-img-preview"
                style={{ backgroundImage: `url(${src})` }}
              ></div>
              <button
                className="img-remove-btn"
                onClick={() => handleRemoveImage(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <form>
        <textarea
          className="input-notice"
          id="input-notice"
          name="input-notice"
          value={explanaion}
          onChange={handleChange}
          rows="30"
          cols="50"
          placeholder="입력하세요."
        />
      </form>
      <div className="notice-center-container">
        <button className="camp-notice-fix">수정</button>
      </div>
    </div>
  );
};

export default AdminNoticeFixPage;
