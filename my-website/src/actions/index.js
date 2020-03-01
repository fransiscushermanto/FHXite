import axios from "../instance";
import io from "socket.io-client";

import { AUTH_SIGN_UP, AUTH_SIGN_IN, AUTH_SIGN_OUT, AUTH_ERROR } from "./types";

const socketUrl = `${process.env.REACT_APP_SOCKET_URL ||
  window.location.origin}`;
const socket = io.connect(socketUrl);

export const signUp = data => {
  return async dispatch => {
    try {
      console.log("[ActionCreator] signUp called");
      const res = await axios.post("/api/users/auth/register", data);
      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token
      });

      if (res.status === 200) {
        socket.emit("ADD_USERS");
      }
      localStorage.setItem("JWT_TOKEN", res.data.token);
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Email is already in use"
      });
    }
  };
};
