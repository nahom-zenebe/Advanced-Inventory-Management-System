import { io } from "socket.io-client";

const socket = io("https://advanced-inventory-management-system-backend.vercel.app", {
  withCredentials: true,
});

export default socket;
