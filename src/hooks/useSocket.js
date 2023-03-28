import { io } from "socket.io-client";
const socket = io(import.meta.env?.VITE_API_URL, { transports: ['websocket', 'polling'], reconnection: false });

const useSocket = () => {
    return socket
}

export default useSocket