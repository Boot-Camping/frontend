// import React, { useState, useRef } from "react";

// const AdminImgPlus = ({ onImagesChange }) => {
//   // onImagesChange 콜백 추가
//   const [images, setImages] = useState([]);
//   const fileInputRef = useRef(null);

//   const handleRemoveImage = (index) => {
//     setImages((prevImages) => prevImages.filter((_, i) => i !== index));
//     onImagesChange(images.filter((_, i) => i !== index)); // 콜백 호출
//   };

//   const handleImageChange = (event) => {
//     const files = Array.from(event.target.files);
//     setImages((prevImages) => [...prevImages, ...files]);
//     onImagesChange([...images, ...files]); // 콜백 호출
//   };

//   return (
//     <div>
//       <div className="image-uploader-container">
//         <button
//           className="camp-img-input"
//           onClick={() => fileInputRef.current.click()}
//         >
//           + 등록
//         </button>
//         <input
//           ref={fileInputRef}
//           type="file"
//           className="camp-img-input-hidden"
//           accept="image/png, image/jpeg, image/gif"
//           multiple
//           onChange={handleImageChange}
//         />
//         <div className="img-previews">
//           {images.map((file, index) => (
//             <div key={index} className="img-preview-container">
//               <div
//                 className="img-preview"
//                 style={{ backgroundImage: `url(${URL.createObjectURL(file)})` }}
//               ></div>
//               <button
//                 className="img-remove-btn"
//                 onClick={() => handleRemoveImage(index)}
//               >
//                 ×
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminImgPlus;

import React, { useState, useEffect, useRef } from "react";

const AdminImgPlus = ({ initialImages = [], onImagesChange }) => {
  const [images, setImages] = useState(initialImages); // 초기 이미지 설정
  const fileInputRef = useRef(null);

  // 컴포넌트가 마운트되었을 때, 초기 이미지를 상태로 설정
  useEffect(() => {
    setImages(initialImages);
  }, [initialImages]);

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesChange(updatedImages); // 업데이트된 이미지 목록 전달
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const updatedImages = [...images, ...files];
    setImages(updatedImages);
    onImagesChange(updatedImages); // 업데이트된 이미지 목록 전달
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
          {images.map((image, index) => (
            <div key={index} className="img-preview-container">
              <div
                className="img-preview"
                style={{
                  backgroundImage: `url(${
                    image instanceof File ? URL.createObjectURL(image) : image
                  })`,
                }}
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
