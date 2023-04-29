import io from "socket.io-client";
import { baseURL } from "../utils/config";

const socket = io(baseURL);

export const connectSocket = () => {
  socket?.on("connect", () => {
    console.log("Connected to socket");
  });

  socket?.on("disconnect", () => {
    console.log("Disconnected from socket");
  });
};

export const getSocket = () => {
  return socket;
};
