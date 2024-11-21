import { io } from "socket.io-client";
import { BACKEND_SERVER_URL } from "../Appconfig";

export const socket = io(BACKEND_SERVER_URL)
