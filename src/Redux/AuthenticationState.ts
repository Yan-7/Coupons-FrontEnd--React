import { Action, createStore } from "redux";
import UserModel from "../Models/UsereModel";
import jwtDecode from "jwt-decode";

export class AuthenticationState {
    token: string | null = null;
    user: UserModel | null = null;

    constructor() {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            this.token = storedToken;
            const decodedToken: any = jwtDecode(this.token);
            if (decodedToken && decodedToken.user) {
                this.user = decodedToken.user as UserModel;
            }
        }
    }
}

export enum AuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout"
}

export interface AuthAction extends Action {
    type: AuthActionType;
    payload?: string;
}

export function registerAction(token:string): AuthAction {
    return {type: AuthActionType.Register, payload: token}
}

export function loginAction(token:string): AuthAction {
    return {type: AuthActionType.Login, payload: token}
}

export function logoutAction(): AuthAction  {
    return {type: AuthActionType.Logout}   
}

export function authReducer(currentState: AuthenticationState = new AuthenticationState(), action: AuthAction): AuthenticationState {
    const newState = {...currentState};

    switch (action.type) {
        case AuthActionType.Register:
        case AuthActionType.Login:
            if (action.payload) {
                newState.token = action.payload;
                const decodedToken: any = jwtDecode(newState.token);
                if (decodedToken && decodedToken.user) {
                    newState.user = decodedToken.user as UserModel;
                }
                localStorage.setItem("token", newState.token);
            }
            break;
        case AuthActionType.Logout:
            newState.token = null;
            newState.user = null;
            localStorage.removeItem("token");
            break;
    }

    return newState;
}

export const authStore = createStore(authReducer);
