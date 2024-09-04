import React, { useState } from "react";
import "./ChatCreate.css";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import { post } from "../../utils/api";
import { getUserIdFromToken } from "../../utils/getUserIdFromToken";
import PortalModal from "../common/PortalModal";
import { closeModal } from "../../utils/closeModal";
import EmptyContent from "../common/EmptyContent";

const ChatCreate = ({ setJoin, joinHandle, getChatListData }) => {
  const { accessToken, userId } = getUserIdFromToken();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpened, setIsOpened] = useState(false);
  const [inputName, setInputName] = useState("");

  const createChatBtnHandle = () => {
    console.log("문의하기 클릭");
    setIsOpened(true);
  };

  const nameChangeHandle = (e) => {
    setInputName(e.target.value);
  };

  const resetHandle = () => {
    closeModal(setIsOpened)();
    setInputName("");
  };

  const createChatRoomHandle = async () => {
    if (inputName === "") {
      setError(true);
      setErrorMessage("Message: 필수 입력사항입니다");
      return;
    }

    const customHeaders = {
      Authorization: accessToken,
    };

    const queryString = `chatRoomName=${inputName}`;

    try {
      await post(`chatRooms/${userId}?${queryString}`, {}, customHeaders);
      // joinHandle();
      getChatListData();
      closeModal(setIsOpened)();
      setInputName("");
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
      console.log(errorMessage);
    }
  };

  return (
    <>
      <button className="chat-create-btn" onClick={createChatBtnHandle}>
        문의하기
        <ReactSVG src={svgCollection.send} className="chat-create-icon" />
      </button>

      {isOpened && (
        <PortalModal setIsOpened={setIsOpened}>
          <div className="overlay" onClick={resetHandle}></div>
          <div className="chat-name-modal modal">
            <label>채팅방 이름을 입력해주세요</label>
            <input
              type="text"
              className="chat-create-name"
              value={inputName}
              onChange={nameChangeHandle}
            />

            {errorMessage && (
              <EmptyContent errorMessage={errorMessage} error={error} />
            )}

            <button className="chat-create-btn" onClick={createChatRoomHandle}>
              완료
            </button>
          </div>
        </PortalModal>
      )}
    </>
  );
};

export default ChatCreate;
