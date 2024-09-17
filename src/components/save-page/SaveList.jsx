import React, { useState } from "react";
import "./SaveList.css";
import EmptyContent from "../common/EmptyContent";
import SaveModal from "./SaveModal";
import SaveListItem from "./SaveListItem";

const SaveList = ({ visibleItems, saveData, errorMessage, onUpdate }) => {
  const [savedItems, setSavedItems] = useState(
    Array(saveData.length).fill(true)
  );
  const [isOpened, setIsOpened] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const hasData = saveData.length > 0;

  const clickSaveHandle = (index) => {
    const newSavedItems = [...savedItems];
    newSavedItems[index] = false;
    setSavedItems(newSavedItems);
    setSelectedData(saveData[index]);
    setIsOpened(true);
  };

  return (
    <div className="save-list-wrap">
      {hasData ? (
        <>
          {saveData.slice(0, visibleItems).map((data, index) => (
            <SaveListItem
              key={`save-list${data.wishId}`}
              data={data}
              isSaved={savedItems[index]}
              onSaveClick={() => clickSaveHandle(index)}
            />
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
