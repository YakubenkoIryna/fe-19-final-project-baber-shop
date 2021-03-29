import React from "react";
import RegistrationForm from "../../Forms/RegistrationForm";
import withModal from "../index";

const RegistrationModal = () => {
  const typeOfModal = "RegistrationForm";
  const ModalRegistration = withModal(RegistrationForm, typeOfModal);

  return <ModalRegistration width={1000}/>;
};

export default RegistrationModal;