import axios from "axios";
import UserModel from "../Models/UsreModel";
import appConfig from "../Utils/Config";
// import { url } from "inspector";
import { authStore, loginAction, logoutAction, registerAction } from "../Redux/AuthenticationState";
import CredentailsModel from "../Models/CredentailsModel";

class AuthService {
  async register(user: UserModel): Promise<void> {
    try {
      const response = await axios.post<string>(appConfig.registerUrl, user); // Added 'user' to the request
      const token = response.data;
      authStore.dispatch(registerAction(token));
    } catch (error) {
      console.error("Failed to register user", error);
      throw error; // Throwing error for higher level error handling
    }
  }

async login(credentials: CredentailsModel): Promise<void> {
  const response = await axios.post<string>(appConfig.loginUrl, credentials);
  const token = response.data;
  authStore.dispatch(loginAction(token));
}

public logout(): void {
  authStore.dispatch(logoutAction())
}


}

const authService = new AuthService();
export default authService;