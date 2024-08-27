// import React, { useState, useEffect, useRef } from "react";

// const AdminImgPlus = ({ initialImages = [], onImagesChange }) => {
//   const [images, setImages] = useState(initialImages);
//   const fileInputRef = useRef(null);

//   // 초기 이미지 설정 및 메모리 정리
//   useEffect(() => {
//     // 기존 URL 해제
//     images.forEach((image) => {
//       if (image instanceof File) {
//         URL.revokeObjectURL(image);
//       }
//     });

//     // 새 URL 생성
//     setImages(initialImages);
//   }, [initialImages]);

//   useEffect(() => {
//     // 컴포넌트가 언마운트될 때 URL 해제
//     return () => {
//       images.forEach((image) => {
//         if (image instanceof File) {
//           URL.revokeObjectURL(image);
//         }
//       });
//     };
//   }, [images]);

//   const handleRemoveImage = (index) => {
//     const updatedImages = images.filter((_, i) => i !== index);
//     setImages(updatedImages);
//     onImagesChange(updatedImages);
//   };

//   const handleImageChange = (event) => {
//     const files = Array.from(event.target.files);
//     const updatedImages = [...images, ...files];
//     setImages(updatedImages);
//     onImagesChange(updatedImages);
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
//           {images.map((image, index) => (
//             <div key={index} className="img-preview-container">
//               <div
//                 className="img-preview"
//                 style={{
//                   backgroundImage: `url(${
//                     image instanceof File ? URL.createObjectURL(image) : image
//                   })`,
//                 }}
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
  const [images, setImages] = useState(initialImages);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Clean up URLs
    images.forEach((image) => {
      if (image instanceof File) {
        URL.revokeObjectURL(image);
      }
    });

    setImages(initialImages);
  }, [initialImages]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      images.forEach((image) => {
        if (image instanceof File) {
          URL.revokeObjectURL(image);
        }
      });
    };
  }, [images]);

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const updatedImages = [...images, ...files];
    setImages(updatedImages);
    onImagesChange(updatedImages);
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
