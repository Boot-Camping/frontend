import "./SaveModal.css";
import useDeleteSave from "../../hooks/useDeleteSave";
import PortalModal from "../common/PortalModal";
import { resetModal } from "../../utils/resetModal";

const SaveModal = ({ isOpened, setIsOpened, selectedData, onUpdate }) => {
  const { deleteSave } = useDeleteSave(setIsOpened, onUpdate);

  const submitHandle = async (event) => {
    event.preventDefault();

    if (selectedData) {
      const wishId = selectedData.wishId;
      await deleteSave(wishId);
    }
  };

  const closeModalHandle = () => {
    resetModal(setIsOpened);
  };

  return (
    <>
      {isOpened && (
        <PortalModal setIsOpened={setIsOpened}>
          <div className="save-modal modal">
            <div className="save-modal-txt">찜 목록에서 삭제하시겠습니까?</div>
            <div className="save-btn-wrap">
              <button className="save-cancel-btn" onClick={closeModalHandle}>
                취소
              </button>
              <button className="save-confirm-btn" onClick={submitHandle}>
                확인
              </button>
            </div>
          </div>
        </PortalModal>
      )}
    </>
  );
};

export default SaveModal;
