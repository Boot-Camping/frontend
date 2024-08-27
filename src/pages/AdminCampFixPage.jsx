import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../components/admin-camping-register-page/AdminCampingRegister.css";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../constants/svgCollection";
import AdminCampAddress from "../components/admin-camping-register-page/AdminCampAddress";
import AdminCategoryBtn from "../components/admin-camping-register-page/AdminCategoryBtn";
import AdminImgPlus from "../components/admin-camping-register-page/AdminImgPlus";
import AdminMainLink from "../components/admin-camping-register-page/AdminMainLink";
import useFetchCampingList from "../hooks/useFetchCampingList";
import useCampingPlaceFilter from "../hooks/useCampingPlaceFilter";
import { put } from "../utils/Api";

const AdminCampFixPage = () => {
  const navigate = useNavigate();
  const svg = svgCollection;
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [price, setPrice] = useState("");
  const [standardNum, setStandardNum] = useState("");
  const [maxNum, setMaxNum] = useState("");
  const [overCharge, setOverCharge] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [category, setCategory] = useState([]);

  const { campingPlaces } = useFetchCampingList();
  const { selectedFilter, setSelectedFilter, campingPlaceFiltered } =
    useCampingPlaceFilter(campingPlaces);

  // 현재 id에 맞는 캠핑장 데이터 찾기
  const currentCampingPlace = campingPlaceFiltered.find(
    (place) => place.id === parseInt(id)
  );

  useEffect(() => {
    if (currentCampingPlace) {
      setDescription(currentCampingPlace.description);
      setName(currentCampingPlace.name);
      setTel(currentCampingPlace.tel);
      setPrice(currentCampingPlace.price);
      setStandardNum(currentCampingPlace.standardNum);
      setMaxNum(currentCampingPlace.maxNum);
      setOverCharge(currentCampingPlace.overCharge);
      setImageUrls(currentCampingPlace.imageUrls || []);
      setCategory(currentCampingPlace.category || []);
    }
  }, [currentCampingPlace]);

  const handleImagesChange = (newImages) => {
    setImages(newImages);
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
      if (typeof image === "string") {
        formData.append(`imageUrls[${index}]`, image);
      } else {
        formData.append(`imageUrls[${index}]`, image);
      }
    });

    try {
      await put(`camps/${id}`, formData, {
        "Content-Type": "multipart/form-data",
      });
      alert("캠핑장 정보가 수정되었습니다.");
      navigate("/admin");
    } catch (error) {
      alert(`수정 실패: ${error.message}`);
    }
  };

  if (!currentCampingPlace) {
    return <div>캠핑장 정보를 찾을 수 없습니다.</div>;
  }

  if (error) {
    return <div>캠핑장 정보 가져오기 실패: {error.message}</div>;
  }

  return (
    <div>
      <AdminMainLink />
      <div className="regi-title">캠핑지 수정</div>
      <ReactSVG
        src={svgCollection.prev}
        className="notice-move-prev"
        onClick={() => navigate(-1)}
      />

      <AdminCategoryBtn onCategoryChange={handleCategoriesChange} />
      <div className="camp-name">캠핑장 이름</div>
      <div className="camping-list">
        <div>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-camp-name"
            required
          />
        </div>
        <div className="camp-img-title">사진</div>
        <AdminImgPlus
          initialImages={imageUrls}
          onImagesChange={handleImagesChange}
        />
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
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              className="input-camp-number"
              required
            />
            <div>
              <input
                id="camp-price"
                name="camp-price"
                type="number"
                value={price}
                className="input-camp-price"
                required
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
                id="camp-user"
                name="camp-user"
                type="number"
                value={standardNum}
                onChange={(e) => setStandardNum(e.target.value)}
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
                value={maxNum}
                className="input-camp-max-user"
                required
                onChange={(e) => setMaxNum(e.target.value)}
              />
              <span className="camping-user">명</span>
            </div>
            <div>
              <input
                id="camp-price"
                name="camp-price"
                type="number"
                value={overCharge}
                onChange={(e) => setOverCharge(e.target.value)}
                className="input-camp-plus-price"
                required
              />
              <span className="won">원</span>
            </div>
          </div>
        </div>
        <div className="camping-explanaion">캠핑지 소개</div>
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
        </form>
      </div>

      <div className="camp-center-container">
        <button type="submit" className="camp-fix-btn">
          수정
        </button>
      </div>
    </div>
  );
};

export default AdminCampFixPage;
