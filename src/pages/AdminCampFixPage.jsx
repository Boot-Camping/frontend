import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../components/admin-camping-register-page/AdminCampingRegister.css";
import "../components/notice-page/NoticePage.css";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../constants/svgCollection";
import DaumPostCode from "../components/common/DaumPostCode";
import AdminCategoryBtn from "../components/admin-camping-register-page/AdminCategoryBtn";
import AdminImgPlus from "../components/admin-camping-register-page/AdminImgPlus";
import AdminMainLink from "../components/admin-camping-register-page/AdminMainLink";
import EmptyContent from "../components/common/EmptyContent";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { get, put, deleteRequest } from "../utils/api";

const AdminCampFixPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [camp, setCamp] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [price, setPrice] = useState("");
  const [standardNum, setStandardNum] = useState("");
  const [maxNum, setMaxNum] = useState("");
  const [overCharge, setOverCharge] = useState("");
  const [imageFiles, setImageFiles] = useState([]); // 기존 이미지 URL
  const [updatedImages, setUpdatedImages] = useState([]); // 새로 업로드된 이미지
  const [categories, setCategory] = useState([]);
  const [postcode, setPostcode] = useState("");
  const addressRef = useRef();
  const detailAddressRef = useRef();
  const { accessToken } = getUserIdFromToken();

  useEffect(() => {
    const fetchCampingPlace = async () => {
      try {
        const data = await get(`camps/${id}`, {
          Authorization: `${accessToken}`,
        });

        if (data) {
          setCamp(data);
          setDescription(data.description || "");
          setName(data.name || "");
          setTel(data.tel || "");
          setPrice(data.price || "");
          setStandardNum(data.standardNum || "");
          setMaxNum(data.maxNum || "");
          setOverCharge(data.overCharge || "");
          setImageFiles(
            data.imageFiles ? data.imageFiles.map((url) => ({ src: url })) : []
          );

          // 주소 데이터를 분리하여 상태로 저장
          const { postcode, mainAddress, detailAddress } = splitAddress(
            data.addr
          );
          setPostcode(postcode);

          // ref의 값 설정은 렌더링이 완료된 후
          setTimeout(() => {
            if (addressRef.current && detailAddressRef.current) {
              addressRef.current.value = mainAddress;
              detailAddressRef.current.value = detailAddress;
            }
          }, 0);

          setCategory(data.categories || []);
        }
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
      }
    };

    fetchCampingPlace();
  }, [id, accessToken]);

  const splitAddress = (addr) => {
    const postcodeMatch = addr.match(/\((\d{5})\)/);
    const postcode = postcodeMatch ? postcodeMatch[1] : "";
    const [mainAddress, detailAddress] = addr
      .replace(/\(\d{5}\)/, "")
      .split(", ");
    return {
      postcode,
      mainAddress: mainAddress.trim(),
      detailAddress: detailAddress ? detailAddress.trim() : "",
    };
  };

  const handleCategoriesChange = (newCategories) => {
    setCategory(newCategories);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!id) {
      alert("캠핑장 ID가 누락되었습니다.");
      return;
    }

    const formData = new FormData();
    formData.append("id", id);
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
        `(${postcode}) ${addressRef.current ? addressRef.current.value : ""} ${
          detailAddressRef.current ? detailAddressRef.current.value : ""
        }`
      )
    );

    categories.forEach((cat, index) => {
      formData.append(`categories[${index}]`, cat);
    });

    // 기존 이미지와 새로 업로드된 이미지를 모두 추가
    [...imageFiles, ...updatedImages].forEach((image) => {
      if (image instanceof File) {
        formData.append("imageFiles", image);
      }
    });

    try {
      await put("camps", formData, {
        Authorization: `${accessToken}`,
        "Content-Type": "multipart/form-data",
      });
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

  const handleRemoveImage = (index) => {
    setImageFiles((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  if (error) {
    return <div>캠핑장 정보 가져오기 실패: {errorMessage}</div>;
  }

  return (
    <div>
      <AdminMainLink />
      {camp ? (
        <>
          <div className="regi-title">캠핑지 수정</div>

          <div className="camp-right-container">
            <button
              onClick={removeHandle}
              type="submit"
              className="camp-remove-btn"
            >
              삭제
            </button>
          </div>

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
              setImages={setUpdatedImages}
              imageFiles={updatedImages}
            />

            <div className="img-previews">
              {camp.imageUrls && Array.isArray(camp.imageUrls) ? (
                camp.imageUrls.map((url, index) => (
                  <div key={index} className="img-preview-container">
                    <img
                      className="img-preview"
                      key={index}
                      src={url}
                      alt={`Camp image ${index + 1}`}
                    />
                    <button
                      className="img-remove-btn"
                      onClick={() => handleRemoveImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))
              ) : (
                <div></div>
              )}
            </div>

            <DaumPostCode
              postcode={postcode}
              setPostcode={setPostcode}
              addressRef={addressRef}
              detailAddressRef={detailAddressRef}
            />

            <div className="camp-info">
              <div className="camp-number-title">전화번호</div>
              <div className="camp-price-title">금액 /1박</div>
            </div>
            <div className="contact-info">
              <input
                id="camp-number"
                name="camp-number"
                type="text"
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
        </>
      ) : (
        <EmptyContent errorMessage={errorMessage} />
      )}
    </div>
  );
};

export default AdminCampFixPage;
