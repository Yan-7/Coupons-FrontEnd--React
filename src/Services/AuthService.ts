import axios, { AxiosError } from "axios";
import UserModel from "../Models/UsereModel";
import appConfig from "../Utils/Config";
import { authStore, loginAction, logoutAction, registerAction } from "../Redux/AuthenticationState";
import CredentailsModel from "../Models/CredentailsModel";

class AuthService {
  [x: string]: any;
  async register(user: UserModel): Promise<void> {
    try {
      const response = await axios.post<string>(appConfig.registerUrl, user); // Added 'user' to the request
      const token = response.data;
      authStore.dispatch(registerAction(token));
    } catch (err) {
      const error = err as AxiosError; // Type assertion here
      console.error("Failed to register user", error);
      throw error; // Throwing error for higher level error handling
    }
  }

  async login(credentials: CredentailsModel): Promise<void> {
    try {
      const response = await axios.post<string>(appConfig.loginUrl, credentials);
      const token = response.data;
      authStore.dispatch(loginAction(token));
    } catch (err) {
      const error = err as AxiosError; // Type assertion here
      console.error("Failed to login", error);
      if (error.response && error.response.status === 401) {
        throw new Error("Invalid username or password");
      } else {
        throw error; 
      }
    }
  }

  public logout(): void {
    authStore.dispatch(logoutAction())
  }
}

const authService = new AuthService();
export default authService;
