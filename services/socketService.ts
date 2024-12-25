import { io, Socket } from "socket.io-client";
import { SocketResponse } from "../types/exchangeRates";

const SOCKET_URL = "https://api.alihandemirdas.com.tr/";

let socket: Socket | null = null;

// Socket bağlantısını başlat
export const initiateSocketConnection = (): void => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnectionAttempts: 5,
      timeout: 10000,
    });

    socket.on("connect", () => {
      console.log("Socket.IO: Bağlantı başarılı!");
    });

    socket.on("connect_error", (err) => {
      console.error("Bağlantı Hatası: İnternet bağlantınızı kontrol ediniz!");
    });
  }
};

// Socket'ten veri al
export const subscribeToExchangeRates = (
  callback: (data: SocketResponse) => void
): void => {
  if (socket) {
    socket.on("exchangeRates", callback);
  }
};

// Socket bağlantısını kes
export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("Socket.IO: Bağlantı kesildi.");
  }
};
