import React, { useState } from "react";
import "./SaveList.css";
import { svgCollection } from "../../constants/svgCollection";
import { ReactSVG } from "react-svg";
import EmptyContent from "../common/EmptyContent";
import SaveModal from "./SaveModal";

const SaveList = ({ visibleItems, saveData, errorMessage, onUpdate }) => {
  const [savedItems, setSavedItems] = useState(
    Array(saveData.length).fill(true)
  );
  const [isOpened, setIsOpened] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const saveHandle = (index) => {
    const newSavedItems = [...savedItems];
    newSavedItems[index] = false;
    setSavedItems(newSavedItems);
    setSelectedData(saveData[index]);
    setIsOpened(true);
    console.log("selectedData", selectedData);
  };

  const shortAddr = (address) => {
    return address.substring(0, 6);
  };

  return (
    <div className="save-list-wrap">
      {saveData.length > 0 ? (
        <>
          {saveData.slice(0, visibleItems).map((data, index) => (
            <div className="save-list" key={`save-list${index + 1}`}>
              <div className="save-img">
                <img src={data.campImages[0]} />
                <div className="save-addr">{shortAddr(data.addr)}</div>
              </div>
              <div className="save-txt-wrap">
                <div className="save-name-wrap">
                  <div className="save-name">{data.name}</div>
                  <ReactSVG
                    src={svgCollection.heart}
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

          <SaveModal
            isOpened={isOpened}
            setIsOpened={setIsOpened}
            selectedData={selectedData}
            onUpdate={onUpdate}
          />
        </>
      ) : (
        <EmptyContent errorMessage={errorMessage} />
      )}
    </div>
  );
};

export default SaveList;
