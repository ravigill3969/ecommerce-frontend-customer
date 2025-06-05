// context/SocketContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "./UserContext";

const baseurl = import.meta.env.VITE_BASE_URL;
const socket: Socket = io(baseurl);

type SocketContextT = {
  incrementInCart: (productId: string) => void;
  decrementInCart: (productId: string) => void;
};

const SocketContext = createContext<SocketContextT | undefined>(undefined);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { userId } = useUser();
  useEffect(() => {
    socket.on("connection", (message: string) => {
      console.log("Cart updated:", message);
    });

    return () => {
      socket.off("cart-updated");
    };
  }, []);

  const incrementInCart = useCallback(
    (productId: string) => {
      socket.emit("cart-increment", { productId, userId });
    },
    [userId]
  );

  const decrementInCart = useCallback(
    (productId: string) => {
      socket.emit("cart-decrement", { productId, userId });
    },
    [userId]
  );

  return (
    <SocketContext.Provider value={{ incrementInCart, decrementInCart }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocketForCart() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketForCart must be used within a SocketProvider");
  }
  return context;
}
