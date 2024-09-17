import React, { useState } from "react";
import "./ReviewImgUploader.css";

const ReviewImgUploader = ({ maxImages, setReviewImages }) => {
  const [selectedImgs, setSelectedImgs] = useState([]);

  const imageChangeHandle = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));

    const updatedImages = [...selectedImgs, ...newImages].slice(0, maxImages);
    setSelectedImgs(updatedImages);
    setReviewImages(updatedImages.map((img) => img.file));
  };

  const imageRemoveHandle = (indexToRemove) => {
    const updatedImages = selectedImgs.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedImgs(updatedImages);
    setReviewImages(updatedImages.map((img) => img.file));
  };

  return (
    <div className="img-selector">
      {selectedImgs.map((image, index) => (
        <div key={index} className="img-preview">
          <img
            src={image.url}
            className="selected-img"
            alt={`Preview ${index}`}
          />
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
