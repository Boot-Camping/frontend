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
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { get, put, deleteRequest } from "../utils/api";

const AdminCampFixPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL 파라미터에서 ID 가져오기
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
  const [postcode, setPostcode] = useState("");
  const addressRef = React.useRef();
  const detailAddressRef = React.useRef();
  const { accessToken } = getUserIdFromToken();

  useEffect(() => {
    const fetchCampingPlace = async () => {
      try {
        const data = await get(`camps/${id}`, customHeaders);

        if (data) {
          setDescription(data.description || "");
          setName(data.name || "");
          setTel(data.tel || "");
          setPrice(data.price || "");
          setStandardNum(data.standardNum || "");
          setMaxNum(data.maxNum || "");
          setOverCharge(data.overCharge || "");
          setImageFiles(data.imageFiles || []);
          setCategory(data.categories || []);

          // 주소 데이터를 분리하여 상태로 저장
          const { postcode, mainAddress, detailAddress } = splitAddress(
            data.addr
          );
          setPostcode(postcode);
          addressRef.current.value = mainAddress;
          detailAddressRef.current.value = detailAddress;
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchCampingPlace();
  }, [id, accessToken]);

  // addr에서 우편번호, 메인 주소, 상세 주소를 분리하는 함수
  const splitAddress = (addr) => {
    const postcodeMatch = addr.match(/\((\d{5})\)/); // 우편번호 추출
    const postcode = postcodeMatch ? postcodeMatch[1] : "";

    // 메인 주소와 상세 주소를 분리 (상세주소가 있다고 가정)
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
        `(${postcode}) ${addressRef.current.value} ${detailAddressRef.current.value}`
      )
    );

    categories.forEach((cat, index) => {
      formData.append(`categories[${index}]`, cat);
    });

    (updatedImages.length > 0 ? updatedImages : imageFiles).forEach((image) => {
      if (image instanceof File) {
        formData.append("imageFiles", image);
      }
    });

    // 요청을 보낼 때 요청 데이터와 URL이 올바른지 로그 확인
    console.log(
      "Sending PUT request with data:",
      Object.fromEntries(formData.entries())
    );

    try {
      await put("camps", formData, customHeaders);

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
          nitialImages={imageFiles.map((image) =>
            typeof image === "string" ? image : URL.createObjectURL(image)
          )}
          setImages={setUpdatedImages}
          imageFiles={updatedImages}
        />
        <DaumPostCode
          postcode={postcode} // 우편번호를 상태로 관리
          setPostcode={setPostcode} // 우편번호를 설정하는 함수
          addressRef={addressRef} // 주소 참조
          detailAddressRef={detailAddressRef} // 상세 주소 참조
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
      </div>
    </div>
  );
};

export default AdminCampFixPage;
