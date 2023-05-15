import axios from "axios";
import { request } from "http";
import { authStore } from "../Redux/AuthenticationState";

class InterceptorsService {
    createInterceptors():void {

        axios.interceptors.request.use((request)=> {
            if (authStore.getState().token) {
                request.headers.Authorization = "Bearer" + authStore.getState().token;
            }
            return request;
        });
    }

}

const interceptorsService = new InterceptorsService;

export default interceptorsService;