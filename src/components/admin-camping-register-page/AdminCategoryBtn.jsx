import React, { useState } from "react";
import "./AdminCampingRegister.css";

const AdminCategoryBtn = ({ onCategoryChange }) => {
  // 콜백을 prop으로 받음
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (categories) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(categories)
        ? prev.filter((item) => item !== categories)
        : [...prev, categories];

      onCategoryChange(newCategories); // 카테고리가 변경될 때마다 콜백 호출
      return newCategories;
    });
  };

  return (
    <div>
      <div className="regi-category">
        <button
          className={`regi-category-san ${
            selectedCategories.includes("숲속") ? "selected" : ""
          }`}
          onClick={() => toggleCategory("숲속")}
        >
          숲속
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
            selectedCategories.includes("키즈") ? "selected" : ""
          }`}
          onClick={() => toggleCategory("키즈")}
        >
          키즈
        </button>
      </div>
      <div className="hashTag">#중복 선택 가능</div>
    </div>
  );
};

export default AdminCategoryBtn;
