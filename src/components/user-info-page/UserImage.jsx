import React from "react";
import "./UserImage.css";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import { getUserIdFromToken } from "../../utils/getUserIdFromToken";
import { post } from "../../utils/api";

const UserImage = ({ userData, setErrorMessage, onUpdate }) => {
  const { accessToken } = getUserIdFromToken();

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
      </div>
      <div>{userData.name}</div>
    </div>
  );
};

export default UserImage;
