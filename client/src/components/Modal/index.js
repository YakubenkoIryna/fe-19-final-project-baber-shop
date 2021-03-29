import React from "react";
import "./styles.less";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../store/modal/modalAction";
import { Modal } from "antd";

const withModal = (WrappedComponent, typeOfModal) => {
  const WithModal = (props) => {
    const modalHandler = useSelector(state => state.modalHandler.modalOpen);
    const modalTypes = useSelector(state => state.modalHandler.typesOfModal);
    const dispatch = useDispatch();

    const handleRegisterModalClose = () => {
      dispatch(showModal(false));
    };
    return (
      <>
        {typeOfModal === modalTypes &&
        <Modal
          centered
          visible={modalHandler}
          onCancel={handleRegisterModalClose}
          width={props.width}
          footer={false}
        >
          <WrappedComponent
            modalHandler={modalHandler}
            handleRegisterModalClose={handleRegisterModalClose}
            btnWidth={props.btnWidth}
            modal={true}
            {...props}
          />
        </Modal>
        }
      </>
    );
  };
  return WithModal;
};

export default withModal;