// import React, { useState, useRef, useEffect } from "react";

// const AdminImgPlus = ({
//   initialImages = [],
//   onUploadSuccess,
//   onUploadError,
// }) => {
//   const [images, setImages] = useState([]);
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     const initializeImages = async () => {
//       const imageObjects = await Promise.all(
//         initialImages.map(async (image) => {
//           if (typeof image === "string") {
//             // image가 문자열(URL)인 경우
//             return {
//               src: image,
//               file: null,
//             };
//           } else if (image instanceof File) {
//             // image가 File 객체인 경우
//             return new Promise((resolve, reject) => {
//               const reader = new FileReader();
//               reader.onload = (e) => {
//                 resolve({
//                   src: e.target.result,
//                   file: image,
//                 });
//               };
//               reader.onerror = reject;
//               reader.readAsDataURL(image);
//             });
//           } else {
//             // 기타 경우
//             return null;
//           }
//         })
//       );

//       // null이 아닌 유효한 이미지 객체만 필터링
//       setImages(imageObjects.filter((img) => img !== null));
//     };

//     initializeImages();
//   }, [initialImages]);

//   const handleRemoveImage = (index) => {
//     setImages((prevImages) => prevImages.filter((_, i) => i !== index));
//   };

//   const handleImageChange = (event) => {
//     const files = Array.from(event.target.files);
//     const fileReaders = files.map((file) => {
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = (e) => resolve({ file, src: e.target.result });
//         reader.onerror = reject;
//         reader.readAsDataURL(file);
//       });
//     });

//     Promise.all(fileReaders)
//       .then((results) => {
//         setImages((prevImages) => [
//           ...prevImages,
//           ...results.map((result) => ({ src: result.src, file: result.file })),
//         ]);
//       })
//       .catch((error) => {
//         console.error("Error reading files:", error);
//       });
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
//           accept="image/png, image/jpeg, image/jpg"
//           multiple
//           onChange={handleImageChange}
//         />
//         <div className="img-previews">
//           {images.map((image, index) => (
//             <div key={index} className="img-preview-container">
//               <div
//                 className="img-preview"
//                 style={{ backgroundImage: `url(${image.src})` }}
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

import React, { useState, useRef, useEffect } from "react";

const AdminImgPlus = ({
  initialImages = [],
  onUploadSuccess,
  onUploadError,
}) => {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const initializeImages = async () => {
      try {
        const imageObjects = await Promise.all(
          initialImages.map(async (image) => {
            if (typeof image === "string") {
              // image가 문자열(URL)인 경우
              return {
                src: image,
                file: null,
              };
            } else if (image instanceof File) {
              // image가 File 객체인 경우
              return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                  resolve({
                    src: e.target.result,
                    file: image,
                  });
                };
                reader.onerror = () => {
                  reject(new Error("File reading error"));
                };
                reader.readAsDataURL(image);
              });
            } else {
              return null;
            }
          })
        );

        // Null이 아닌 유효한 이미지 객체만 필터링하여 상태를 업데이트
        setImages(imageObjects.filter((img) => img !== null));
      } catch (error) {
        console.error("Error initializing images:", error);
      }
    };

    initializeImages();
  }, [initialImages]);

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const fileReaders = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve({ file, src: e.target.result });
        reader.onerror = () => reject(new Error("File reading error"));
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
          {images.map((image, index) => (
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
