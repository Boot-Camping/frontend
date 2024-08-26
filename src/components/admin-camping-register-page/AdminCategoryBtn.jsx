// import React, { useState, useRef } from "react";

// const AdminCategoryBtn = () => {
//   const [selectedCategories, setSelectedCategories] = useState([]);

//   const toggleCategory = (category) => {
//     setSelectedCategories((prev) => {
//       if (prev.includes(category)) {
//         return prev.filter((item) => item !== category);
//       } else {
//         return [...prev, category];
//       }
//     });
//   };
//   return (
//     <div>
//       <div className="regi-category">
//         <button
//           className={`regi-category-san ${
//             selectedCategories.includes("산") ? "selected" : ""
//           }`}
//           onClick={() => toggleCategory("산")}
//         >
//           산
//         </button>
//         <button
//           className={`regi-category-sea ${
//             selectedCategories.includes("바다") ? "selected" : ""
//           }`}
//           onClick={() => toggleCategory("바다")}
//         >
//           바다
//         </button>
//         <button
//           className={`regi-category-gog ${
//             selectedCategories.includes("계곡") ? "selected" : ""
//           }`}
//           onClick={() => toggleCategory("계곡")}
//         >
//           계곡
//         </button>
//         <button
//           className={`regi-category-dog ${
//             selectedCategories.includes("반려견동반가능") ? "selected" : ""
//           }`}
//           onClick={() => toggleCategory("반려견동반가능")}
//         >
//           반려견동반가능
//         </button>
//         <button
//           className={`regi-category-NoKids ${
//             selectedCategories.includes("노키즈") ? "selected" : ""
//           }`}
//           onClick={() => toggleCategory("노키즈")}
//         >
//           노키즈
//         </button>
//       </div>
//       <div className="hashTag">#중복 선택 가능</div>
//     </div>
//   );
// };

// export default AdminCategoryBtn;

import React, { useState } from "react";

const AdminCategoryBtn = ({ onCategoryChange }) => {
  // 콜백을 prop으로 받음
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category];

      onCategoryChange(newCategories); // 카테고리가 변경될 때마다 콜백 호출
      return newCategories;
    });
  };

  return (
    <div>
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
    </div>
  );
};

export default AdminCategoryBtn;
