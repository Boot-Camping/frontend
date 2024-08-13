import React, { useState } from "react";
import "../css/AdminNotiRegister.css";

const AdminNotiRegister = () => {
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
      <div className="regiTitle">캠핑지 등록</div>
      <div className="regiCategory">
        <button
          className={`regiCategorySan ${
            selectedCategories.includes("산") ? "selected" : ""
          }`}
          onClick={() => toggleCategory("산")}
        >
          산
        </button>
        <button
          className={`regiCategorySea ${
            selectedCategories.includes("바다") ? "selected" : ""
          }`}
          onClick={() => toggleCategory("바다")}
        >
          바다
        </button>
        <button
          className={`regiCategoryGog ${
            selectedCategories.includes("계곡") ? "selected" : ""
          }`}
          onClick={() => toggleCategory("계곡")}
        >
          계곡
        </button>
        <button
          className={`regiCategoryDog ${
            selectedCategories.includes("반려견동반가능") ? "selected" : ""
          }`}
          onClick={() => toggleCategory("반려견동반가능")}
        >
          반려견동반가능
        </button>
        <button
          className={`regiCategoryNoKids ${
            selectedCategories.includes("노키즈") ? "selected" : ""
          }`}
          onClick={() => toggleCategory("노키즈")}
        >
          노키즈
        </button>
      </div>
    </div>
  );
};

export default AdminNotiRegister;
