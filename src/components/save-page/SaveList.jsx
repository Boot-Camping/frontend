import React, { useState } from "react";
import "./SaveList.css";
import { saveIcon } from "../../constants/save";
import { ReactSVG } from "react-svg";
import EmptyContent from "../paid-page/EmptyContent";

const SaveList = ({ saveData, errorMessage }) => {
  const [savedItems, setSavedItems] = useState(
    Array(saveData.length).fill(true)
  );

  const saveHandle = (index) => {
    const newSavedItems = [...savedItems];
    newSavedItems[index] = false;
    setSavedItems(newSavedItems);
  };

  const shortAddr = (address) => {
    return address.substring(0, 6);
  };

  return (
    <div className="save-list-wrap">
      {saveData.length > 0 ? (
        <>
          {saveData.map((data, index) => (
            <div className="save-list" key={`save-list${index + 1}`}>
              <div className="save-img">
                <img src={data.campImages[0]} />
                <div className="save-addr">{shortAddr(data.addr)}</div>
              </div>
              <div className="save-txt-wrap">
                <div className="save-name-wrap">
                  <div className="save-name">{data.name}</div>
                  <ReactSVG
                    src={saveIcon.heart}
                    className={`save-heart-img ${
                      !savedItems[index] && "save-delete"
                    }`}
                    onClick={() => saveHandle(index)}
                  />
                </div>
                <div>1박 : {Number(data.price).toLocaleString()}원</div>
                {/* <div>기준인원 : {data.standardNum}명</div> */}
                {/* <div>최대인원 : {data.maxNum}명</div> */}
                {/* <div>인당 추가요금 : {data.overCharge.toLocaleString()}원</div> */}
              </div>
            </div>
          ))}
        </>
      ) : (
        <EmptyContent errorMessage={errorMessage} />
      )}
    </div>
  );
};

export default SaveList;
