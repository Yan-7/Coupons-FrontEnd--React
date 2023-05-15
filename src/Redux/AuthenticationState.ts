import { Action, createStore } from "redux";
import UserModel from "../Models/UsreModel";
import jwtDecode from "jwt-decode";
import { create } from "domain";

export class AuthenticationState {
    token: string = null;
    user: UserModel = null;

    constructor()     {
        this.token = localStorage.getItem("token");
        if (this.token) {
            const decodedToken:{user: UserModel} = jwtDecode(this.token);
            this.user = decodedToken.user;
        }
    }

}
export enum AuthActionType {
    Register, Login, Logout
}

export interface AuthAction {
    type: AuthActionType;
    payload?: any; // <---------- somethig is still missing here
}

export function registerAction(token:string): AuthAction {
    return {type: AuthActionType.Register, payload: token}
}

export function loginAction(token:string): AuthAction {
    return {type: AuthActionType.Login, payload:token}
}

export function logoutAction(): AuthAction  {
    return { type: AuthActionType.Logout}   
}

export function authReducer(currentState = new AuthenticationState(), action: AuthAction): AuthenticationState {
    const newState = {...currentState};
    switch (action.type) {
        case AuthActionType.Register:
        case AuthActionType.Login:
                newState.token = action.payload;
                const decodedToken: {user: UserModel} = jwtDecode(newState.token);
                newState.user = decodedToken.user;
                localStorage.setItem("token",newState.token);
                break;
        case AuthActionType.Logout:
           newState.token = null;
           newState.user = null;
           localStorage.removeItem("token")
           break;
    }
    return newState;
}
export const authStore = createStore(authReducer);