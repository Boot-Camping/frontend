import React, { useState } from "react";
import "./ReviewWriter.css";

const ReviewImgUploader = ({ maxImages }) => {
  const [selectedImgs, setSelectedImgs] = useState([]);

  const imageChangeHandle = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));

    setSelectedImgs((prevImages) =>
      [...prevImages, ...newImages].slice(0, maxImages)
    );
  };

  const imageRemoveHandle = (indexToRemove) => {
    prevImages.filter((_, index) => index !== indexToRemove);
  };

  return (
    <div className="img-selector">
      {selectedImgs.map((image, index) => (
        <div key={index} className="img-preview">
          <img src={image} className="selected-img" />
          <button
            className="remove-img-btn"
            onClick={() => imageRemoveHandle(index)}
          >
            &times;
          </button>
        </div>
      ))}
      {selectedImgs.length < maxImages && (
        <label className="img-upload-label">
          <input
            type="file"
            accept="image/*"
            onChange={imageChangeHandle}
            multiple
          />
          <span className="img-upload-placeholder">+</span>
        </label>
      )}
    </div>
  );
};

export default ReviewImgUploader;
