import Ajax from "./Ajax";
import jwt_decode from "jwt-decode";

class LoginService {
  async LoginResult(customerData) {
    return Ajax.post('/customers/login', customerData)
  }

  isRegularUserAuthenticated(user) {
    return this._isUserAuthenticated(user, false);
  }

  isAdminUserAuthenticated(user) {
    return this._isUserAuthenticated(user, true);
  }

  checkSessionStatus(ok, nok) {
    if (localStorage.getItem("token")) {
      const decoded = jwt_decode(localStorage.getItem("token"));
      if (decoded?.exp && (decoded.exp < Date.now() / 1000)) {
        localStorage.removeItem("token");
        localStorage.removeItem("persist:root");
        nok();
      } else {
        delete decoded.iat;
        ok(decoded);
      }
    }
  }

  _isUserAuthenticated({exp, isAuthenticated, isAdmin}, shouldBeAdmin) {
    return isAuthenticated && (isAdmin === shouldBeAdmin) && localStorage.token && exp && (exp > Date.now() / 1000);
  }
}

export default new LoginService()