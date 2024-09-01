import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/admin-camping-register-page/AdminCampingRegister.css";
import "../components/main-page/MainCampingList.css";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../constants/svgCollection";
import AdminCampAddress from "../components/admin-camping-register-page/AdminCampAddress";
import AdminCategoryBtn from "../components/admin-camping-register-page/AdminCategoryBtn";
import AdminImgPlus from "../components/admin-camping-register-page/AdminImgPlus";
import AdminMainLink from "../components/admin-camping-register-page/AdminMainLink";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { post } from "../utils/api";

const AdminCampingRegister = () => {
  const [error, setError] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [price, setPrice] = useState("");
  const [standardNum, setStandardNum] = useState("");
  const [maxNum, setMaxNum] = useState("");
  const [overCharge, setOverCharge] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [category, setCategory] = useState([]);
  const [addr, setAddr] = useState("");
  const { accessToken } = getUserIdFromToken();
  const navigate = useNavigate();

  const handleUploadSuccess = (result) => {
    console.log("Upload succeeded:", result);
  };

  const handleUploadError = (errorMessage) => {
    console.error("Upload failed:", errorMessage);
  };

  const customHeaders = {
    Authorization: `${accessToken}`,
    "Content-Type": "multipart/form-data",
  };

  const handleCategoriesChange = (newCategories) => {
    setCategory(newCategories);
  };

  const handleUpload = async () => {
    const formData = new FormData();

    images.forEach((image, index) => {
      if (image.file) {
        formData.append(`images[${index}]`, image.file);
      }
    });

    try {
      const response = await post("camps", formData, customHeaders);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      handleUploadSuccess(result);

      // After successful upload, call handleSubmit
      handleSubmit();
    } catch (error) {
      console.error("Upload failed:", error);
      handleUploadError(error.message);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", String(name));
    formData.append("tel", String(tel));
    formData.append("price", Number(price));
    formData.append("standardNum", Number(standardNum));
    formData.append("maxNum", Number(maxNum));
    formData.append("overCharge", Number(overCharge));
    formData.append("description", String(description));
    formData.append("addr", String(addr));

    category.forEach((category, index) => {
      formData.append(`category[${index}]`, category);
    });

    imageUrls.forEach((image, index) => {
      formData.append(`imageUrls[${index}]`, image);
    });

    try {
      await post("camps", formData, customHeaders);
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
        src={svgCollection.prev}
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
      <AdminImgPlus
        onUploadSuccess={handleUploadSuccess}
        onUploadError={handleUploadError}
        onImageChange={setImages} // Ensure images are updated on image change
      />
      <AdminCampAddress
        addr={addr}
        setAddr={setAddr}
        setError={setError}
        setIsOpened={setIsOpened}
      />

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

      <div className="camping-explanaion">캠핑지 소개</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpload();
        }}
      >
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
