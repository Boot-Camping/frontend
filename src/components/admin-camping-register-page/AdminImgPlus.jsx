import React, { useState, useRef } from "react";

const AdminImgPlus = () => {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const fileReaders = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(fileReaders)
      .then((urls) => {
        setImages((prevImages) => [...prevImages, ...urls]);
      })
      .catch((error) => {
        console.error("Error reading files:", error);
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
          accept="image/png, image/jpeg, image/gif"
          multiple
          onChange={handleImageChange}
        />
        <div className="img-previews">
          {images.map((src, index) => (
            <div key={index} className="img-preview-container">
              <div
                className="img-preview"
                style={{ backgroundImage: `url(${src})` }}
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
