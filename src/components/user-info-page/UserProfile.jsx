import React, { useState } from "react";
import "./UserProfile.css";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import { getUserIdFromToken } from "../../utils/getUserIdFromToken";
import { post } from "../../utils/api";

const UserProfile = ({
  setIsOpened,
  setModalType,
  userData,
  setErrorMessage,
  onUpdate,
}) => {
  const { accessToken } = getUserIdFromToken();
  const [selectedFile, setSelectedFile] = useState(null);

  const telChangeHandle = () => {
    setIsOpened(true);
    setModalType("tel");
    console.log("전화번호 변경");
  };

  const addrChangeHandle = () => {
    setIsOpened(true);
    setModalType("addr");
    console.log("주소 변경");
  };

  const customHeaders = {
    Authorization: `${accessToken}`,
    "Content-Type": "multipart/form-data",
  };

  const fileUploadHandle = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("images", file);

    try {
      await post(`userprofile/images`, formData, customHeaders);
      onUpdate();
    } catch (error) {
      setErrorMessage(error.message);
      console.log(error.message);
    }
  };

  const addrParts = userData.addr.match(/(.*?)(\s+\d+\s+)(.+)$/);
  const address = addrParts ? addrParts[1].trim() : userData.addr;
  const detailAddress = addrParts ? addrParts[3].trim() : "";

  return (
    <div className="user-profile-wrap">
      <div className="user-profile-img-wrap underline">
        <div className="profile-img-wrap">
          <input
            type="file"
            id="profile-img-input"
            onChange={fileUploadHandle}
          />
          <label htmlFor="profile-img-input">
            {userData.images[0] ? (
              <img src={userData.images[0]} className="profile-img" />
            ) : (
              <ReactSVG
                src={svgCollection.userImg}
                className="profile-img-user"
              />
            )}
            <ReactSVG src={svgCollection.photo} className="profile-img-photo" />
          </label>
        </div>
        <div>{userData.name}</div>
      </div>
      <div className="profile-txt-wrap underline">
        <div className="profile-txt">
          <div>이름</div>
          <div>{userData.name}</div>
        </div>
        <div className="profile-txt" onClick={telChangeHandle}>
          <div>전화번호</div>
          <div>
            <div>{userData.tel}</div>
            <div className="profile-change">변경</div>
          </div>
        </div>
        <div className="profile-txt">
          <div>이메일</div>
          <div>{userData.email}</div>
        </div>
        <div className="profile-txt profile-address" onClick={addrChangeHandle}>
          <div className="">주소</div>
          <div>
            {addrParts ? (
              <div>
                <div>{address}</div>
                <div>{detailAddress}</div>
              </div>
            ) : (
              <div>{userData.addr}</div>
            )}
            <div className="profile-change">변경</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
