import React, { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import AdminCampAddress from "../components/admin-camping-register-page/AdminCampAddress";
import { ReactSVG } from "react-svg";
import { saveData } from "../constants/save";
import useCampingPlaceFilter from "../hooks/useCampingPlaceFilter";
import "../components/admin-camping-register-page/AdminCampingRegister.css";

const AdminCampFixPage = () => {
  const { id } = useParams();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [explanaion, setExplanaion] = useState(""); // 상태 변수 수정
  const { selectedFilter, setSelectedFilter, campingPlaceFiltered } =
    useCampingPlaceFilter(saveData);

  const selectedCampingPlace = campingPlaceFiltered.find(
    (place) => place.id === parseInt(id)
  );

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

  const handleChange = (event) => {
    setExplanaion(event.target.value); // 상태 변수 수정
  };

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
      <Link to={"/admin"}>
        <ReactSVG
          className="admin-home-icon"
          src="../../src/assets/svg/home.svg"
          alt=""
        />
      </Link>
      <div className="regi-title">캠핑지 수정</div>
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
          placeholder={selectedCampingPlace.campName}
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
            placeholder={selectedCampingPlace.phoneNumber}
            className="input-camp-number"
            required
          />
          <div>
            <input
              id="camp-price"
              name="camp-price"
              type="number"
              placeholder={selectedCampingPlace.price}
              className="input-camp-price"
              required
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
              id="camp-user"
              name="camp-user"
              type="number"
              placeholder={selectedCampingPlace.standardNum}
              className="input-camp-user"
              required
            />
            <span className="camping-user">명</span>
          </div>
          <div>
            <input
              id="camp-user"
              name="camp-user"
              type="number"
              placeholder={selectedCampingPlace.maxNum}
              className="input-camp-max-user"
              required
            />
            <span className="camping-user">명</span>
          </div>
          <div>
            <input
              id="camp-price"
              name="camp-price"
              type="number"
              placeholder={selectedCampingPlace.overCharge}
              className="input-camp-plus-price"
              required
            />
            <span className="won">원</span>
          </div>
        </div>
      </div>
      <div className="camping-explanaion">캠핑지 소개</div>
      <form>
        <textarea
          className="input-camp-exp"
          id="camp-exp"
          name="camp-exp"
          value={explanaion}
          onChange={handleChange}
          rows="30"
          cols="50"
          placeholder="캠핑장의 특징을 입력하세요."
        />
      </form>

      <div className="camp-center-container">
        <button className="camp-fix-btn">수정</button>
      </div>
    </div>
  );
};

export default AdminCampFixPage;
