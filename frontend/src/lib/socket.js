import { io } from "socket.io-client";

const socket = io("https://advanced-inventory-management-system-v1.onrender.com", {
  withCredentials: true,
  transports: ["websocket", "polling"],
});

export default socket;
