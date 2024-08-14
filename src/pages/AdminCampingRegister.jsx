import React, { useState } from "react";
import "../css/AdminCampingRegister.css";

const AdminCampingRegister = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      } else {
        return [...prev, category];
      }
    });
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
    </div>
  );
};

export default AdminCampingRegister;
