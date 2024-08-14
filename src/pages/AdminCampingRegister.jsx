import React, { useState, useRef } from "react";
import "../css/AdminCampingRegister.css";
import AdminCampAddress from "./AdminCampAddress";

const AdminCampingRegister = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      } else {
        return [...prev, category];
      }
    });
  };
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

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

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="regi-title">캠핑지 등록</div>
      <div className="regi-category">
        <button
          className={`regi-category-san ${
            selectedCategories.includes("산") ? "selected" : ""
          }`}
          onClick={() => toggleCategory("산")}
        >
          산
        </button>
        <button
          className={`regi-category-sea ${
            selectedCategories.includes("바다") ? "selected" : ""
          }`}
          onClick={() => toggleCategory("바다")}
        >
          바다
        </button>
        <button
          className={`regi-category-gog ${
            selectedCategories.includes("계곡") ? "selected" : ""
          }`}
          onClick={() => toggleCategory("계곡")}
        >
          계곡
        </button>
        <button
          className={`regi-category-dog ${
            selectedCategories.includes("반려견동반가능") ? "selected" : ""
          }`}
          onClick={() => toggleCategory("반려견동반가능")}
        >
          반려견동반가능
        </button>
        <button
          className={`regi-category-NoKids ${
            selectedCategories.includes("노키즈") ? "selected" : ""
          }`}
          onClick={() => toggleCategory("노키즈")}
        >
          노키즈
        </button>
      </div>
      <div className="hashTag">#중복 선택 가능</div>
      <div className="camp-name">캠핑장 이름</div>
      <div>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          className="input-camp-name"
          required
        />
      </div>
      <div className="camp-img-title">사진</div>
      <div className="image-uploader-container">
        <button
          className="camp-img-input"
          onClick={() => fileInputRef.current.click()}
        >
          + 등록
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="camp-img-input-hidden"
          accept="image/png, image/jpeg, image/gif"
          multiple
          onChange={handleImageChange}
        />
        <div className="img-previews">
          {images.map((src, index) => (
            <div key={index} className="img-preview-container">
              <div
                className="img-preview"
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
      <AdminCampAddress setError={setError} setIsOpened={setIsOpened} />
      <div>
        <div className="camp-info">
          <div className="camp-number-title">전화번호</div>
          <div className="camp-price-title">금액 /1박</div>
        </div>
        <div className="contact-info">
          <input
            id="camp-number"
            name="camp-number"
            type="number"
            autoComplete="camp-number"
            className="input-camp-number"
            required
          />
          <input
            id="camp-price"
            name="camp-price"
            type="number"
            autoComplete="camp-price"
            className="input-camp-price"
            required
          />
          <span className="won">원</span>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default AdminCampingRegister;
