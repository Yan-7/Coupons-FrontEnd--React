import { Action, createStore } from "redux";
import UserModel from "../Models/UsereModel";
import jwtDecode from "jwt-decode";

// Represents the authentication state
export class AuthenticationState {
  token: string | null = null;
  user: UserModel | null = null;

  constructor() {
    // Retrieve the token from localStorage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      this.token = storedToken;
      // Decode the token to extract user information
      const decodedToken: any = jwtDecode(this.token);
      if (decodedToken && decodedToken.user) {
        // Assign the decoded user information to the user property
        this.user = decodedToken.user as UserModel;
      }
    }
  }
}

// Enum representing different authentication action types
export enum AuthActionType {
  Register = "Register",
  Login = "Login",
  Logout = "Logout",
}

// Interface representing an authentication action
export interface AuthAction extends Action {
  type: AuthActionType;
  payload?: string;
}

// Action creator function for register action
export function registerAction(token: string): AuthAction {
  return { type: AuthActionType.Register, payload: token };
}

// Action creator function for login action
export function loginAction(token: string): AuthAction {
  return { type: AuthActionType.Login, payload: token };
}

// Action creator function for logout action
export function logoutAction(): AuthAction {
  return { type: AuthActionType.Logout };
}

// Reducer function for handling authentication state changes
export function authReducer(
  currentState: AuthenticationState = new AuthenticationState(),
  action: AuthAction
): AuthenticationState {
  const newState = { ...currentState };

  switch (action.type) {
    case AuthActionType.Register:
    case AuthActionType.Login:
      if (action.payload) {
        newState.token = action.payload;
        const decodedToken: any = jwtDecode(newState.token);
        if (decodedToken && decodedToken.user) {
          newState.user = decodedToken.user as UserModel;
        }
        // Store the token in localStorage
        localStorage.setItem("token", newState.token);
      }
      break;
    case AuthActionType.Logout:
      newState.token = null;
      newState.user = null;
      // Remove the token from localStorage
      localStorage.removeItem("token");
      break;
  }

  return newState;
}

// Create the authentication store using the authReducer
export const authStore = createStore(authReducer);
