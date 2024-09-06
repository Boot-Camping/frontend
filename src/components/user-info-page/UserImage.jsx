import React from "react";
import "./UserImage.css";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import { getUserIdFromToken } from "../../utils/getUserIdFromToken";
import { post } from "../../utils/api";
import EmptyContent from "../common/EmptyContent";

const UserImage = ({
  userData,
  error,
  setError,
  errorMessage,
  setErrorMessage,
  onUpdate,
}) => {
  const { accessToken } = getUserIdFromToken();

  const customHeaders = {
    Authorization: `${accessToken}`,
    "Content-Type": "multipart/form-data",
  };

  const fileUploadHandle = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      setError(true);
      setErrorMessage("Message: 파일 크기는 1MB 이하이어야 합니다.");
      return;
    }

    const formData = new FormData();
    formData.append("images", file);

    try {
      await post(`userprofile/images`, formData, customHeaders);
      onUpdate();
      setError(false);
      setErrorMessage("");
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="user-profile-img-wrap underline">
      <div className="profile-img-wrap">
        <input type="file" id="profile-img-input" onChange={fileUploadHandle} />
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
        {errorMessage && (
          <EmptyContent error={error} errorMessage={errorMessage} />
        )}
      </div>
      <div>{userData.name}</div>
    </div>
  );
};

export default UserImage;
