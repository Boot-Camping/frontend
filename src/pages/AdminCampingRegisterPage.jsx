import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/admin-camping-register-page/AdminCampingRegister.css";
import AdminCampAddress from "../components/admin-camping-register-page/AdminCampAddress";
import { ReactSVG } from "react-svg";
import { saveIcon } from "../constants/save";
import AdminCategoryBtn from "../components/admin-camping-register-page/AdminCategoryBtn";
import AdminImgPlus from "../components/admin-camping-register-page/AdminImgPlus";
import AdminMainLink from "../components/admin-camping-register-page/AdminMainLink";

const AdminCampingRegister = () => {
  const [error, setError] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [explanaion, setExplanaion] = useState(""); // 상태 변수 수정
  const navigate = useNavigate();

  const handleChange = (event) => {
    setExplanaion(event.target.value); // 상태 변수 수정
  };

  return (
    <div>
      <div className="regi-title">캠핑지 등록</div>
      <ReactSVG
        src={saveIcon.prev}
        className="notice-move-prev"
        onClick={() => navigate(-1)}
      />

      <AdminCategoryBtn />

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
      <AdminImgPlus />
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
          <div>
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
              autoComplete="camp-user"
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
              autoComplete="camp-user"
              className="input-camp-user"
              required
            />
            <span className="camping-user">명</span>
          </div>
          <div>
            <input
              id="camp-price"
              name="camp-price"
              type="number"
              autoComplete="camp-price"
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
        <button className="camp-perpect-regi">등록</button>
      </div>
    </div>
  );
};

export default AdminCampingRegister;
