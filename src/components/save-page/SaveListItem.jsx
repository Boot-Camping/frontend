import React from "react";
import "./SaveListItem.css";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";

const SaveListItem = ({ data, isSaved, onSaveClick }) => {
  const shortAddr = (address) => {
    const addressParts = address.split(" ");
    if (addressParts.length >= 2) {
      return `${addressParts[0]} ${addressParts[1]}`;
    }
    return address;
  };

  return (
    <div className="save-list">
      <Link to={`/camping/detail/${data.id}`}>
        <div className="save-img">
          <img src={data.campImages[0]} />
          <div className="save-addr">{shortAddr(data.addr)}</div>
        </div>
        <div className="save-txt-wrap">
          <div className="save-name-wrap">
            <div className="save-name">{data.name}</div>
          </div>
          <div>1박 : {Number(data.price).toLocaleString()}원</div>
        </div>
      </Link>

      <ReactSVG
        src={svgCollection.heart}
        className={`save-heart-img ${!isSaved && "save-delete"}`}
        onClick={onSaveClick}
      />
    </div>
  );
};

export default SaveListItem;
