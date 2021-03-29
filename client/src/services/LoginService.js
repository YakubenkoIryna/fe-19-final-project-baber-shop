import Ajax from "./Ajax";

class LoginService {
    async LoginResult (customerData) {
        return Ajax.post('/customers/login', customerData)
    }
}

export default new LoginService()