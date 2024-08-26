// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../components/admin-camping-register-page/AdminCampingRegister.css";
// import { ReactSVG } from "react-svg";
// import { svgCollection } from "../constants/svgCollection";
// import AdminCampAddress from "../components/admin-camping-register-page/AdminCampAddress";
// import AdminCategoryBtn from "../components/admin-camping-register-page/AdminCategoryBtn";
// import AdminImgPlus from "../components/admin-camping-register-page/AdminImgPlus";
// import AdminMainLink from "../components/admin-camping-register-page/AdminMainLink";

// const AdminCampingRegister = () => {
//   const svg = svgCollection;
//   const [error, setError] = useState(false);
//   const [isOpened, setIsOpened] = useState(false);
//   const [explanaion, setExplanaion] = useState(""); // 상태 변수 수정
//   const [name, setName] = useState("");
//   const [tel, settel] = useState("");
//   const [campPrice, setCampPrice] = useState("");
//   const [standardPeople, setStandardPeople] = useState("");
//   const [maxPeople, setMaxPeople] = useState("");
//   const [additionalCharge, setAdditionalCharge] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (event) => {
//     setExplanaion(event.target.value); // 상태 변수 수정
//   };

//   return (
//     <div>
//       <AdminMainLink />
//       <div className="regi-title">캠핑지 등록</div>
//       <ReactSVG
//         src={svg.prev}
//         className="notice-move-prev"
//         onClick={() => navigate(-1)}
//       />

//       <AdminCategoryBtn />

//       <div className="camp-name">캠핑장 이름</div>
//       <div>
//         <input
//           id="name"
//           name="name"
//           type="text"
//           autoComplete="name"
//           className="input-camp-name"
//           required
//         />
//       </div>
//       <div className="camp-img-title">사진</div>
//       <AdminImgPlus />
//       <AdminCampAddress setError={setError} setIsOpened={setIsOpened} />

//       <div>
//         <div className="camp-info">
//           <div className="camp-number-title">전화번호</div>
//           <div className="camp-price-title">금액 /1박</div>
//         </div>
//         <div className="contact-info">
//           <input
//             id="camp-number"
//             name="camp-number"
//             type="number"
//             autoComplete="camp-number"
//             className="input-camp-number"
//             required
//           />
//           <div>
//             <input
//               id="camp-price"
//               name="camp-price"
//               type="number"
//               autoComplete="camp-price"
//               className="input-camp-price"
//               required
//             />
//             <span className="won">원</span>
//           </div>
//         </div>
//         <div className="camp-user-title">
//           <div className="camp-standard-title">기준 인원</div>
//           <div className="camp-max-user-title">최대 인원</div>
//           <div className="camp-plus-price-title">추가 요금 /인당</div>
//         </div>
//         <div className="camping-info">
//           <div>
//             <input
//               id="camp-user"
//               name="camp-user"
//               type="number"
//               autoComplete="camp-user"
//               className="input-camp-user"
//               required
//             />
//             <span className="camping-user">명</span>
//           </div>
//           <div>
//             <input
//               id="camp-user"
//               name="camp-user"
//               type="number"
//               autoComplete="camp-user"
//               className="input-camp-user"
//               required
//             />
//             <span className="camping-user">명</span>
//           </div>
//           <div>
//             <input
//               id="camp-price"
//               name="camp-price"
//               type="number"
//               autoComplete="camp-price"
//               className="input-camp-plus-price"
//               required
//             />
//             <span className="won">원</span>
//           </div>
//         </div>
//       </div>

//       <div className="camping-explanaion">캠핑지 소개</div>
//       <form>
//         <textarea
//           className="input-camp-exp"
//           id="camp-exp"
//           name="camp-exp"
//           value={explanaion}
//           onChange={handleChange}
//           rows="30"
//           cols="50"
//           placeholder="캠핑장의 특징을 입력하세요."
//         />
//       </form>
//       <div className="camp-center-container">
//         <button className="camp-perpect-regi">등록</button>
//       </div>
//     </div>
//   );
// };

// export default AdminCampingRegister;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/admin-camping-register-page/AdminCampingRegister.css";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../constants/svgCollection";
import AdminCampAddress from "../components/admin-camping-register-page/AdminCampAddress";
import AdminCategoryBtn from "../components/admin-camping-register-page/AdminCategoryBtn";
import AdminImgPlus from "../components/admin-camping-register-page/AdminImgPlus";
import AdminMainLink from "../components/admin-camping-register-page/AdminMainLink";
import { post } from "../utils/Api"; // 여기에 api.jsx에서 post를 가져옵니다.

const AdminCampingRegister = () => {
  const svg = svgCollection;
  const [error, setError] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [description, setDescription] = useState(""); // 상태 변수 수정
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [price, setPrice] = useState("");
  const [standardNum, setStandardNum] = useState("");
  const [maxNum, setMaxNum] = useState("");
  const [overCharge, setOverCharge] = useState("");
  const [imageUrls, setImageUrls] = useState([]); // 이미지 상태 추가
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  const handleImagesChange = (newImages) => {
    setImageUrls(newImages);
  };

  const handleCategoriesChange = (newCategories) => {
    setCategory(newCategories);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("tel", tel);
    formData.append("price", price);
    formData.append("standardNum", standardNum);
    formData.append("maxNum", maxNum);
    formData.append("overCharge", overCharge);
    formData.append("description", description);

    category.forEach((category, index) => {
      formData.append(`category[${index}]`, category);
    });

    imageUrls.forEach((image, index) => {
      formData.append(`imageUrls[${index}]`, image);
    });

    try {
      await post("camps", formData, {
        "Content-Type": "multipart/form-data", // FormData를 사용할 때는 multipart/form-data 헤더를 사용
      });
      alert("캠핑장 등록이 완료되었습니다.");
      navigate("/admin");
    } catch (error) {
      alert(`등록 실패: ${error.message}`);
    }
  };

  return (
    <div>
      <AdminMainLink />
      <div className="regi-title">캠핑지 등록</div>
      <ReactSVG
        src={svg.prev}
        className="notice-move-prev"
        onClick={() => navigate(-1)}
      />

      <AdminCategoryBtn onCategoryChange={handleCategoriesChange} />

      <div className="camp-name">캠핑장 이름</div>
      <div>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          className="input-camp-name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="camp-img-title">사진</div>
      <AdminImgPlus onImagesChange={handleImagesChange} />
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
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
          <div>
            <input
              id="camp-price"
              name="camp-price"
              type="number"
              autoComplete="camp-price"
              className="input-camp-price"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <span className="won">원</span>
          </div>
        </div>
        <div className="camp-user-title">
          <div className="camp-standard-title">기준 인원</div>
          <div className="camp-max-user-title">최대 인원</div>
          <div className="camp-plus-price-title">추가 요금 /인당</div>
        </div>
        <div className="camping-info">
          <div>
            <input
              id="standard-num"
              name="standard-num"
              type="number"
              autoComplete="standard-num"
              className="input-camp-user"
              required
              value={standardNum}
              onChange={(e) => setStandardNum(e.target.value)}
            />
            <span className="camping-user">명</span>
          </div>
          <div>
            <input
              id="max-num"
              name="max-num"
              type="number"
              autoComplete="max-num"
              className="input-camp-user"
              required
              value={maxNum}
              onChange={(e) => setMaxNum(e.target.value)}
            />
            <span className="camping-user">명</span>
          </div>
          <div>
            <input
              id="additional-charge"
              name="additional-charge"
              type="number"
              autoComplete="additional-charge"
              className="input-camp-plus-price"
              required
              value={overCharge}
              onChange={(e) => setOverCharge(e.target.value)}
            />
            <span className="won">원</span>
          </div>
        </div>
      </div>

      <div className="camping-explanation">캠핑지 소개</div>
      <form onSubmit={handleSubmit}>
        <textarea
          className="input-camp-exp"
          id="camp-exp"
          name="camp-exp"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="30"
          cols="50"
          placeholder="캠핑장의 특징을 입력하세요."
        />
        <div className="camp-center-container">
          <button type="submit" className="camp-perpect-regi">
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminCampingRegister;
