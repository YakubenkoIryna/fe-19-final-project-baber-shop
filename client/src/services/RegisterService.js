import Ajax from "./Ajax";

class RegisterService {
  async RegisterResult(newCustomer) {
    return Ajax.post("/customers", newCustomer);
  }
}

export default new RegisterService();