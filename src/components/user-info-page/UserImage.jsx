import React from "react";
import "./UserImage.css";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import EmptyContent from "../common/EmptyContent";
import useUserImage from "../../hooks/useUserImage";

const UserImage = ({
  userData,
  error,
  setError,
  errorMessage,
  setErrorMessage,
  onUpdate,
}) => {
  // 최대 파일 크기 1MB
  const MAX_FILE_SIZE = 1 * 1024 * 1024;

  const { postUserImage } = useUserImage(
    setError,
    setErrorMessage,
    onUpdate,
    MAX_FILE_SIZE
  );

  const fileChangeHandle = (event) => {
    const file = event.target.files[0];
    postUserImage(file);
  };

  return (
    <div className="user-profile-img-wrap underline">
      <div className="profile-img-wrap">
        <input type="file" id="profile-img-input" onChange={fileChangeHandle} />
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
