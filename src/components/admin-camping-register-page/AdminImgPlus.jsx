import React, { useEffect, useRef } from "react";
import "./AdminCampingRegister.css";

const AdminImgPlus = ({
  imageFiles,
  setImages,
  onUploadSuccess,
  onUploadError,
}) => {
  const fileInputRef = useRef(null);

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    const fileReaders = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({ file, src: e.target.result });
        };
        reader.onerror = (error) => {
          reject(new Error("File reading error"));
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(fileReaders)
      .then((results) => {
        setImages((prevImages) => [
          ...prevImages,
          ...results.map((result) => ({ src: result.src, file: result.file })),
        ]);

        if (onUploadSuccess) {
          onUploadSuccess(results.map((result) => result.file));
        }
      })
      .catch((error) => {
        console.error("Error reading files:", error);
        if (onUploadError) {
          onUploadError(error.message);
        }
      });
  };

  return (
    <div>
      <div className="image-uploader-container">
        <button
          className="camp-img-input"
          onClick={() => fileInputRef.current.click()}
        >
          + 등록
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="camp-img-input-hidden"
          accept="image/png, image/jpeg, image/jpg"
          multiple
          onChange={handleImageChange}
        />
        <div className="img-previews">
          {imageFiles.map((image, index) => (
            <div key={index} className="img-preview-container">
              <div
                className="img-preview"
                style={{ backgroundImage: `url(${image.src})` }}
              ></div>
              <button
                className="img-remove-btn"
                onClick={() => handleRemoveImage(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminImgPlus;
