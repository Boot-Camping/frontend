import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../components/admin-camping-register-page/AdminCampingRegister.css";
import "../components/notice-page/NoticePage.css";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../constants/svgCollection";
import DaumPostCode from "../components/common/DaumPostCode";
import AdminCategoryBtn from "../components/admin-camping-register-page/AdminCategoryBtn";
import AdminImgPlus from "../components/admin-camping-register-page/AdminImgPlus";
import AdminMainLink from "../components/admin-camping-register-page/AdminMainLink";
import useFetchCampingList from "../hooks/useFetchCampingList";
import useCampingPlaceFilter from "../hooks/useCampingPlaceFilter";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { put, deleteRequest } from "../utils/api";

const AdminCampFixPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [price, setPrice] = useState("");
  const [standardNum, setStandardNum] = useState("");
  const [maxNum, setMaxNum] = useState("");
  const [overCharge, setOverCharge] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [categories, setCategory] = useState([]);
  const [updatedImages, setUpdatedImages] = useState([]);
  const [addr, setAddr] = useState("");
  const { accessToken } = getUserIdFromToken();

  const { campingPlaces } = useFetchCampingList();
  const { selectedFilter, setSelectedFilter, campingPlaceFiltered } =
    useCampingPlaceFilter(campingPlaces);

  const currentCampingPlace = campingPlaceFiltered.find(
    (place) => place.id === parseInt(id)
  );

  useEffect(() => {
    if (currentCampingPlace) {
      setDescription(currentCampingPlace.description || "");
      setName(currentCampingPlace.name || "");
      setTel(currentCampingPlace.tel || "");
      setPrice(currentCampingPlace.price || "");
      setStandardNum(currentCampingPlace.standardNum || "");
      setMaxNum(currentCampingPlace.maxNum || "");
      setOverCharge(currentCampingPlace.overCharge || "");
      setImageFiles(currentCampingPlace.imageFiles || []);
      setCategory(currentCampingPlace.category || []);
      setAddr(currentCampingPlace.addr || "");
    }
  }, [currentCampingPlace]);

  const handleUploadSuccess = (uploadedImages) => {
    const uploadedImageFiles = uploadedImages.map((file) =>
      URL.createObjectURL(file)
    );
    setUpdatedImages(uploadedImageFiles);
  };

  const handleUploadError = (errorMessage) => {
    console.error("Image upload failed:", errorMessage);
  };

  const handleCategoriesChange = (newCategories) => {
    setCategory(newCategories);
  };

  const customHeaders = {
    Authorization: `${accessToken}`,
    "Content-Type": "multipart/form-data",
  };

  const handleUpdate = async (event) => {
    event.preventDefault(); // 폼 제출 시 페이지가 리로드되는 것을 방지
    if (!id) {
      alert("캠핑장 ID가 누락되었습니다.");
      return;
    }

    const formData = new FormData();
    formData.append("name", String(name));
    formData.append("tel", String(tel));
    formData.append("price", Number(price));
    formData.append("standardNum", Number(standardNum));
    formData.append("maxNum", Number(maxNum));
    formData.append("overCharge", Number(overCharge));
    formData.append("description", String(description));
    formData.append(
      "addr",
      String(
        `(${postcode}) ${addressRef.current.value} ${detailAddressRef.current.value}`
      )
    );

    categories.forEach((cat, index) => {
      formData.append(`categories[${index}]`, cat);
    });

    (updatedImages.length > 0 ? updatedImages : imageFiles).forEach(
      (image, index) => {
        formData.append(`imageFiles[${index}]`, image);
      }
    );

    // 요청을 보낼 때 요청 데이터와 URL이 올바른지 로그 확인
    console.log(
      "Sending PUT request with data:",
      Object.fromEntries(formData.entries())
    );

    try {
      await put(`camps`, formData, customHeaders);

      alert("캠핑장 정보가 수정되었습니다.");
      navigate("/admin");
    } catch (error) {
      alert(`수정 실패: ${error.message}`);
    }
  };

  const removeHandle = async () => {
    try {
      await deleteRequest(`camps/${id}`);
      alert("캠핑장 정보가 삭제되었습니다.");
      navigate("/admin");
    } catch (error) {
      alert(`삭제 실패: ${error.message}`);
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

      <div className="camp-right-container">
        <button
          onClick={removeHandle}
          type="submit"
          className="camp-remove-btn"
        >
          삭제
        </button>
      </div>
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
          initialImages={imageFiles}
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
        />
        <DaumPostCode
          postcode={postcode}
          setPostcode={setPostcode}
          addressRef={addressRef}
          detailAddressRef={detailAddressRef}
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
        <form onSubmit={handleUpdate}>
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
            <button type="submit" className="camp-fix-btn">
              수정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCampFixPage;
