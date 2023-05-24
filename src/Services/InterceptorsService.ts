import axios from "axios";
import { authStore } from "../Redux/AuthenticationState";

class InterceptorsService {
  createInterceptors(): void {
    // Add a request interceptor
    axios.interceptors.request.use((request) => {
      // Check if a token exists in the authentication state
      if (authStore.getState().token) {
        // Set the Authorization header with the token
        request.headers.Authorization = "Bearer " + authStore.getState().token;
      }
      return request;
    });
  }
}

const interceptorsService = new InterceptorsService();

export default interceptorsService;
